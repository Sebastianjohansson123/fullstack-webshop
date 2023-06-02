import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
} from '@mui/material';
import * as React from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import { Order, useUserContext } from '../contexts/UserContext';

type OrderRow = {
  productId: string;
  quantity: number;
  _id: string;
};

type Address = {
  fullName: string;
  address: string;
  zipCode: number;
  city: string;
  email: string;
  phoneNumber: number;
  _id: string;
};

export default function OrderList() {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const { updateOrderbyId, orders } = useUserContext();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  {
    return (
      <>
        <Container>
          {orders.map((order: Order) => (
            <div style={{ marginBottom: '0.5rem' }} key={order._id}>
              {/* <h2>Order ID: {order._id}</h2>
              <h3>User ID: {order.user}</h3>
              <h4>Total Price: {order.totalPrice}</h4>
              <h4>Address: {order.address.address}</h4>
              <h4>Name: {order.address.fullName}</h4>
              <p>Sent: {order.Sent ? "Yes" : "No"}</p> */}

              <Accordion
                sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
                expanded={expanded === order._id.toString()}
                onChange={handleChange(order._id.toString())}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${order._id}-content`}
                  id={order._id.toString()}
                >
                  <Typography variant='caption' sx={{ flex: 1 }}>
                    {order._id}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{ display: 'flex', flexDirection: 'column' }}
                >
                  <Typography variant='caption'>
                    UserId: {order.user}
                  </Typography>
                  <Typography
                    sx={{ borderBottom: '1px solid grey' }}
                    variant='caption'
                  >
                    Total price: {order.totalPrice} $
                  </Typography>
                  <Typography variant='body1'>Products</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {order.orderRows.map((row: OrderRow) => (
                      <div
                        style={{ display: 'flex', flexDirection: 'column' }}
                        key={row._id}
                      >
                        <Typography
                          sx={{ borderTop: '1px solid grey' }}
                          variant='caption'
                        >
                          id: {row.productId}
                        </Typography>
                        <Typography
                          sx={{ borderBottom: '1px solid grey' }}
                          variant='caption'
                        >
                          Quantity: {row.quantity}
                        </Typography>
                      </div>
                    ))}
                    <Typography variant='body1'>Delivery adress</Typography>
                    <Typography variant='caption'>
                      Full name: {order.address.fullName}
                    </Typography>
                    <Typography variant='caption'>
                      Address: {order.address.address}
                    </Typography>
                    <Typography variant='caption'>
                      Zip code: {order.address.zipCode}
                    </Typography>
                    <Typography variant='caption'>
                      Citty: {order.address.city}
                    </Typography>
                    <Typography variant='caption'>
                      Email: {order.address.email}
                    </Typography>
                    <Typography
                      sx={{ borderBottom: '1px solid grey' }}
                      variant='caption'
                    >
                      Phonenumber: {order.address.phoneNumber}
                    </Typography>

                    <Typography variant='caption'>
                      Delivery status:
                      {order.Sent ? (
                        <span> Sent ✔️</span>
                      ) : (
                        <span> Pending ❌</span>
                      )}
                    </Typography>
                    <Button
                      variant='contained'
                      sx={{ width: '100%', fontSize: '0.7rem' }}
                      onClick={() => updateOrderbyId(order._id.toString())}
                    >
                      Markera som skickad
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </Container>
      </>
    );
  }
}
