import axios from 'axios';
import React, { useState } from 'react'
import { useRef } from 'react';
import Swal from 'sweetalert2';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const theme = createTheme();

function Login(props) {
    const textInput = useRef(null);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('')
    const [err, seterr] = useState(false)
    const [login, setlogin] = useState(true)

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Enter Credentials!',
                showConfirmButton: true
            });
        }
        axios.get('http://localhost:5000/api/users/dummy').then((res) => ({})).catch(err => { })
        axios.post('http://localhost:5000/api/users/login', { email, password })
            .then(res => {
                console.log(res);
                props.handleLogin(true);
                props.handleAdmin(res.data.isAdmin);
                props.changeToken(res.data.token);
            })
            .catch(err => {
                seterr(true);
                console.log(err);
            })
    }
    return (
        <>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>

                <img src='https://www.bidgely.com/wp-content/themes/bidgely/images/main-logo-small@2x.png'></img>

                <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                    {err && <Typography color={'red'}>Invalid Credentials!</Typography>}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoFocus
                        id="email"
                        type="email"
                        ref={textInput}
                        name="email"
                        value={email}
                        onChange={e => setemail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        label="Password"
                        required
                        fullWidth
                        id="password"
                        type="password"
                        ref={textInput}
                        name="password"
                        value={password}
                        onChange={e => setpassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>

            </Box>

        </>
    )
}

export default Login