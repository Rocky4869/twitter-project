import React, { useEffect, useState } from 'react'
import db from "./firebase";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

function AdminTable() {

    const [users, setUsers] = useState([]);
    // fetch user info when rendering this component

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = ( ) => {
        db.collection("users").onSnapshot((snapShot) => {
            console.log(snapShot.docs);
            console.log("from admintable")
            const userList = snapShot.docs.map((doc_user) => ({
                id: doc_user.id,
                ...doc_user.data(),
            }));
            setUsers(userList);
        })
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
         <h3>admintable</h3>
            {/* <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
            /> */}
    </div>

  )
}

export default AdminTable