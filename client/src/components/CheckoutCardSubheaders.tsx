import { Typography } from '@mui/material'
import { Box } from '@mui/system'

function CartCardSubheaders() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 2 }}>
      <Typography variant='h3' color='secondary.dark' sx={{ fontSize: '1.4rem' }}>
        Product
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Typography variant='h3' color='secondary.dark' sx={{ mr: 22.5, fontSize: '1.4rem' }}>
          Quantity
        </Typography>
        <Typography variant='h3' color='secondary.dark' sx={{ fontSize: '1.4rem' }}>
          Delete
        </Typography>
      </Box>
    </Box>
  )
}

export default CartCardSubheaders
