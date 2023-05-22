import { Paper, Typography } from '@mui/material';
import { Box, SxProps, Theme } from '@mui/system';

interface Props {
  totalPrice: number;
}

function CheckoutTotalPrice({ totalPrice }: Props) {
  return (
    <Box sx={totalPriceBoxStyleSx}>
      <Paper elevation={3} sx={{ borderRadius: '0.8rem' }}>
        <Typography
          data-cy='total-price'
          variant='body2'
          color='common.black'
          sx={totalPriceTextStyleSx}
        >
          Total: ${totalPrice}
        </Typography>
      </Paper>
    </Box>
  );
}

/* ----------------------
       CSS STYLING
---------------------- */

const totalPriceTextStyleSx: SxProps<Theme> = theme => ({
  fontWeight: '800',
  background: 'white',
  p: 2,
  fontSize: '1.1rem',
  borderRadius: '0.8rem',
  [theme.breakpoints.up('md')]: { px: 4, fontSize: '1.4rem' },
});
const totalPriceBoxStyleSx: SxProps<Theme> = theme => ({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  mt: 2,
  // [theme.breakpoints.up('md')]: {},
});

export default CheckoutTotalPrice;
