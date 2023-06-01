import {
  Button,
  Container,
  FormHelperTextProps,
  Grid,
  Paper,
  SxProps,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useCart } from '../contexts/CartContext';
import { FormContext } from '../contexts/FormContext';
import { useProducts } from '../contexts/ProductsContext';
import { useUserContext } from '../contexts/UserContext';

/* ----------------------
      YUP VALIDATION
----------------------- */

const checkoutFormSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Please tell us your full name.')
    .min(
      5,
      'The name you have given us it too short. Please give us a name of minimum 5 characters.'
    ),
  email: Yup.string()
    .email(
      "Your e-mail seems to be incorrectly formatted. Please make sure it's correct."
    )
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Your e-mail seems to be incorrectly formatted. Please make sure it's correct."
    )
    .required('Please tell us your email.')
    .min(
      7,
      'The e-mail you have given us it too short. Please give us an e-mail of minimum 7 characters.'
    ),
  phoneNumber: Yup.string()
    .required('Please tell us your phone number.')
    .matches(
      /^[0-9]*$/,
      'Your phone number must be numeric. Please give us a correctly formatted phone number.'
    )
    .min(
      8,
      'The phone number you have given us it too short. Please give us a phone number of minimum 8 characters.'
    )
    .max(
      15,
      'The phone number you have given us it too long. Please give us a phone number of maximum 15 characters.'
    ),
  address: Yup.string()
    .required('Please tell us on what address you currently live at.')
    .min(
      6,
      'The address you have given us it too short. Please give us an address of minimum 6 characters.'
    )
    .max(
      60,
      'The address you have given us it too long. Please give us an address of maximum 60 characters.'
    ),
  zipCode: Yup.string()
    .required('Please tell us your zip code.')
    .matches(
      /^[0-9]*$/,
      'Your zip code must be numeric. Please give us a correctly formatted zip code.'
    )
    .min(
      5,
      'The zip code should be 5 characters long. Please make sure you have given us a correct zip code.'
    )
    .max(
      5,
      'The zip code should be 5 characters long. Please make sure you have given us a correct zip code.'
    ),
  city: Yup.string().required('Please tell us in which city you reside.'),
});

/* ----------------------
         FORMIK
---------------------- */

type checkoutFormValues = Yup.InferType<typeof checkoutFormSchema>;

