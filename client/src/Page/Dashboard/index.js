import React, { useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
import Header from './Header';
import List from './List';
import Add from './Add';
import Edit from './Edit';

import { employeesData } from '../../data';

function Dashboard(props) {
    const token = props.token;
    const handleLogin = props.handleLogin;
    const [employees, setEmployees] = useState(employeesData);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (emp) => {
        
        console.log(emp)
        console.log('here');
        setSelectedEmployee(emp);
        setIsEditing(true);
    }

    


    return (
        <div className='container'>
            {/* List */}
            {!isAdding && !isEditing && (
                <>
                    <Header changeToken={props.changeToken} token={token} handleLogin={handleLogin}isAdmin = {props.isAdmin}
                        setIsAdding={setIsAdding}
                    />
                    <List setIsAdding={setIsAdding} token={token} handleLogin={handleLogin} isAdmin = {props.isAdmin}
                        employees={employees}
                        handleEdit={handleEdit}
                    />
                </>
            )}
            {/* Add */}
            {isAdding && (
                <Add
                    token={token}
                    handleLogin={handleLogin}
                    employees={employees}
                    setEmployees={setEmployees}
                    setIsAdding={setIsAdding}
                />
            )}
            {/* Edit */}
            {isEditing && (
                <Edit
                    token={token}
                    handleLogin={handleLogin}
                    employees={employees}
                    selectedEmployee={selectedEmployee}
                    setEmployees={setEmployees}
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    )
}

export default Dashboard;