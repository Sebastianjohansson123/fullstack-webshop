import * as Icon from '@mui/icons-material';
import {
  Box,
  CardMedia,
  Container,
  Paper,
  Skeleton,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Product } from '../../data';
import ProductBtnSection from '../components/ProductBtnSection';
import { useProducts } from '../contexts/ProductsContext';

// get the product id from the url and find the product to display
function ProductDescription() {
  const { page, id } = useParams<{ page: string; id: string }>();
  const { databaseProducts } = useProducts();
  const product: Product | undefined = databaseProducts.find(p => p.id === id);
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

  if (!product) {
    return (
      <Typography variant='h3' sx={{ ml: 3, marginBottom: '10rem' }}>
        Product not found
      </Typography>
    );
  } else {
    return (
      // Show all the product details, and if statement for backbutton to admin or home from product.
      <Container>
        <Paper elevation={3} sx={mainBoxStyle}>
          <Box>
            {page === 'product' ? (
              <NavLink to='/'>
                <Typography sx={flexAlignStyle} variant='h6'>
                  <Icon.ArrowBack />
                  Back To Products
                </Typography>
              </NavLink>
            ) : (
              <NavLink to='/admin'>
                <Typography sx={flexAlignStyle} variant='h6'>
                  <Icon.ArrowBack />
                  Back To Admin
                </Typography>
              </NavLink>
            )}
          </Box>
          <Box sx={contentStyle}>
            <Box sx={imgWrapperStyle}>
              <Skeleton
                variant='rounded'
                animation='wave'
                sx={loading || error ? skeletonSx : { display: 'none' }}
              />
              <CardMedia
                sx={loading || error ? { display: 'none' } : {}}
                component='img'
                image={product.image}
                alt={product.title}
                onLoad={handleLoad}
                onError={handleError}
              />
            </Box>
            <Box sx={textAndBtnWrapperStyle}>
              <Typography
                sx={{ overflowWrap: 'break-word', maxWidth: '30rem' }}
                variant='h4'
                data-cy='product-title'
              >
                {product.title}
              </Typography>
              <Typography variant='h6' data-cy='product-price'>
                ${product.price} &nbsp; {'|'} &nbsp; {product.color} &nbsp;{' '}
                {'|'} &nbsp; {product.size}
              </Typography>
              <Typography variant='h6' sx={{ mt: 2, mb: 1, fontSize: '1rem' }}>
                Product Description
              </Typography>
              <Typography
                sx={{ marginBottom: '0.5rem' }}
                variant='body2'
                data-cy='product-description'
              >
                {product.description}
              </Typography>
              {product.details1 || product.details2 || product.details3 ? (
                <Typography
                  variant='h6'
                  sx={{ mt: 2, mb: 1, fontSize: '1rem' }}
                >
                  Product Details
                </Typography>
              ) : null}
              <Box>
                <ul style={{ marginLeft: '1.5rem' }}>
                  {product.details1 && (
                    <li>
                      <Typography component='span' variant='body2'>
                        {product.details1}
                      </Typography>
                    </li>
                  )}
                  {product.details2 && (
                    <li>
                      <Typography component='span' variant='body2'>
                        {product.details2}
                      </Typography>
                    </li>
                  )}
                  {product.details3 && (
                    <li>
                      <Typography component='span' variant='body2'>
                        {product.details3}
                      </Typography>
                    </li>
                  )}
                </ul>
              </Box>

              <Box sx={{ display: 'flex', margin: '1.4rem 0rem 1rem 0rem' }}>
                {(product.inStock as never) < 1 ? (
                  <>
                    <Icon.HighlightOff sx={{ mr: 1, mt: 0.15, color: 'red' }} />
                    <Box>
                      <Typography variant='body1'>
                        Out of stock — awaiting next shipment
                      </Typography>
                      <Typography sx={{ fontSize: '0.7rem' }}>
                        Back in store within 10 working days
                      </Typography>
                    </Box>
                  </>
                ) : (
                  <>
                    <Icon.CheckCircleOutline
                      sx={{ mr: 1, mt: 0.15, color: 'green' }}
                    />
                    <Box>
                      <Typography variant='body1'>In stock</Typography>
                      <Typography sx={{ fontSize: '0.7rem' }}>
                        Expected delivery: 2—4 working days
                      </Typography>
                    </Box>
                  </>
                )}
              </Box>
              <ProductBtnSection product={product} />
            </Box>
          </Box>
        </Paper>
      </Container>
    );
  }
}

/* ----------------------
       CSS STYLING
---------------------- */

const mainBoxStyle: SxProps<Theme> = theme => ({
  background: 'white',
  margin: '0 1rem',
  padding: '1.5rem',
  maxWidth: 'lg',
});

const contentStyle: SxProps<Theme> = theme => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
});

const imgStyle: SxProps<Theme> = theme => ({
  maxWidth: '100%',
  p: 4,
  [theme.breakpoints.down('md')]: {
    maxWidth: '70%',
  },
});

const imgWrapperStyle: SxProps<Theme> = theme => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& img': imgStyle(theme),
  [theme.breakpoints.up('sm')]: {
    '& img': {
      maxWidth: '80%',
    },
  },
});

const skeletonSx: SxProps<Theme> = theme => ({
  width: '100%',
  height: '100%',
  mx: 3,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '20rem',
    mx: 2,
    my: 2,
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '15rem',
  },
});

const textAndBtnWrapperStyle: SxProps<Theme> = theme => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '0 1rem',
});

const flexAlignStyle: SxProps<Theme> = theme => ({
  display: 'flex',
  alignItems: 'center',
  margin: '1rem 0rem 3rem 1.4rem',
});

export default ProductDescription;
