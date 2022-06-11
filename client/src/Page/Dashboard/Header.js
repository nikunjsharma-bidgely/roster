import React from 'react'
import { AppBar, Box, Toolbar, IconButton, Typography, Button } from '@mui/material';

function Header({ setIsAdding, isAdmin, handleLogin, changeToken }) {
    return (
        <>
            <header>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar style={{ backgroundColor: '#DDDDDD' }}>
                        <Toolbar>
                            <img style={{ width: "15%", height: "20%" }} src='https://www.bidgely.com/wp-content/themes/bidgely/images/main-logo-small@2x.png'></img>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            </Typography>

                            <Button variant="contained" onClick={() => { changeToken(null); handleLogin(false) }} className='round-button'>Log Out</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </header>
            <div style={{ width: '100%', marginTop: '80px', marginBottom: '18px', display: 'flex', justifyContent: 'flex-end', backgroundColor: 'white' }}>
                
            </div>
        </>
    )
}

export default Header