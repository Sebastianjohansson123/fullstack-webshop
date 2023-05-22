import * as Icon from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Link,
  Snackbar,
  SxProps,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import '../index.css';

const newsletterSchema = Yup.object().shape({
  email: Yup.string()
    .email(
      "Your e-mail seems to be incorrectly formatted. Please make sure it's correct."
    )
    .required('Please tell us your email.')
    .min(
      7,
      'The e-mail you have given us it too short. Please give us an e-mail of minimum 7 characters.'
    ),
});

type newsletterValues = Yup.InferType<typeof newsletterSchema>;

function Footer() {
  const [openSnack, setOpenSnack] = useState(false);

  const formik = useFormik<newsletterValues>({
    initialValues: {
      email: '',
    },
    validationSchema: newsletterSchema,
    onSubmit: values => {
      setOpenSnack(true);
      values.email = '';
    },
    onReset: values => {
      setOpenSnack(true);
      values.email = '';
    },
  });

  const handleClose = () => {
    setOpenSnack(false);
  };

  return (
    <Box sx={footerStyle}>
      <Box sx={footerContent}>
        <Box sx={socialMediaContainer}>
          <Typography gutterBottom={true} variant='h2'>
            Gent's Hat
          </Typography>
          <Box sx={socialMediaIcons}>
            <Link href='#'>
              <Icon.Facebook fontSize='large' />
            </Link>
            <Link href='#'>
              <Icon.Instagram fontSize='large' />
            </Link>
            <Link href='#'>
              <Icon.Twitter fontSize='large' />
            </Link>
          </Box>
        </Box>
        <Box sx={newsletterContainer}>
          <Typography align='center' gutterBottom={true} variant='h4'>
            Join our newsletter
          </Typography>
          <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <Box sx={inputContainer}>
              <TextField
                sx={inputField}
                id='email'
                InputProps={{ style: { fontFamily: 'Lora' } }}
                fullWidth={true}
                placeholder='E-mail'
                variant='outlined'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                autoComplete='email'
              />
              <Button sx={joinButton} variant='contained' type='reset'>
                Join
              </Button>
            </Box>
          </form>
          <Snackbar
            open={openSnack}
            onClose={handleClose}
            autoHideDuration={5000}
            sx={{ color: 'blue' }}
          >
            <Alert onClose={handleClose} severity='success'>
              Thank you for joining our newsletter!
            </Alert>
          </Snackbar>
          <Typography
            sx={{ color: '#AAA', margin: '1rem' }}
            align='center'
            variant='caption'
          >
            This form is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply
          </Typography>
          <Typography sx={{ paddingTop: '1rem' }} variant='body2'>
            Copyright 2023. Design by Gent's Hat{' '}
          </Typography>
        </Box>
        <Box sx={contactContainer}>
          <Typography gutterBottom={true} variant='h4'>
            Contact
          </Typography>
          <Typography variant='body2'>
            shop@gentshat.com
            <br />
            <br />
          </Typography>
          <Typography sx={{ color: '#AAA' }} variant='body2'>
            The Gent's Hat Company
          </Typography>
          <Typography sx={{ color: '#AAA' }} variant='body2'>
            720 Ninth Avenue
          </Typography>
          <Typography sx={{ color: '#AAA' }} variant='body2'>
            New York, NY 10028
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

/* ----------------------
       CSS STYLING
---------------------- */

const footerStyle: SxProps<Theme> = theme => ({
  display: 'flex',
  justifyContent: 'center',
  height: 'var(--footer-height-xl)',
  width: '100%',
  color: 'white',
  background: 'black',
  borderTop: '5px solid #DAB90C',
  boxShadow:
    '0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.12)',
  [theme.breakpoints.down('lg')]: {
    height: 'var(--footer-height-lg)',
  },
  [theme.breakpoints.down('md')]: {
    height: 'var(--footer-height-md)',
  },
  [theme.breakpoints.down('sm')]: {
    height: 'var(--footer-height-sm)',
  },
});

const footerContent: SxProps<Theme> = theme => ({
  display: 'flex',
  justifyContent: 'space-around',
  width: '120rem',
  [theme.breakpoints.down('xl')]: {
    width: '90rem',
  },
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const socialMediaContainer: SxProps<Theme> = theme => ({
  marginTop: '1.6rem',
  width: '25%',

  [theme.breakpoints.down('lg')]: {
    width: '100%',
    textAlign: 'center',
  },
});

const socialMediaIcons: SxProps<Theme> = theme => ({
  '& > * > *': {
    marginRight: '1rem',
  },
  [theme.breakpoints.down('lg')]: {
    display: 'flex',
    justifyContent: 'center',
    '& > * > *': {
      marginLeft: '1rem',
    },
  },
});

const newsletterContainer: SxProps<Theme> = theme => ({
  display: 'flex',
  width: '33%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('lg')]: {
    marginTop: '3rem',
    marginBottom: '1.6rem',
    order: 3,
    width: '100%',
  },
});

const inputContainer: SxProps<Theme> = theme => ({
  display: 'flex',
  paddingTop: '0.5rem',
  marginBottom: '1rem',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
});

const inputField: SxProps<Theme> = theme => ({
  backgroundColor: '#DCDCDC',
  borderRadius: '5px',
  width: '30rem',
  [theme.breakpoints.down('xl')]: {
    width: '20rem',
  },
  [theme.breakpoints.down('lg')]: {
    width: '30rem',
  },
  [theme.breakpoints.down('md')]: {
    width: '20rem',
  },
  [theme.breakpoints.down('sm')]: {
    width: '15rem',
  },
});

const joinButton: SxProps<Theme> = theme => ({
  width: '7rem',
  marginLeft: '1rem',
  fontFamily: 'Lora',
  fontWeight: 'bold',
  fontSize: '1.3rem',
  '&:hover': {
    color: 'white',
  },
  [theme.breakpoints.down('sm')]: {
    alignSelf: 'center',
    marginLeft: '0rem',
    marginTop: '0.8rem',
  },
});

const contactContainer: SxProps<Theme> = theme => ({
  display: 'flex',
  width: '25%',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '3.9rem',
  [theme.breakpoints.down('lg')]: {
    alignItems: 'center',
    marginTop: '3rem',
    width: '100%',
  },
});

export default Footer;
