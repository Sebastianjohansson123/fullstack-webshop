import { Box, Button, Grid, SxProps, Theme, Typography } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import AdminCardProduct from '../components/AdminCardProduct';
import { useProducts } from '../contexts/ProductsContext';
import { useUserContext } from '../contexts/UserContext';

function Admin() {
  useLocation();
  const { databaseProducts } = useProducts();
  const location = useLocation(); //    DESSA RADERNA!!!
  const { user } = useUserContext();

  // I Login komponenten
  // location.state?.redirectTo || user!.isAdmin ? '/admin' : '/user';

  return (
    <>
      <Outlet />
      <Box sx={adminPageContainerSx}>
        <Box sx={productContainerSx}>
          <Box sx={headerSx}>
            <Typography variant={'h3'}>Admin</Typography>
            <Link to='/admin/product/new-product'>
              <Button
                data-cy='admin-add-product'
                sx={addProductBtnSx}
                variant='contained'
                >
                <Typography variant={'body2'}>Add New Product</Typography>
              </Button>
            </Link>
          </Box>
          <Box sx={userControllsSx}>

               <Button>Products</Button>
               <Button>Users</Button>
               <Button>Orders</Button>
          </Box>
          <Grid sx={AdminCardListSx} container rowSpacing={5}>
            {databaseProducts.map(dataProduct => (
              <Grid
                key={dataProduct.id}
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
    height: '8rem',
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

const userControllsSx: SxProps<Theme> = theme => ({
  display: 'flex',
  flexDirection: 'row',
})

export default Admin;
