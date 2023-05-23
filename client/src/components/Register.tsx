import { Box, Button, TextField } from '@mui/material';
import ManInHat from '../icons/manInHat.png';
// import { useState } from 'react';

function RegisterPage() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const handleRegisterAccount = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const newUser = {
  //     username,
  //     password
  //   };
  
  //   const response = await fetch("/api/users/register", {
  //     method: "POST",
  //     body: JSON.stringify(newUser),
  //     headers: { "Content-type": "application/json" },
  //   });
  
  //     const data = await response.json();
  //   if (response.ok) {
  //     localStorage.setItem("loggedInUsername", data.username);
  //     localStorage.setItem("loggedInUserID", data._id);
  //   }
  // };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '0 16px',
          alignItems: 'center',
          height: '75vh',
        }}
      >
        <img src={ManInHat} />
        <Box sx={{ width: '100%', maxWidth: '400px' }}>
          <form> {/* onSubmit={handleRegisterAccount} */}
            <TextField
              id='username'
              label='Username'
              name='username'
              // value={username}
              // onChange={(e) => setUsername(e.target.value)}
              type='text'
              fullWidth
              required
              margin='normal'
              variant='outlined'
            />
            <TextField
              id='password'
              label='Password'
              type='password'
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              margin='normal'
              variant='outlined'
            />
            <Button
              type='submit'
              variant='contained'
              size='large'
              sx={{ mt: 3 }}
              fullWidth
            >
              Register account
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
}

export default RegisterPage;
