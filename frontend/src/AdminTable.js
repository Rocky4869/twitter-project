import React, { useEffect, useMemo, useState } from 'react'
import db from "./firebase";
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UsersActions from './UsersActions';



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

    const columns = useMemo(() => [
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
        {
            field: 'actions',
            headerName: 'Actions',
            type: 'actions',
            renderCell: (params) => (
              <UsersActions {...{ params, rowId, setRowId }} />
            ),
          },
        ],
        [rowId]
    )


    // fetch user info when rendering this component
    useEffect(() => {
        getUsers();
        rows=users;
    }, [])

    const  getUsers = async () => {
        const userList = [];
        await db.collection("users").get()
        .then((snapShot) => {
            snapShot.forEach((doc) => {
                let singleUser = {id: doc.id, ...doc.data()}
                userList.push(singleUser)
            });
            setUsers(userList);
        })
        .catch((error) => console.log(error))
        console.log("end getUsers")
    }

    const deleteUser = (id) => {
        db.collection('users')
        .doc(id)
        .delete()
        .then((response) => {
            console.log(response)
        })
        .catch(error => console.log(error))
    }

  return (

    <div style={{ height: 500, width: '80%' }}>
            <DataGrid 
                rows={users} 
                columns={columns}
                getRowId={row=>row.id}

                pageSize={pageSize}
				onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
				rowsPerPageOptions={[5, 10, 15]}
                getRowSpacing={(params) => ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isLastVisible ? 0 : 5,
                })}
                sx={{
                    [`& .${gridClasses.row}`]: {
                      bgcolor: (theme) =>
                        theme.palette.mode === 'light' ? grey[200] : grey[900],
                    },
                }}
                onCellEditCommit={(params)=> setRowId(params.id)}
				pagination
                />            
    </div>

  )
}

export default AdminTable