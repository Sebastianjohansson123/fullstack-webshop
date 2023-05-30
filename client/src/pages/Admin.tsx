import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import AdminCardProduct from '../components/AdminCardProduct';
import CoatList from '../components/CoatList';
import HatList from '../components/HatList';
import OrderList from '../components/OrderList';
import UserList from '../components/UserList';
import { useProducts } from '../contexts/ProductsContext';
import { useUserContext } from '../contexts/UserContext';

function Admin() {
  const [selectedSection, setSelectedSection] = useState('categories');
  const { products } = useProducts();
  const { user } = useUserContext();
  const [choosenCategory, setChoosenCategory] = useState<string>('');

  // const { choosenCategory, categories} = useCategory();

  const handleSectionChange = (event: any) => {
    setSelectedSection(event.target.value as string);
    setChoosenCategory(event.target.value as string);
    console.log("chooosen category", choosenCategory)
  };

  return (
    <>
      <Outlet />
      <Box sx={adminPageContainerSx}>
        <Box sx={productContainerSx}>
          <Box sx={headerSx}>
            <Typography variant={'h3'}>Admin</Typography>
            <Box sx={dropdownContainerSx}>
              <Select
                value={selectedSection}
                onChange={handleSectionChange}
                variant='outlined'
              >
                <MenuItem value='allCategories'>All categories</MenuItem>
                <MenuItem value='orders'>Orders</MenuItem>
                <MenuItem value='users'>Users</MenuItem>
                <MenuItem value='Hats'>Hats</MenuItem>
                <MenuItem value='Coats'>Coats</MenuItem>
              </Select>
            </Box>
          </Box>
          <Box sx={addProductContainerSx}>
            {selectedSection === 'allCategories' && (
              <Link to='/admin/product/new-product'>
                <Button
                  data-cy='admin-add-product'
                  sx={addProductBtnSx}
                  variant='contained'
                >
                  <Typography variant={'body2'}>New Product</Typography>
                </Button>
              </Link>
            )}
          </Box>
          <Grid sx={AdminCardListSx} container rowSpacing={5}>
            {selectedSection === 'allCategories' &&
              products.map(dataProduct => (
                <Grid
                  key={dataProduct._id}
                  sx={AdminCardListSx}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  xl={3}
                >
                  <AdminCardProduct dataProduct={dataProduct} />
                </Grid>
              ))}
            {selectedSection === 'orders' && <OrderList />}
            {selectedSection === 'users' && <UserList />}
            {/* {selectedSection === 'Hats' && <HatList />} */}
            {/* {selectedSection === 'Coats' && <CoatList />} */}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

/* ----------------------
       CSS STYLING
---------------------- */

const headerSx: SxProps<Theme> = theme => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: '2rem',
  pr: '2.3rem',
  [theme.breakpoints.down('lg')]: {
    pr: '2.6rem',
  },
  [theme.breakpoints.down('md')]: {
    pr: '2.75rem',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: '9.5rem',
    width: '100%',
    pr: '0rem',
  },
});

const addProductBtnSx: SxProps<Theme> = theme => ({
  height: '40px',
  '&:hover': {
    color: 'white',
  },
});
const AdminCardListSx: SxProps<Theme> = theme => ({
  display: 'flex',
});

const adminPageContainerSx: SxProps<Theme> = theme => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
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

const dropdownContainerSx: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1rem',
};
const userControllsSx: SxProps<Theme> = theme => ({
  display: 'flex',
  flexDirection: 'row',
});

const addProductContainerSx: SxProps<Theme> = theme => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: '20px',
  marginRight: '2.5rem',
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
    marginRight: '3.2rem',
  },
});

export default Admin;
