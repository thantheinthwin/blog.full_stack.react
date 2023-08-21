import React, { useContext, useState } from 'react'
import Container from '@mui/material/Container'
import { Alert, Box, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField, Typography } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { BlackButton } from '../components';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const Login = () => {
  const [{user}, dispatch] = useStateValue();
  
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const newdata = { ...userData }
    newdata[e.target.id] = e.target.value
    setUserData(newdata)
  }

  const handleSubmit = async (e) => {
    try {
      await login(userData)
      .then(res => {
        dispatch({
          type: actionType.SET_USER,
          user: res
        })
      })
      .then(navigate("/home", {replace: true}))
    } catch (error) {
      handleOpenSnackBar();
      setErrorMessage(error);
    }
  }

  const [errorMessage, setErrorMessage] = useState("");
  
  // SnackBar for error message
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  
  const handleOpenSnackBar = () => {
    setSnackBarOpen(true);
  }

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ height: "100vh", display: "flex" }}>
        <Box
          sx={{
            p: 4,
            border: 1,
            margin: "auto",
            borderRadius: 1.5,
            borderColor: "text.secondary",
            display: "grid",
            gap: 1,
          }}
        >
          <Typography
            variant="h5"
            textAlign={"center"}
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Login
          </Typography>
          <TextField
            label="Email"
            size="small"
            id="email"
            value={userData.email}
            onChange={(e) => handleChange(e)}
            required
          ></TextField>
          <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="password"
              value={userData.password}
              onChange={(e)=>handleChange(e)}
              required
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          {/* Error Message */}
          <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleCloseSnackBar}>
            <Alert onClose={handleCloseSnackBar} severity="error" sx={{ width: '100%' }}>
              {errorMessage}
            </Alert>
          </Snackbar>
          
          <Divider sx={{ my: 1 }} />
          <BlackButton label={"Login"} onClick={()=>handleSubmit(userData)}/>
          <Typography
            variant="subtitle2"
            textAlign={"center"}
            className="transition-all duration-200 ease-in-out cursor-pointer hover:underline text-zinc-500 hover:text-zinc-700"
            onClick={() => navigate("/register", { replace: true })}
          >
            Don't have an account?
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Login