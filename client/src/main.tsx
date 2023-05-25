import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  Route,
  RouteProps,
  RouterProvider,
  useLocation,
  useRoutes,
  createRoutesFromElements,
} from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import Register from './components/Register';
import { CartProvider } from './contexts/CartContext';
import { FormProvider } from './contexts/FormContext';
import { ProductsProvider } from './contexts/ProductsContext';
import { UserProvider, useUserContext } from './contexts/UserContext';
import './index.css';
import Admin from './pages/Admin';
import AdminUpdateDatabase from './pages/AdminUpdateDatabase';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import OrderConfirmation from './pages/OrderConfirmation';
import ProductDescription from './pages/ProductDescription';

declare module '@mui/material/styles' {
  interface ThemeOptions {
    h1?: {
      fontWeight?: 900;
    };
    h3?: {
      fontSize?: string;
      fontFamily?: string;
    };
    body1?: {
      fontFamily?: string;
      fontSize?: string;
    };
    body2?: {
      fontFamily?: string;
      fontSize?: string;
    };
  }
}
// Using primary.dark as a form of hover effect for all the default buttons. This might not be optimal in the long run, but it works fine at the moment.
const theme = createTheme({
  palette: {
    primary: {
      main: '#DAB90C',
      dark: '#217230',
    },
    secondary: {
      main: '#DCDCDC',
      dark: '#505050',
    },
  },
  // --------Another sulution for styling only buttons in the project------
  // components: {
  //   MuiButton: (palette) => ({
  //     styleOverrides: {
  //       root: {
  //         textTransform: 'none',
  //         borderRadius: '0px',
  //         '&:hover': {
  //           backgroundColor: palette.secondary.main,
  //         },
  //       },
  //       text: { }
  //     }
  //   })
  // },
  typography: {
    fontFamily: 'cinzel',
    h1: {
      fontWeight: 900,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },

    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontFamily: 'Lora',
    },
    body2: {
      fontFamily: 'Lora',
    },
    caption: {
      fontFamily: 'Lora',
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home />} />
      <Route path='/:page/:id' element={<ProductDescription />} />
      <Route path='login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='checkout' element={<Checkout />} />
      {/* <PrivateRoute path='/user' element={<UserPage />} /> */}
      <PrivateRoute path='admin' element={<Admin />} adminOnly />
      <PrivateRoute
        path='admin/product/:id'
        element={<AdminUpdateDatabase />}
        adminOnly
      />
      <Route path='confirmation' element={<OrderConfirmation />} />
      <Route path='*' element={<h2>404 not found</h2>} />
    </Route>
  )
);

// function RouteComponents() {
//   const routes = useRoutes([
//    { path: '/', element: <App /> },
//    { path: '/', element: <Home />, index: true },
//    { path: '/:page/:id', element: <ProductDescription /> },
//    { path: 'login', element: <Login /> },
//    { path: 'register', element: <Register /> },
//    { path: 'checkout', element: <Checkout /> },
//    { path: 'admin', element: <PrivateRoute adminOnly><Admin /></PrivateRoute> },
//    { path: 'admin/product/:id', element: <PrivateRoute adminOnly><AdminUpdateDatabase /></PrivateRoute> },
//    { path: 'confirmation', element: <OrderConfirmation /> },
//    { path: '*', element: <h2>404 not found</h2> },
//   ]);
//   return routes
// }

function PrivateRoute(props: RouteProps & { adminOnly?: boolean }) {
  const { user, isLoading } = useUserContext(); //   DESSA RADERNA!!!
  const location = useLocation(); //    DESSA RADERNA!!!

  // I Login komponenten
  // location.state?.redirectTo || user.isAdmin ? "/admin" : "/user"

  if (isLoading) return null;
  if (props.adminOnly && !user?.isAdmin) {
    return <Navigate to='/' state={{ redirectTo: location }} />;
  }
  if (!user) return <Navigate to='/login' state={{ redirectTo: location }} />;
  return <Route {...props} />;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ProductsProvider>
        <UserProvider>
          <FormProvider>
            <CartProvider>
              <SnackbarProvider maxSnack={3}>
                <RouterProvider router={router} />
              </SnackbarProvider>
            </CartProvider>
          </FormProvider>
        </UserProvider>
      </ProductsProvider>
    </ThemeProvider>
  </React.StrictMode>
);
