import React, { useState,useRef } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
function Edit({ employees, selectedEmployee, setEmployees, setIsEditing,handleLogin,token }) {

    const [empId, setempId] = useState(selectedEmployee.empId)
    const [firstName, setFirstName] = useState(selectedEmployee.firstName);
    const [lastName, setLastName] = useState(selectedEmployee.lastName);
    const [email, setEmail] = useState(selectedEmployee.email);
    const [phone, setphone] = useState(selectedEmployee.phone)
    const [dob, setdob] = useState(selectedEmployee.dob)
    const [doj, setdoj] = useState(selectedEmployee.doj)
    const [designation, setdesignation] = useState(selectedEmployee.designation)
    const [department, setdepartment] = useState(selectedEmployee.department)
    const textInput = useRef(null);
    const handleUpdate = (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !designation ||!phone||!dob||!doj||!department) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        const newEmployee = {
            auth: token,
            id: selectedEmployee._id,
            empId,
            firstName,
            lastName,
            email,
            phone,
            dob,
            doj,
            department,
            designation
        }
        console.log(newEmployee)
        axios.post('http://localhost:5000/api/profiles/all',{auth:token})
        .then(data =>{
            
        })
        .catch(err =>{
            handleLogin(false);
        })

        axios.post('http://localhost:5000/api/profiles/update',newEmployee)
         .then(res =>{console.log(res)})
         .catch(err =>{console.log(err);handleLogin(false);})

        Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: ``,
            showConfirmButton: false,
            timer: 1500
        });
        setIsEditing(false)
    };

    return (
        <div className="small-container">
            <form onSubmit={handleUpdate}>
                <h1>Edit Employee</h1>
                <label htmlFor="empId">Employee ID</label>
                <input
                    id="empId"
                    type="text"
                    ref={textInput}
                    name="empId"
                    value={empId}
                    onChange={e => setempId(e.target.value)}
                />
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    type="text"
                    ref={textInput}
                    name="firstName"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="phone">Phone</label>
                <input
                    id="phone"
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={e => setphone(e.target.value)}
                />
                <label htmlFor="dob">Date of Birth</label>
                <input
                    id="dob"
                    type="date"
                    name="dob"
                    value={dob}
                    onChange={e => setdob(e.target.value)}
                />
                <label htmlFor="doj">Date of Joining</label>
                <input
                    id="doj"
                    type="date"
                    name="doj"
                    value={doj}
                    onChange={e => setdoj(e.target.value)}
                />
                <label htmlFor="designation">Designation</label>
                <input
                    id="designation"
                    type="text"
                    ref={textInput}
                    name="designation"
                    value={designation}
                    onChange={e => setdesignation(e.target.value)}
                />
                <label htmlFor="department">Department</label>
                <input
                    id="department"
                    type="text"
                    ref={textInput}
                    name="department"
                    value={department}
                    onChange={e => setdepartment(e.target.value)}
                />
                <div style={{ marginTop: '30px' }}>
                    <input type="submit" value="Update" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsEditing(false)}
                    />
                </div>
            </form>
        </div>
    );
}

export default Edit