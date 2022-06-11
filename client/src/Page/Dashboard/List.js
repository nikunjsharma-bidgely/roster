import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Box, AppBar, Toolbar,Button } from '@mui/material';
function List({ employees, handleEdit, isAdmin, handleLogin, token, setIsAdding }) {
    const [list, setlist] = useState([])
    const [text, settext] = useState('')
    const [query, setquery] = useState('')
    useEffect(() => {
        axios.post('http://localhost:5000/api/profiles/all', { auth: token })
            .then(data => {
                setlist(data.data);
            })
            .catch(err => { console.log(err); handleLogin(false); })
    }, [])
    const handleDelete = (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(result => {
            if (result.value) {
                axios.post('http://localhost:5000/api/profiles/delete', { auth: token, id })
                    .then(resp => { console.log(resp) })
                    .catch(err => { console.log(err); handleLogin(false); })

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    text: ``,
                    showConfirmButton: false,
                    timer: 1500,
                });
                axios.post('http://localhost:5000/api/profiles/all', { auth: token })
                    .then(data => {
                        setlist(data.data);
                    })
                    .catch(err => { console.log(err); handleLogin(false); })
            }
        });
    }
    useEffect(() => {
        if (true) {
            axios.post('http://localhost:5000/api/profiles/search', { auth: token, name: query })
                .then(data => {
                    const res = [];
                    for (var i = 0; i < (data.data).length; i++) {
                        var flag = true;
                        for (var j = 0; j < res.length; j++) {
                            if (res[j]._id == (data.data)[i]._id) {
                                flag = false;
                                break;
                            }
                        }
                        if (flag) {
                            res.push(data.data[i]);
                        }
                    }
                    setlist(res);
                })
                .catch(err => { console.log(err); handleLogin(false); })
        }
    }, [query])

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <form style={{ display: 'inline',height:"100%" ,position: 'absolute', left: '130px'}} onSubmit={(e) => { e.preventDefault(); setquery(text); }}>
                    <TextField
                        id="outlined-size-small"
                        size="small"
                        value={text}
                        onChange={(e) => { settext(e.target.value) }}
                    />
                    <IconButton type="submit" aria-label="search">
                        <SearchIcon style={{ fill: "blue" }} />
                    </IconButton>
                </form>
                {isAdmin&&<div style={{ marginTop: '0px', marginLeft: '0px', display: 'inline', position: 'absolute', right: '150px' }}>
                    <Button variant="contained" onClick={() => setIsAdding(true)} className='round-button'>Add Employee</Button>
                </div>}
            </Box>
            <div style={{ width:"100px",height:'50px'}} >
            
            </div>

            <div marginTop={'50px'} className='contain-table'>
                <table className='striped-table'>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Employee Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date of birth</th>
                            <th>Date of joining</th>
                            <th>Department</th>
                            <th>Designation</th>
                            {isAdmin && <th colSpan={2} className="text-center">
                                Actions
                            </th>}
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length > 0 ? (
                            list.map((employee, i) => (
                                <tr key={employee.empId}>
                                    <td>{i + 1}</td>
                                    <td>{employee.empId}</td>
                                    <td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>{(employee.dob).split('T')[0]} </td>
                                    <td>{(employee.doj).split('T')[0]} </td>
                                    <td>{employee.department} </td>
                                    <td>{employee.designation} </td>
                                    {isAdmin && <><td className="text-right">
                                        <Button variant="outlined"
                                            onClick={() => handleEdit(employee)}
                                            className="button muted-button"
                                        >
                                            Edit
                                        </Button>
                                    </td>
                                        <td className="text-left">
                                            <Button variant="outlined"
                                                onClick={() => handleDelete(employee._id)}
                                                className="button muted-button"
                                            >
                                                Delete
                                            </Button>
                                        </td></>}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7}>No Employees</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default List