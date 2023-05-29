import {
  
  Box,
  Button,
  
  TextField,
  useMediaQuery,
  Container,

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

export default function RegisterForm() {
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
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
          setRegistrationSuccess(true);
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

 const isSmallScreen= useMediaQuery ("max-width:600px")

  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
    <Box
      component='form'
      sx={{maxWidth:'60rem',
    width:'90%',
  margin:'auto',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  flexDirection:'column',
  padding:'2rem',
  gap:'1rem',

}}

          
   
     
      noValidate
      onSubmit={formik.handleSubmit}
    >
      <span style={{ fontSize: '30px' }}>Register Account</span>
      <TextField
        
        id='Username'
        name='username'
        label='username'
        type='text'
        variant='outlined'
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      InputProps={{


        sx:{backgroundColor:'white'},
      }}
      FormHelperTextProps={{
        sx:{
          backgroundColor:'transparent',
        }
      }}




      />
      <TextField
        id='password'
        name='password'
        label='Lösenord'
        type='password'
        
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        inputProps={{
          sx:{backgroundColor:'white'},
        }}

        FormHelperTextProps={{
          sx:{
            backgroundColor:'transparent',
          }
        }}

        />

        <TextField
        id='confirmPassword'
        name='confirmPassword'
        label='Bekräfta lösenord'
        type='password'
        
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        inputProps={{
          sx:{backgroundColor:'white'},
        }}

        FormHelperTextProps={{
          sx:{
            backgroundColor:'transparent',
          }
        }}
        />

       <Button color='primary' type='submit' variant='contained'>
          Skapa konto
        </Button>
    </Box>
  </Container>
  );
}




    
