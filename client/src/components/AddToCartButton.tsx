import { Theme } from '@emotion/react';
import { Box, SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { Product } from '../../data';
import { useCart } from '../contexts/CartContext';

interface Props {
  product: Product;
  quantity: number;
  onAddToCart: () => void;
}
// Using add to cart button and snackbar to show the user that the product has been added to the cart.
export default function AddToCartButton({
  product,
  quantity,
  onAddToCart,
}: Props) {
  const { increaseProductToCart } = useCart();
  const { enqueueSnackbar } = useSnackbar();

  // Here is the code that adds the product to the cart and shows the snackbar.
  const handleClickVariant = () => {
    increaseProductToCart(product, quantity);
    enqueueSnackbar(`${product.name} has been added!`, {
      variant: 'success',
      SnackbarProps: { 'data-cy': 'added-to-cart-toast' } as any,
    });
    onAddToCart();
  };

  return (
    <React.Fragment>
      <Box sx={buttonPosition}>
        <Button
          sx={cartButtonStyle}
          variant='contained'
          onClick={handleClickVariant}
          data-cy='product-buy-button'
        >
          Add to Cart
        </Button>
      </Box>
    </React.Fragment>
  );
}

const cartButtonStyle: SxProps<Theme> = theme => ({
  width: '100%',
  '&:hover': {
    color: 'white',
  },
});

const buttonPosition: SxProps<Theme> = theme => ({
  display: 'flex',
  justifyContent: 'center',
});
