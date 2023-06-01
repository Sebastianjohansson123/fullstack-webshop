import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Order } from '../contexts/UserContext';

interface OrderListProps {
  orders: Order[];
}

export function OrderList({ orders }: OrderListProps) {
  const [expandedOrder, setExpandedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAccordionChange = (order: Order) => {
    if (expandedOrder === order) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(order);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Grid item xs={12}>
      <h2>Order List</h2>
      <TextField
        label='Sök Order'
        value={searchQuery}
        onChange={handleSearchChange}
        variant='outlined'
        margin='normal'
      />
      {orders.map(order => (
        <Accordion
          key={order._id}
          expanded={expandedOrder === order}
          onChange={() => handleAccordionChange(order)}
        >
          <AccordionSummary>
            <Typography>Order Number: {order._id}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </AccordionDetails>
        </Accordion>
      ))}
    </Grid>
  );
}

export default OrderList;
