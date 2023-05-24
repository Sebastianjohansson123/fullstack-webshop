import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import ManInHat from '../icons/manInHat.png';


const registerSchema = Yup.object({
  username: Yup.string().required("Please enter an username!"),
  password: Yup.string().required("Please enter your password!")
})
type RegisterValues = Yup.InferType<typeof registerSchema>

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegisterAccount = async (username: string, password: string) => {
    const newUser = {
      username,
      password
    };

    const response = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-type": "application/json" },
    });

      const data = await response.json();
    if (response.ok) {
      localStorage.setItem("loggedInUsername", data.username);
      localStorage.setItem("loggedInUserID", data._id);
    }
  };


    const formik = useFormik<RegisterValues>({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: registerSchema,
      onSubmit: async (registerValues) => {
        const loggedinUser = await handleRegisterAccount(registerValues.username, registerValues.password);
        console.log(loggedinUser);
        navigate("/");
      },
    });

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
          <form onSubmit={formik.handleSubmit}> 
            <TextField
              id='username'
              label='Username'
              name='username'
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.username && formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
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
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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