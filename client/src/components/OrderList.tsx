import { Grid, Typography } from '@mui/material';

function OrderList() {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant='h4'>Orders</Typography>
        {/* o här lägger vi till logiken för ordrarna när vi renderar ut de**/}
      </Grid>
    </>
  );
}

export default OrderList;
