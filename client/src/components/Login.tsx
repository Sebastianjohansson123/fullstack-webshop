import { Box, Button, Container, TextField, Snackbar } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useUserContext } from '../contexts/UserContext';
import ManInHat from '../icons/manInHat.png';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';


const loginSchema = Yup.object({
  username: Yup.string().required('Please enter an username!'),
  password: Yup.string().required('Please enter your password!'),
});

type LoginValues = Yup.InferType<typeof loginSchema>;

function LoginPage() {
  const navigate = useNavigate();
  const { handleLogin, user } = useUserContext();
  const location = useLocation();
  const [snackbar, setSnackbar] = useState(false);

  const formik = useFormik<LoginValues>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: loginValues => {
      handleLogin(loginValues.username, loginValues.password);
    },
  });

  useEffect(() => {
    if (user?.username) {
      navigate('/');
    }
    return;
  }, [user]);

  useEffect(() => {
    if (location.state?.snackbar && location.state.snackbar) {
      setSnackbar(true);
    }
  }, [location.state]);

  const handleSnackbarClose = () => {
    setSnackbar(false);
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
      <Snackbar
        open={snackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message='successfully registered!'
        onClick={() => navigate('/login')}
      />
    </Container>
  );
}

export default LoginPage;
