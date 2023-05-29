import {
  Box,
  CardActionArea,
  CardMedia,
  Skeleton,
  styled,
  SxProps,
  Theme,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../data';
import AddToCartButton from './AddToCartButton';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const defaultQuantity = 1;

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
    <Card sx={cardStyle} data-cy='product'>
      <Link style={{ textDecoration: 'none' }} to={`/product/${product._id}`}>
        <StyledCardActionArea>
          <Box sx={{ position: 'relative' }}>
            <Box sx={hatHoverStyle}>View Product</Box>
            <Skeleton
              variant='rounded'
              width={240}
              height={150}
              animation='wave'
              sx={loading || error ? {} : { display: 'none' }}
            />
            <CardMedia
              sx={loading || error ? { display: 'none' } : imageStyle}
              component='img'
              height='150'
              image={`http://localhost:3000/api/images/` + product.image}
              alt={product.description}
              onLoad={handleLoad}
              onError={handleError}
            />
          </Box>

          <CardContent>
            <Typography
              sx={priceTagStyle}
              variant='body2'
              data-cy='product-price'
            >
              ${product.price}
            </Typography>
            <Typography
              sx={{ maxWidth: '200px', overflowWrap: 'break-word' }}
              gutterBottom
              variant='h5'
              component='div'
              data-cy='product-title'
            >
              {product.name}
            </Typography>
          </CardContent>
        </StyledCardActionArea>
      </Link>
      <Box sx={{ marginTop: 'auto' }}>
        <AddToCartButton
          product={product}
          quantity={defaultQuantity}
          onAddToCart={() => console.log('eslint = ägd')}
        />
      </Box>
    </Card>
  );
}

/* ----------------------
       CSS STYLING
---------------------- */

const imageStyle: SxProps<Theme> = theme => ({
  objectFit: 'contain',
  pt: 2,
  pb: 2,
});
const cardStyle: SxProps<Theme> = theme => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '240px',
  maxWidth: '240px',
  borderRadius: 2,
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

const StyledCardActionArea = styled(CardActionArea)(({ theme }) => ({
  '& .MuiCardActionArea-focusHighlight': {
    backgroundColor: 'transparent',
  },
}));

const hatHoverStyle: SxProps<Theme> = theme => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'transparent',
  color: 'transparent',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: theme.typography.body2.fontFamily,
  zIndex: 1,

  '&:hover': {
    background: '#d9d9d977',
    color: 'black',
  },
});

const priceTagStyle: SxProps<Theme> = theme => ({
  border: '1px solid black',
  padding: '0.3rem 0.4rem',
  display: 'inline',
  background: '#D1D1D1',
  position: 'absolute',
  right: '1.5rem',
  top: '8.5rem',
});
