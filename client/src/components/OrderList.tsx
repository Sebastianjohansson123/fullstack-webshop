import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface Order {
  id: number;
  orderNumber: string;
  items: string[];
}

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

  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      {filteredOrders.map(order => (
        <Accordion
          key={order.id}
          expanded={expandedOrder === order}
          onChange={() => handleAccordionChange(order)}
        >
          <AccordionSummary>
            <Typography>Order Number: {order.orderNumber}</Typography>
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
