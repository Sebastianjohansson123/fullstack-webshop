import { Button, Input, Theme } from '@mui/material';
import { Box, SxProps } from '@mui/system';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Product } from '../../data';
import AddToCartButton from './AddToCartButton';

interface Props {
  product: Product;
}

function ProductBtnSection({ product }: Props) {
  const [quantity, setQuantity] = useState<number>(1);

  // Define an event handler function that is called when the user changes the value of the input field associated with the component.
  // The function takes an event object as its argument and extracts the current value of the input field.
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Updates the quantity state based on the user input in the input field,
    // making sure that the new value is valid and greater than or equal to 1.
    if (inputValue === '') {
      setQuantity(NaN);
    } else {
      const newQuantity = parseInt(inputValue);
      if (isNaN(newQuantity) || newQuantity < 1) {
        return;
      }
      setQuantity(newQuantity);
    }
  };

  // Define an event handler function that is called when the input field associated with the component loses focus.
  const handleQuantityBlur = () => {
    if (isNaN(quantity)) {
      setQuantity(1);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
        <Input
          type='number'
          value={quantity}
          onChange={handleQuantityChange}
          onBlur={handleQuantityBlur}
          sx={quantityBoxStyle}
          inputProps={{
            style: {
              textAlign: 'center',
            },
            min: 1,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <AddToCartButton
            product={product}
            quantity={quantity}
            onAddToCart={() => setQuantity(1)}
          />
        </Box>
      </Box>
      <NavLink to='/checkout'>
        <Box sx={{ flexGrow: 1 }}>
          <Button variant='contained' sx={checkOutBtnStyle}>
            Checkout
          </Button>
        </Box>
      </NavLink>
    </Box>
  );
}

/* ----------------------
       CSS STYLING
---------------------- */

const quantityBoxStyle: SxProps<Theme> = theme => ({
  width: '3.5rem',
  height: '2.3rem',
  border: '1px solid black',
  mt: 0.2,
  padding: '0.3rem',
  marginRight: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '-moz-appearance': 'textfield',
  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    '-webkit-appearance': 'inner-spin-button',
  },
  '&::-moz-inner-spin-button, &::-moz-outer-spin-button': {
    '-moz-appearance': 'inner-spin-button',
    appearance: 'auto',
  },
});

const checkOutBtnStyle: SxProps<Theme> = theme => ({
  background: 'black',
  color: 'white',
  width: '100%',
  '&:hover': {
    background: theme.palette.secondary.main,
    color: 'black',
  },
});

export default ProductBtnSection;