export default function CheckoutForm() {
  const navigate = useNavigate();
  const { setFormValues } = useContext(FormContext);
  const { user, getOrderForUser } = useUserContext();
  const { cartItems, totalPrice, clearProductsFromCart } = useCart();
  const { getProducts } = useProducts();

  const handlePlaceOrder = () => {
    // logiken skrivs här för att slutföra ordern
  };

  const formik = useFormik<checkoutFormValues>({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      address: '',
      zipCode: '',
      city: '',
    },
    validationSchema: checkoutFormSchema,
    onSubmit: async values => {
      setFormValues(values);

      const address = values;
      const orderRows = cartItems.map(item => ({
        productId: item._id,
        quantity: item.quantity,
      }));

      const order = {
        orderRows,
        address,
        totalPrice,
      };

      try {
        const response = await fetch('api/orders/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        });
        if (!response.ok) {
          throw new Error('Something went wrong');
        }

        // Snackbar
        enqueueSnackbar('Order has been placed! 🙃 ', {
          variant: 'success',
          // SnackbarProps: { 'data-cy': 'added-to-cart-toast' } as any,
        });
        clearProductsFromCart();
        getProducts();
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    },
  });

  interface CustomFormHelperTextProps
    extends Partial<FormHelperTextProps<'p', `object`>> {
    'data-cy'?: string;
  }

  /* ----------------------
       FORM COMPONENT
  ---------------------- */

  return (
    <Paper elevation={3}>
      {user ? (
        <form onSubmit={formik.handleSubmit} data-cy='customer-form'>
          <Container sx={formContainer}>
            <Typography sx={fontStyle} variant='h3' gutterBottom>
              Checkout
            </Typography>

            {/* NAME INPUT */}

            <Grid
              display='flex'
              alignItems='center'
              container
              rowSpacing={1}
              columnSpacing={5}
            >
              <Grid
                sx={formStyle}
                item
                md={6}
                display='flex'
                alignSelf='flex-start'
              >
                <TextField
                  fullWidth
                  id='fullName'
                  label='Full name'
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
                  helperText={formik.touched.fullName && formik.errors.fullName}
                  margin='normal'
                  inputProps={{
                    'data-cy': 'customer-name',
                    style: { fontFamily: 'Lora' },
                  }}
                  FormHelperTextProps={
                    {
                      'data-cy': 'customer-name-error',
                    } as CustomFormHelperTextProps
                  }
                  autoComplete='name'
                />
              </Grid>

              {/* EMAIL INPUT */}

              <Grid
                sx={formStyle}
                item
                md={6}
                display='flex'
                alignSelf='flex-start'
              >
                <TextField
                  fullWidth
                  id='email'
                  label='E-mail'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  margin='normal'
                  inputProps={{
                    'data-cy': 'customer-email',
                    style: { fontFamily: 'Lora' },
                  }}
                  FormHelperTextProps={
                    {
                      'data-cy': 'customer-email-error',
                    } as CustomFormHelperTextProps
                  }
                  autoComplete='email'
                />
              </Grid>

              {/* PHONE NUMBER INPUT */}

              <Grid
                sx={formStyle}
                item
                md={6}
                display='flex'
                alignSelf='flex-start'
              >
                <TextField
                  fullWidth
                  id='phoneNumber'
                  label='Phone number'
                  type='tel'
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                  margin='normal'
                  inputProps={{
                    'data-cy': 'customer-phone',
                    style: { fontFamily: 'Lora' },
                  }}
                  FormHelperTextProps={
                    {
                      'data-cy': 'customer-phone-error',
                    } as CustomFormHelperTextProps
                  }
                  autoComplete='tel'
                />
              </Grid>

              {/* ADDRESS INPUT */}

              <Grid
                sx={formStyle}
                item
                md={6}
                display='flex'
                alignSelf='flex-start'
              >
                <TextField
                  fullWidth
                  id='address'
                  label='Address'
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                  margin='normal'
                  inputProps={{
                    'data-cy': 'customer-address',
                    style: { fontFamily: 'Lora' },
                  }}
                  FormHelperTextProps={
                    {
                      'data-cy': 'customer-address-error',
                    } as CustomFormHelperTextProps
                  }
                  autoComplete='street-address'
                />
              </Grid>

              {/* POSTAL CODE INPUT */}

              <Grid
                sx={formStyle}
                item
                md={6}
                display='flex'
                alignSelf='flex-start'
              >
                <TextField
                  fullWidth
                  id='zipCode'
                  label='Zip code'
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.zipCode && Boolean(formik.errors.zipCode)
                  }
                  helperText={formik.touched.zipCode && formik.errors.zipCode}
                  margin='normal'
                  inputProps={{
                    'data-cy': 'customer-zipcode',
                    style: { fontFamily: 'Lora' },
                  }}
                  FormHelperTextProps={
                    {
                      'data-cy': 'customer-zipcode-error',
                    } as CustomFormHelperTextProps
                  }
                  autoComplete='postal-code'
                />
              </Grid>

              {/* CITY INPUT */}

              <Grid
                sx={formStyle}
                item
                md={6}
                display='flex'
                alignSelf='flex-start'
              >
                <TextField
                  fullWidth
                  id='city'
                  label='City'
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
                  margin='normal'
                  inputProps={{
                    'data-cy': 'customer-city',
                    style: { fontFamily: 'Lora' },
                  }}
                  FormHelperTextProps={
                    {
                      'data-cy': 'customer-city-error',
                    } as CustomFormHelperTextProps
                  }
                  autoComplete='address-level2'
                />
              </Grid>
            </Grid>

            {/* SUBMIT FORM BUTTON */}

            <Container sx={buttonContainer}>
              <Button
                sx={buttonStyle}
                color='primary'
                variant='contained'
                type='submit'
                onClick={handlePlaceOrder}
              >
                Place order
              </Button>
            </Container>
          </Container>
        </form>
      ) : (
        <Container sx={NavlinkContainer}>
          <Button onClick={() => navigate('/login')}>
            Please login to place an order!
          </Button>
          <Button onClick={() => navigate('/register')}>
            If you don't have an account, register here.
          </Button>
        </Container>
      )}
    </Paper>
  );
}

/* ----------------------
       CSS STYLING
---------------------- */

const fontStyle: SxProps<Theme> = theme => ({
  [theme.breakpoints.down('md')]: {
    fontSize: '1.9rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.3rem',
  },
});

const formContainer: SxProps<Theme> = theme => ({
  width: '70%',
  paddingTop: '5rem',
  paddingBottom: '4rem',
});

const formStyle: SxProps<Theme> = theme => ({
  width: '100%',
});

const buttonStyle: SxProps<Theme> = theme => ({
  alignSelf: 'center',
  width: '11rem',
  height: '3rem',
  fontFamily: 'Lora',
  fontWeight: 900,
  '&:hover': {
    color: 'white',
  },
});

const buttonContainer: SxProps<Theme> = theme => ({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '2rem',
});

const NavlinkContainer: SxProps<Theme> = theme => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '1rem',
  '&:hover': {
    color: 'black',
  },
});
