import {
  Box,
  CardMedia,
  Skeleton,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import {
  cardImgStyle,
  descriptionTextStyleSx,
  leftContainerSx,
  mediaFontSizeStyleSx,
  productTotalStyleSx,
  quantityBoxStyleSx,
  quantityStyleSx,
} from './CheckoutCard';

interface Props {
  title: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
  color: string;
}

export default function OrderData(props: Props) {
  // Activates skeleton while image is loading or does not load
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <Box sx={{ pt: 1, borderBottom: 'solid black 1px', display: 'flex' }}>
      <Box data-cy='cart-item' sx={displayOrderItem}>
        <Box sx={imageBoxStyleSx}>
          <Skeleton
            variant='rounded'
            animation='wave'
            sx={loading || error ? skeletonSx : { display: 'none' }}
          />
          <CardMedia
            sx={loading || error ? { display: 'none' } : cardImgStyle}
            component='img'
            height='150'
            image={props.image}
            alt={props.title}
            onLoad={handleLoad}
            onError={handleError}
          />
        </Box>
        <Box sx={leftContainerSx}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingRight: '1rem',
            }}
          ></Box>
          <Box sx={{ ml: 1 }}>
            <Typography
              data-cy='product-title'
              variant='h3'
              sx={mediaFontSizeStyleSx}
            >
              {props.title}
            </Typography>
            <Typography
              variant='body2'
              color='secondary.dark'
              data-cy='product-price'
              sx={descriptionTextStyleSx}
            >
              ${props.price} &nbsp; {'|'} &nbsp; {props.color} &nbsp; {'|'}{' '}
              &nbsp; {props.size}
            </Typography>
            <Typography
              data-cy='product-price'
              variant='body2'
              sx={productTotalStyleSx}
            >
              Total: ${props.price * props.quantity}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          ...quantityBoxStyleSx,
          alignItems: 'center',
          justifyContent: 'flex-end',
          display: 'flex',
        }}
      >
        <Typography
          data-cy='product-quantity'
          variant='body2'
          sx={quantityStyleSx}
        >
          {props.quantity}
        </Typography>
      </Box>
    </Box>
  );
}

/* ----------------------
       CSS STYLING
---------------------- */

const displayOrderItem: SxProps<Theme> = theme => ({
  display: 'flex',
  width: '100%',
  paddingRight: '2rem',
  mb: 2,
  mt: 1,
  [theme.breakpoints.down('md')]: {
    mb: 1,
  },
  [theme.breakpoints.down('sm')]: {
    paddingRight: '0.5rem',
    pl: 0.5,
    flexDirection: 'column',
  },
});

const imageBoxStyleSx: SxProps<Theme> = theme => ({
  maxWidth: '120px',
  minWidth: '120px',
  maxHeight: '120px',
  minHeight: '120px',
  mx: '10px',
  mt: '0.8rem',
  [theme.breakpoints.down('md')]: {
    maxWidth: '80px',
    minWidth: '80px',
    maxHeight: '80px',
    minHeight: '80px',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100px',
    minWidth: '100px',
    maxHeight: '100px',
    minHeight: '100px',
  },
});

const skeletonSx: SxProps<Theme> = theme => ({
  maxWidth: '120px',
  minWidth: '120px',
  maxHeight: '120px',
  minHeight: '120px',
  [theme.breakpoints.down('md')]: {
    maxWidth: '80px',
    minWidth: '80px',
    maxHeight: '80px',
    minHeight: '80px',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100px',
    minWidth: '100px',
    maxHeight: '100px',
    minHeight: '100px',
  },
});
