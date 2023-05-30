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
  const { user } = useUserContext();
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

  //TODO : Fix so it sorts out the products by category
  const [selectedSection, setSelectedSection] = useState('allCategories');
  const [productsOfChoosenCategory, setProductsOfChoosenCategory] = useState<
    Product[]
  >([]);

  const handleSectionChange = (event: any) => {
    const newValue = event.target.value;
    setSelectedSection(newValue);
    filterProducts(newValue);
  };

  function filterProducts(selectedSection: string) {
    if (selectedSection === 'allCategories') {
      setProductsOfChoosenCategory(products);
    } else {
      const filtered = products.filter(product =>
        product.category.includes(selectedSection)
      );
      setProductsOfChoosenCategory(filtered);
      console.log('filtered', filtered);
    }
  }

  useEffect(() => {
    filterProducts(selectedSection);
  }, [products]);

  // Gridstyle on the main page
  return (
    <Box sx={homeContainerSx}>
      {user?.username ? (
        <Typography sx={h3StyleSx} style={{ fontSize: '2rem' }}>
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
          <Typography sx={h3StyleSx} variant='h3' gutterBottom>
            Our Products
          </Typography>
          <Box sx={dropdownContainerSx}>
            <Select
              value={selectedSection}
              onChange={handleSectionChange}
              variant='outlined'
            >
              <MenuItem value='allCategories'>All products</MenuItem>
              <MenuItem value='Hats'>Hats</MenuItem>
              <MenuItem value='Coats'>Coats</MenuItem>
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
                  <ProductCard product={product} />
                </Grid>
              ))
            : productsOfChoosenCategory.map(product => (
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
});

const productContainerSx: SxProps<Theme> = theme => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '1140px',
  paddingLeft: '2rem',
  [theme.breakpoints.down('lg')]: {
    width: '880px',
    paddingLeft: '2.2rem',
  },
  [theme.breakpoints.down('md')]: {
    width: '610px',
    paddingLeft: '2.6rem',
  },
  [theme.breakpoints.down('sm')]: {
    width: '242px',
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
  display: 'none',
  
    [theme.breakpoints.up('sm')]: {
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
