import React, { useEffect, useMemo, useState } from "react";
import db from "./firebase";
import { DataGrid, gridClasses, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SideBarContainer from "./sidebar/SideBarContainer";
import "react-toastify/dist/ReactToastify.css";

// defining table
let rows = [];

function AdminTable() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [addopen, setAddopen] = useState(false);
  const [rowId, setRowId] = useState(0);
  const [username, setUsername] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [updatedata, setUpdatedata] = useState(false);

  const columns = [
    // defining columns
    {
      field: "id",
      headerName: "ID",
      headerClassName: "header",
      headerAlign: "left",
      align: "left",
      flex: 1,
      minWidth: 300,
      sortable: false,
    },
    {
      field: "username",
      headerName: "Username",
      headerClassName: "header",
      headerAlign: "left",
      align: "left",
      flex: 1,
      minWidth: 300,
      sortable: false,
    },
    {
      field: "email",
      headerName: "Email Address",
      headerClassName: "header",
      headerAlign: "left",
      align: "left",
      flex: 1,
      minWidth: 300,
    },
  ];

  useEffect(() => {
    // get users from firestore
    getUsers();
  }, []);

  useEffect(() => {
    // update table when updatedata is changed
    getUsers();
  }, [updatedata]);

  const getUsers = async () => {
    // get users from firestore
    const userList = [];
    await db
      .collection("users") // get users from firestore
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          let singleUser = { id: doc.id, ...doc.data() }; // get user data
          userList.push(singleUser);
        });
      })
      .catch((error) => console.log(error));
    setUsers(userList);

    console.log("end getUsers");
  };

  const deleteUser = () => {
    // delete user
    if (window.confirm("Do you confirm delete?")) {
      let deleteItems = db
        .collection("users")
        .where("username", "==", username);
      deleteItems.get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          doc.ref.delete(); // delete user from firestore
        });
      });
      setUpdatedata(!updatedata);
      setAddopen(false);
    }
  };

  const handleClickOpen = () => {
    // open the dialoge for update / delete
    setOpen(true);
  };

  const handleClickClose = () => {
    // close the dialoge for update / delete
    setOpen(false);
  };

  const handleAddopen = () => {
    // open the adding form
    setAddopen(true);
  };

  const handleAddclose = () => {
    // close the adding form
    setAddopen(false);
  };

  const handleAdd = () => {
    // different field inputs
    let newaddname = document.querySelector("#newUsername").value.trim();
    // let newaddEmail = document.querySelector("#newEmail").value.trim();

    if (!newaddname) {
      alert("Must fill in all fields");
    }
    // Add a new document in collection "cities"
    db.collection("users")
      .add({
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
    setAddopen(false);
  };

  const handleRowClick = (params) => {
    // open the dialoge for update / delete
    handleClickOpen();
    // setting value for each parmas whenever the row is clicked
    setRowId(params.id);
    setUsername(params.row.username);
  };

  const handleDelete = () => {
    // if (window.confirm("Do you confirm delete?")) {
    deleteUser();
    setUpdatedata(!updatedata);
    setOpen(false);
  };

  return (
    <div className="app">
      <SideBarContainer />
      <div
        style={{
          height: pageSize === 5 ? 600 : pageSize === 10 ? 670 : 940,
          marginTop: "50px",
          marginLeft: "50px",
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row.id}
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
            "& .header": { bgcolor: "rgba(79, 158, 255, 0.35)" },
            "& .rowbg": { bgcolor: "rgba(213, 223, 232, 0.25)" },
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleAddopen}
          sx={{ mt: 2 }}
          style={{ marginTop: "20px" }}
        >
          Add User
        </Button>

        {/* Form for add */}
        <Dialog open={addopen} onClose={handleAddclose}>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter all information below to add a new user.
              <br />
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
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleAddclose}>
              Cancel
            </Button>
            <Button variant="outlined" onClick={handleAdd}>
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* forms for update or delete */}
        <Dialog open={open} onClose={handleClickClose}>
          <DialogTitle>Manage User [{username}]</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you going to modify user with id: {rowId}.
              <br />
            </DialogContentText>
            <br />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="error" onClick={handleDelete}>
              Delete User
            </Button>
            <Button variant="outlined" onClick={handleClickClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default AdminTable;
