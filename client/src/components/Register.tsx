import { Box, Button, TextField } from "@mui/material";
import ManInHat from '../icons/manInHat.png';

function RegisterPage() {
    return (
        <>
        <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 16px",
        alignItems: "center",
        height: "75vh"
    }}
    >
        <img src={ManInHat}/>
        <Box sx={{ width: "100%", maxWidth: "400px" }}>
        <form>
          <TextField
            id="username"
            label="Username"
            type="text"
            fullWidth
            required
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            fullWidth
          >
            Register account
          </Button>
        </form>
      </Box>
    </Box>
        </>
    )
};

export default RegisterPage;