import {
  Box,
  Button,
  TextField,
  Container,
  Snackbar
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface RegisterValues {
  username: string;
  password: string;
  confirmPassword: string;
}

const registerSchema = Yup.object().shape({
  username: Yup.string().required('Användarnamn är obligatoriskt'),
  password: Yup.string()
    .required('Lösenord är obligatoriskt')
    .min(6, 'Lösenordet måste innehålla minst 6 tecken'),
  confirmPassword: Yup.string()
    .required('Du måste bekräfta lösenordet innan du kan skapa ett konto')
    .oneOf([Yup.ref('password')], 'Lösenorden matchar inte varandra'),
});

 function RegisterForm() {
 
  const [snackbar, setSnackbar] = useState(false); 
  const navigate = useNavigate();
  const formik = useFormik<RegisterValues>({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values: RegisterValues) => {
      try {
        const response = await fetch('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          setSnackbar(true);
          navigate('/login');
        } else {
          const message = await response.text();
          console.log(formik);
          throw new Error(message);
        }
      } catch (error) {
        const caughtError = error as Error;
        console.error('Error registering user:', caughtError);
        formik.setFieldError('username', caughtError.message.replace(/"/g, ''));
      }
    },
  });

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
        <span style={{ fontSize: '30px' }}>Register</span>
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
        <TextField
        fullWidth
        id='confirmPassword'
        name='confirmPassword'
        label='Bekräfta lösenord'
        type='password'
        
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        />
        <Button
        fullWidth
          type='submit'
          variant='contained'
          sx={{ boxShadow: 'none', marginTop: '1rem' }}
          onClick={() => setSnackbar(true)}
        >
          Skapa konto
        </Button>
      </Box>
      <Snackbar 

      open={snackbar}
      autoHideDuration ={6000}
      onClose={handleSnackbarClose}
      message="Registrering lyckades!"
      onClick={() => navigate('/login')}
      />


      
      
  
    </Container>


)}


export default RegisterForm;

    
