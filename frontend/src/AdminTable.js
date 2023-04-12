import React, { useEffect, useMemo, useState } from 'react'
import db from "./firebase";
import { DataGrid, gridClasses,GridToolbar } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


// defining table 
let rows = [
];

function AdminTable() {

    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
	const [addopen, setAddopen] = useState(false);
    const [rowId, setRowId] = useState(0);
	const [username, setUsername] = useState(null);
    const [email, setEmail] = useState("");
    const [pageSize, setPageSize] = useState(5);
    const [updatedata, setUpdatedata] = useState(false);


    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            headerClassName: 'header',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
            minWidth: 300,
            sortable: false
        },
        {
            field: 'username',
            headerName: 'Username',
            headerClassName: 'header',
            headerAlign: 'left',
            align: 'left',
            flex: 1,
            minWidth: 300,
            sortable: false
        },
        // {
        //     field: 'email',
        //     headerName: 'Email Address',
        //     headerClassName: 'header',
        //     headerAlign: 'left',
        //     align: 'left',
        //     flex: 1,
        //     minWidth: 100,
        // },
    ]


    // fetch user info when rendering this component
    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
		getUsers();
	}, [updatedata]);

    const  getUsers = async () => {
        const userList = [];
        await db.collection("users").get()
        .then((snapShot) => {
            snapShot.forEach((doc) => {
                let singleUser = {id: doc.id, ...doc.data()}
                userList.push(singleUser)
            });
        })
        .catch((error) => console.log(error))
        setUsers(userList);

        console.log("end getUsers")
    }

    const deleteUser = () => {
        if (window.confirm("Do you confirm delete?")){
            // find user by username 
            let deleteItems =  db.collection('users')
            .where("username", "==", username);
            // delete 
            deleteItems.get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    doc.ref.delete();
                });
            })
            setUpdatedata(!updatedata);
            setAddopen(false);
        }
    }

    const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClickClose = () => {
		setOpen(false);
	};

    // open the adding form 
	const handleAddopen = () => {
		setAddopen(true);
	};

    // close the adding form 
	const handleAddclose = () => {
		setAddopen(false);
	};

    const handleAdd = () => {
        // different field inputs
		let newaddname = document.querySelector("#newUsername").value.trim();
        // let newaddEmail = document.querySelector("#newEmail").value.trim();

        if(!newaddname) {
            alert("Must fill in all fields");
        }
        // Add a new document in collection "cities"
        db.collection("users").add({
                username: newaddname,
                // email : newEmail
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
            console.error("Error writing document: ", error);
        });
        setUpdatedata(!updatedata);
        setAddopen(false)
    }

    const handleRowClick = (params) => {
        // open the dialoge for update / delete
        handleClickOpen();
        // setting value for each parmas whenever the row is clicked
        setRowId(params.id);
        setUsername(params.row.username);
    }

    const handleDelete = () => {
		// if (window.confirm("Do you confirm delete?")) {
        deleteUser();
        setUpdatedata(!updatedata);
        setOpen(false);

	};

    const handleUpdate = () =>{
        let newaddname = document.querySelector("#newUsername").value.trim();

        if (!newaddname) {
            alert("Must fill all fields")
        } else if (window.confirm("Do You confirm update user info?")) {
            // find doc with given id and do update
            db.collection("users").doc(rowId)
            .update({
                // fields to be udpated
                username: username
            }).then(() => console.log('Document successfully updated!'))
        }

        setUpdatedata(!updatedata);
        setOpen(false);
    }

  return (

    <div style={{ height: (pageSize === 5) ? 300 : (pageSize === 10) ? 670 : 940 }}>
            <DataGrid 
                rows={users} 
                columns={columns}
                getRowId={row=>row.id}

                pageSize={pageSize}
				onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
				rowsPerPageOptions={[5, 10, 15]}
				pagination

                getRowSpacing={(params) => ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isLastVisible ? 0 : 5,
                })}

                components={{ Toolbar: GridToolbar }}
				componentsProps={{
					toolbar: {
						csvOptions: { disableToolbarButton: true },
						printOptions: { disableToolbarButton: true },
						showQuickFilter: true,
						quickFilterProps: { debounceMs: 500 },
					},
				}}

                onRowClick={handleRowClick}

				sx={{
					'& .header': { bgcolor: 'rgba(79, 158, 255, 0.35)' },
					'& .rowbg': { bgcolor: 'rgba(213, 223, 232, 0.25)' },
				}}

            />

            <Button variant="outlined" onClick={handleAddopen} sx={{ mt: 2 }}>Add User</Button>
            
            {/* Form for add */}
			<Dialog open={addopen} onClose={handleAddclose}>
				<DialogTitle>Add New User</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please enter all information bewlow to add a new user.<br />
					</DialogContentText>
					<br />
					<TextField
						margin="dense"
						id="newUsername"
						label="New User Name"
						type="text"
						fullWidth
						variant="standard"
					/>
                    {/* <TextField
						margin="dense"
						id="newUsername"
						label="New User Name"
						type="text"
						fullWidth
						variant="standard"
					/> */}
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={handleAddclose}>Cancel</Button>
					<Button variant="outlined" onClick={handleAdd}>Add</Button>
				</DialogActions>
			</Dialog>

            {/* forms for update or delete */}
            <Dialog open={open} onClose={handleClickClose}>
				<DialogTitle>Update User {username}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Please change information bewlow to update user with id: {rowId}.<br />
					</DialogContentText>
					<br />
					<TextField
						margin="dense"
						id="newUsername"
						label="New User Name"
						type="text"
						fullWidth
						variant="standard"
                        defaultValue={username}
					/>
                    {/* <TextField
						margin="dense"
						id="newUsername"
						label="New User Name"
						type="text"
						fullWidth
						variant="standard"
					/> */}
				</DialogContent>
				<DialogActions>
                    <Button variant="outlined" color="error" onClick={handleDelete}>Delete User</Button>
					<Button variant="outlined" onClick={handleClickClose}>Cancel</Button>
					<Button variant="outlined" onClick={handleUpdate}>Update</Button>
				</DialogActions>
			</Dialog>
           
    </div>

  )
}

export default AdminTable