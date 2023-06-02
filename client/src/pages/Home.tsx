import {
  Box,
  CardMedia,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Product } from '../../data';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../contexts/ProductsContext';
import { useUserContext } from '../contexts/UserContext';

function Home() {
  const { products, getProducts } = useProducts();
  const { user, getOrderForUser, orders } = useUserContext();
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

  const [selectedSection, setSelectedSection] = useState(() => {
    const storedSection = localStorage.getItem('selectedSection');
    return storedSection || 'allCategories';
  });
  const [productsOfChosenCategory, setProductsOfChosenCategory] = useState<
    Product[]
  >([]);

  const handleSectionChange = (event: any) => {
    const newValue = event.target.value;
    setSelectedSection(newValue);
    filterProducts(newValue);
  };

  function filterProducts(selectedSection: string) {
    if (selectedSection === 'allCategories') {
      setProductsOfChosenCategory(products);
    } else {
      const filtered = products.filter(product =>
        product.category.includes(selectedSection)
      );
      setProductsOfChosenCategory(filtered);
    }
  }

  useEffect(() => {
    filterProducts(selectedSection);
    localStorage.setItem('selectedSection', selectedSection);
    getOrderForUser();
  }, [products, selectedSection]);

  // Gridstyle on the main page
  return (
    <Box sx={homeContainerSx}>
      {user?.username ? (
        <Typography
          sx={h3StyleSx}
          style={{ fontWeight: 'bold', marginBottom: '1rem' }}
        >
          Welcome {user?.username}!
        </Typography>
      ) : (
        <></>
      )}
      <Box sx={logoStyleSx}>
        <Skeleton
          variant='rounded'
          animation='wave'
          sx={loading || error ? skeletonSx : { display: 'none' }}
        />
        <CardMedia
          sx={loading || error ? { display: 'none' } : {}}
          component='img'
          image={'../images/Logo.png'}
          alt={"Gent's Hat logotype"}
          onLoad={handleLoad}
          onError={handleError}
        />
      </Box>
      <Box sx={productContainerSx}>
        <Box sx={categoryContainerSx}>
          {selectedSection === 'Orders' ? (
            <Typography sx={h3StyleSx} variant='h3' gutterBottom>
              Your orders
            </Typography>
          ) : (
            <Typography sx={h3StyleSx} variant='h3' gutterBottom>
              Our Products
            </Typography>
          )}
          <Box sx={dropdownContainerSx}>
            <Select
              value={selectedSection}
              onChange={handleSectionChange}
              variant='outlined'
            >
              <MenuItem value='allCategories'>All products</MenuItem>
              <MenuItem value='Hats'>Hats</MenuItem>
              <MenuItem value='Coats'>Coats</MenuItem>
              {user?.username ? (
                <MenuItem value='Orders'>My Orders</MenuItem>
              ) : null}
            </Select>
          </Box>
        </Box>
        <Grid sx={cardListSx} container rowSpacing={5}>
          {selectedSection === 'allCategories'
            ? products.map(product => (
                <Grid
                  key={product._id}
                  sx={cardListSx}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={3}
                >
                  <ProductCard key={product._id} product={product} />
                </Grid>
              ))
            : productsOfChosenCategory.map(product => (
                <Grid
                  key={product._id}
                  sx={cardListSx}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={3}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
        </Grid>
        {user?.username && orders.length > 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {selectedSection === 'Orders' ? (
              orders.map(order => (
                <>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                    key={order._id}
                  >
                    <Typography
                      sx={{ marginTop: '1rem', width: '100%' }}
                      variant='body2'
                    >
                      {order._id}
                    </Typography>{' '}
                    <br />
                    <Typography sx={{ marginTop: '1rem' }} variant='body2'>
                      Delivery status:
                      {order.Sent ? (
                        <span> Sent ✔️</span>
                      ) : (
                        <span> Pending ❌</span>
                      )}
                    </Typography>
                  </Box>
                </>
              ))
            ) : (
              <></>
            )}
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
}

/* ----------------------
       CSS STYLING
---------------------- */

const homeContainerSx: SxProps<Theme> = theme => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const categoryContainerSx: SxProps<Theme> = theme => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: '2rem',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'Column',
    FontSize: '10px',
  },
});

const productContainerSx: SxProps<Theme> = theme => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  maxWidth: '1140px',
  paddingLeft: '2rem',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '880px',
    paddingLeft: '2.2rem',
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '610px',
    paddingLeft: '2.6rem',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '242px',
    paddingLeft: '0rem',
  },
});

const cardListSx: SxProps<Theme> = theme => ({
  display: 'flex',
});

const logoStyleSx: SxProps<Theme> = theme => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '4rem',
  px: 3,
  maxWidth: '40rem',
  [theme.breakpoints.down('md')]: {
    maxWidth: '30rem',
    minWidth: '20rem',
  },
  [theme.breakpoints.down('sm')]: {
    maxWidth: '20rem',
    minWidth: '20rem',
  },
});

const h3StyleSx: SxProps<Theme> = theme => ({
  fontSize: '1.6rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.5rem',
    display: 'flex',
  },
});

const skeletonSx: SxProps<Theme> = theme => ({
  width: '40rem',
  height: '20rem',
  mb: 10,
  my: 5,
  [theme.breakpoints.down('md')]: {
    width: '30rem',
    height: '14rem',
  },
  [theme.breakpoints.down('sm')]: {
    width: '17rem',
    height: '9rem',
  },
});

const dropdownContainerSx: SxProps<Theme> = {};

export default Home;
