import React, { useState, useRef, useEffect } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
function Add({ employees, setEmployees, setIsAdding,handleLogin,token }) {
    const [empId, setempId] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setphone] = useState('')
    const [dob, setdob] = useState('')
    const [doj, setdoj] = useState('')
    const [designation, setdesignation] = useState('')
    const [department, setdepartment] = useState('')
    const textInput = useRef(null);

    useEffect(() => {
        textInput.current.focus();
    }, [])

    const handleAdd = e => {
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
            auth:token,
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
        .catch(err =>{console.log(err);handleLogin(false);})
        axios.post('http://localhost:5000/api/profiles/add',newEmployee)
         .then(res => {console.log(res.data)})
         .catch(err =>{
            if(err.response){
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            }
            handleLogin(false);
         })
        setIsAdding(false);

        Swal.fire({
            icon: 'success',
            title: 'Added!',
            text: `${firstName} ${lastName}'s data has been Added.`,
            showConfirmButton: false,
            timer: 1500
        });
    }


    return (
        <div className="small-container">
            <form onSubmit={handleAdd}>
                <h1>Add Employee</h1>
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
                    <input type="submit" value="Add" />
                    <input
                        style={{ marginLeft: '12px' }}
                        className="muted-button"
                        type="button"
                        value="Cancel"
                        onClick={() => setIsAdding(false)}
                    />
                </div>
            </form>
        </div>
    );
}

export default Add