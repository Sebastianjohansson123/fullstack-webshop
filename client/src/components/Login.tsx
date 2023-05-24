import { Box, Button, Container, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import ManInHat from '../icons/manInHat.png';

const loginSchema = Yup.object({
  username: Yup.string().required("Please enter an username!"),
  password: Yup.string().required("Please enter your password!")
})

type LoginValues = Yup.InferType<typeof loginSchema>

function LoginPage() {
  const navigate = useNavigate();

  const formik = useFormik<LoginValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (loginValues) => {
    const login = await handleLogin(loginValues.username, loginValues.password)
    },
  });

  const handleLogin = async (username: string, password: string) => {
      const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: { "Content-type": "application/json" },
    });
    
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem(
        "loggedInUsername",
        data.username
      );
      localStorage.setItem("loggedInUserID", data._id);
      localStorage.setItem("loggedInIsAdmin", data.isAdmin);
      navigate("/");
    }
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        component='form'
        display={'flex'}
        alignItems={'center'}
        flexDirection={'column'}
        gap={'10px'}
        padding={'9rem 0'}
        sx={{ width: '100%', maxWidth: '400px' }}
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <img src={ManInHat} />
        <span style={{ fontSize: '30px' }}>Log in</span>
        <TextField
          fullWidth
          label='Username'
          type='username'
          name='username'
          variant='outlined'
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          fullWidth
          label='Password'
          type='password'
          name='password'
          variant='outlined'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          type='submit'
          variant='contained'
          sx={{ boxShadow: 'none', marginTop: '1rem' }}
        >
          Log in
        </Button>
        <NavLink to='/register'>Don't have an account? Sign up</NavLink>
      </Box>
    </Container>
  );
}

export default LoginPage;
