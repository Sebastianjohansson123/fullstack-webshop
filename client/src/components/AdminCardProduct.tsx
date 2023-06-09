import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Skeleton,
  SxProps,
  Theme,
  Typography,
  styled,
} from '@mui/material';

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Product } from '../../data';
import { useProducts } from '../contexts/ProductsContext';

interface Props {
  dataProduct: Product;
}

export default function ProductCard({ dataProduct }: Props) {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { products, deleteProduct } = useProducts();

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const handleDelete = () => {
    deleteProduct(dataProduct._id!);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <Card sx={cardStyle} data-cy='product'>
      <Link
        style={{ textDecoration: 'none' }}
        to={`/database/${dataProduct._id}`}
      >
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
              image={`http://localhost:3000/api/images/` + dataProduct.image}
              alt={dataProduct.name}
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
              ${dataProduct.price}
            </Typography>
            <Typography variant='body2' component='div'>
              <span
                style={{
                  paddingRight: '0.3rem',
                  fontSize: '0.8rem',
                  fontWeight: '900',
                }}
              >
                ID:
              </span>
              <span style={{ fontSize: '0.8rem' }} data-cy='product-id'>
                {dataProduct._id}
              </span>
            </Typography>
            <Typography
              sx={{ maxWidth: '200px', overflowWrap: 'break-word' }}
              gutterBottom
              variant='h5'
              component='div'
              data-cy='product-title'
            >
              {dataProduct.name}
            </Typography>
          </CardContent>
        </StyledCardActionArea>
      </Link>
      <Box sx={{ marginTop: 'auto' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <NavLink to={`/admin/product/${dataProduct._id}`}>
            <Button
              data-cy='admin-edit-product'
              sx={editBtnStyle}
              variant='contained'
            >
              <Typography variant='body2'>Edit Product</Typography>
            </Button>
          </NavLink>

          <Button
            data-cy='admin-remove-product'
            sx={deleteBtnSX}
            variant='contained'
            color='error'
            onClick={handleDelete}
          >
            <Typography variant='body2'>Delete Product</Typography>
          </Button>
        </Box>
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

const editBtnStyle: SxProps<Theme> = theme => ({
  mb: 2,
  width: '13rem',
  '&:hover': {
    color: 'white',
  },
});

const deleteBtnSX: SxProps<Theme> = theme => ({
  mb: 2,
  width: '13rem',
  '&:hover': {
    backgroundColor: 'white',
    color: 'red',
  },
});
