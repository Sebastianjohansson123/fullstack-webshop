import { Box, Typography } from '@mui/material';
import Register from '../components/Register';

export default function SignUpForm() {
  return (
    <Box
      sx={{
        marginTop: '2rem',
      }}
    >
      <Typography
        variant='h4'
        sx={{
          textAlign: 'center',
          marginBottom: '1rem',
        }}
      >
        Skapa konto
      </Typography>
      <Register />
    </Box>
  );
}
