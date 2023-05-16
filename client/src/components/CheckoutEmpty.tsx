import { Box, SxProps, Theme, Typography } from '@mui/material'
// Shows empty cart
function CheckoutEmpty() {
  return (
    <Box
      sx={{
        background: 'gray',
        clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
      }}
    >
      <Typography sx={EmptyCheckoutStyleSx} variant='h3'>
        Your cart is empty
      </Typography>
    </Box>
  )
}

/* ----------------------
       CSS STYLING
---------------------- */

const EmptyCheckoutStyleSx: SxProps<Theme> = theme => ({
  textAlign: 'center',
  py: '12rem',
  fontSize: '4rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
    py: '8rem',
  },
})

export default CheckoutEmpty
