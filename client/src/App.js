import './App.css';
import Dashboard from './Page/Dashboard';
import { useState,useEffect } from 'react';
import Login from './Page/Login';
import axios from 'axios';
function getToken() {
  const tokenString = sessionStorage.getItem('token');
  
  return tokenString;
}

function App() {
  const [loggedIn, setloggedIn] = useState(false)
  const [isAdmin, setisAdmin] = useState(false)
  const [token,setToken] = useState(getToken());
 
  const changeToken = (str)=>{
    
    sessionStorage.setItem('token', str);
    console.log('savin')
    console.log(getToken())
    setToken(str);
  }
  const handleLogin = (flag)=>{
    setloggedIn(flag);
  }
  const handleAdmin = (flag)=>{
    setisAdmin(flag);
  }
  useEffect(() => {
    axios.post('http://localhost:5000/api/users/verified',{auth:token})
        .then(data =>{
          setloggedIn(true);
          setisAdmin(data.data.isAdmin);
        })

    
  })
  
  return (
    <div className="App">
      {loggedIn?<Dashboard changeToken={changeToken} handleLogin={handleLogin} token={token} isAdmin={isAdmin}/>:
        <Login changeToken={changeToken} handleLogin = {handleLogin} handleAdmin = {handleAdmin} />
      }
    </div>
  );
}

export default App;
