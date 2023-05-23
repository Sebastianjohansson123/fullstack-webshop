import { Box, Button, Container, TextField } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import ManInHat from '../icons/manInHat.png'

function LoginPage() {
    return(
        <Container style={{ display: 'flex', justifyContent: 'center'}}>
            <Box
                display={"flex"}
                alignItems={'center'}
                flexDirection={'column'}
                gap={'10px'}
                padding={'9rem 0'}
                sx={{ width: "100%", maxWidth: "400px" }}
                >
                    <img src={ManInHat}/>
            <span style={{ fontSize: '30px'}}>Log in</span>
            <TextField fullWidth id="outlined-basic" label="Email" type="email" variant="outlined" />
            <TextField fullWidth id="outlined-basic" label="Password" type="password" variant="outlined" />
            <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    sx={{ boxShadow: "none", marginTop: "1rem" }}
                >
                    Log in
                </Button>
                <NavLink to="/register">Don't have an account? Sign up</NavLink>
            </Box>
        </Container>
    )
}

export default LoginPage;