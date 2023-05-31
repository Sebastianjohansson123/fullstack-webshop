import * as Icon from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Paper,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OrderData from '../components/OrderData';
import { useCart } from '../contexts/CartContext';
import { FormContext } from '../contexts/FormContext';

function OrderConfirmation() {
  /* ---------------------------
        PROPS AND STATES
  --------------------------- */

  // PROPS //

  const { formValues } = useContext(FormContext);
  const { fullName, email, phoneNumber, address, city, zipCode } = formValues;
  const { cartItems, totalPrice, clearProductsFromCart } = useCart();
  const orderItems = cartItems.map(item => (
    <OrderData
      key={item._id}
      title={item.name}
      price={item.price}
      quantity={item.quantity}
      size={item.size}
      image={item.image}
      color={item.color}
    />
  ));

  // STATES //

  const [newOrderItems, setNewOrderItems] = useState(orderItems);
  const [newTotalPrice, setNewTotalPrice] = useState(totalPrice);

  useEffect(() => {
    setNewOrderItems(orderItems);
    setNewTotalPrice(totalPrice);
    clearProductsFromCart();
  }, []);

  /* --------------------------------
        ORDER CONFIRMATION PAGE
  -------------------------------- */

  return (
    <Container>
      {/* CONTENT CONTAINER */}

      <Paper
        elevation={3}
        sx={{
          mt: '4rem',
          borderRadius: '1rem',
          paddingBottom: '2rem',
        }}
      >
        {/* CONFIRMATION MESSAGE */}

        <Box sx={confirmStyleBoxSX}>
          <Typography variant='h6' sx={typographyStylesSX}>
            Your order has been received
          </Typography>
          <Icon.CheckCircleOutline sx={iconStylesSX} color='success' />
          <Typography variant='body2' sx={typographyStylesSX}>
            Thank you for your purchase!
          </Typography>
          <Typography variant='body1'>
            A receipt for order{' '}
            <span>#{Math.floor(Math.random() * 100000) + 100000}</span> has been
            sent to your e-mail.
          </Typography>
          <Typography variant='body1' sx={{ mx: 2, textAlign: 'center' }}>
            Your order is expected to be delivered within 2—4 working days.
          </Typography>
          <Link to='../'>
            <Button sx={buttonStyleSX} variant='contained'>
              Continue shopping
            </Button>
          </Link>
        </Box>

        {/* USER AND SHIPPING DETAILS */}

        <Box sx={shippingDetailsStyleSX}>
          <Box sx={{ marginRight: '4rem' }}>
            <Typography
              gutterBottom
              variant='h3'
              color='secondary.dark'
              sx={subHeaderStyleSX}
            >
              User details
            </Typography>
            <Typography sx={formDataStyleSX}>{fullName}</Typography>
            <Typography sx={formDataStyleSX}>{email}</Typography>
            <Typography sx={formDataStyleSX}>{phoneNumber}</Typography>
          </Box>
          <Box>
            <Typography
              gutterBottom
              variant='h3'
              color='secondary.dark'
              sx={subHeaderStyleSX}
            >
              Shipping details
            </Typography>
            <Typography sx={formDataStyleSX}>{address}</Typography>
            <Typography sx={formDataStyleSX}>{city}</Typography>
            <Typography sx={formDataStyleSX}>{zipCode}</Typography>
          </Box>
        </Box>

        {/* LIST OF ORDERED PRODUCTS */}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingBottom: '1rem',
          }}
        >
          <Typography variant='h3' color='secondary.dark' sx={subHeaderStyleSX}>
            Products
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Typography
              variant='h3'
              color='secondary.dark'
              sx={subHeaderStyleSX}
            >
              Quantity
            </Typography>
          </Box>
        </Box>

        <Box>
          <Typography sx={ItemStyleSX}>{newOrderItems}</Typography>
        </Box>
        <Typography sx={priceStyleSX}>Total: ${newTotalPrice}</Typography>
      </Paper>
    </Container>
  );
}

/* ---------------------
      CSS STYLING
--------------------- */

const confirmStyleBoxSX: SxProps<Theme> = theme => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  py: '2rem',
  px: '1rem',
  gap: '1rem',
  borderRadius: '1rem',
  backgroundColor: 'white',
  [theme.breakpoints.up('sm')]: {
    py: '4rem',
    h6: {
      fontSize: '1.5rem',
    },
  },
  [theme.breakpoints.up('md')]: {
    py: '6rem',
    h6: {
      fontSize: '2rem',
    },
  },
});

const typographyStylesSX: SxProps<Theme> = theme => ({
  textAlign: 'center',
  fontWeight: '600',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
});

const iconStylesSX: SxProps<Theme> = theme => ({
  fontSize: '30px',
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '3rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '4rem',
  },
});

const buttonStyleSX: SxProps<Theme> = theme => ({
  fontWeight: '600',
  mt: 4,
  '&:hover': {
    color: 'white',
  },
  [theme.breakpoints.between('sm', 'md')]: {
    scale: '1.2',
  },
  [theme.breakpoints.up('md')]: {
    scale: '1.5',
  },
});

const priceStyleSX: SxProps<Theme> = theme => ({
  textAlign: 'end',
  pt: '1rem',
  mr: '1.2rem',
  pb: 3,
  fontWeight: '600',
  [theme.breakpoints.between('sm', 'md')]: {
    fontSize: '1.2rem',
    mr: '2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
    mr: '2.8rem',
  },
});

const ItemStyleSX: SxProps<Theme> = theme => ({
  marginLeft: '0.5rem',
  marginRight: '0.5rem',
  [theme.breakpoints.up('sm')]: {
    marginLeft: '2rem',
    marginRight: '2rem',
  },
  [theme.breakpoints.up('md')]: {
    marginLeft: '2.8rem',
    marginRight: '2.8rem',
  },
});

const subHeaderStyleSX: SxProps<Theme> = theme => ({
  paddingTop: '3rem',
  fontSize: '1.8rem',
  mr: '2.4rem',
  ml: '3.0rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.2rem',
    ml: '2.2rem',
    mr: '2.9rem',
  },
  [theme.breakpoints.down('sm')]: {
    ml: '1.6rem',
    mr: '1.6rem',
  },
});

const formDataStyleSX: SxProps<Theme> = theme => ({
  fontStyle: 'italic',
  ml: '1.6rem',
  fontSize: '0.8rem',
  [theme.breakpoints.up('sm')]: {
    ml: '2.2rem',
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    ml: '3rem',
    fontSize: '1.2rem',
  },
});

const shippingDetailsStyleSX: SxProps<Theme> = theme => ({
  display: 'flex',
  pt: 3,
  pb: 3,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
});

export default OrderConfirmation;
