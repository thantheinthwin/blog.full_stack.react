import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import { Alert, Box, Divider, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField, Typography } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { BlackButton } from '../components';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import { register } from '../api/auth';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: ''
  })

  const handleChange = (e) => {
    const newdata = { ...userData }
    newdata[e.target.id] = e.target.value
    setUserData(newdata)
  }

  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  //validate password
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const [validPassword, setValidPassword] = useState(false);
  const [matchPassword, setMatchPassword] = useState(false);

  useEffect(() => {
    const result = PWD_REGEX.test(userData.password);
    setValidPassword(result);
    const match = userData.password === userData.confirmpassword;
    setMatchPassword(match);
  }, [userData])

  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    register(userData)
    .then((res) => {
      handleOpenSnackBar();
      setMessage(res);
    })
    .catch((e)=>{
      setError(true);
      handleOpenSnackBar();
      setMessage(e);
    })
  }

  // Message
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  
  const handleOpenSnackBar = () => {
    setSnackBarOpen(true);
  }

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    if ( error == false ){
      navigate("/", {replace: true});
    }

    setSnackBarOpen(false);
    setError(false);
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
            width: "25vw",
          }}
        >
          <Typography
            variant="h5"
            textAlign={"center"}
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Sign Up
          </Typography>
          <TextField
            label="Username"
            size="small"
            id="username"
            value={userData.username}
            onChange={(e) => handleChange(e)}
            required
          ></TextField>
          <TextField
            label="Email"
            size="small"
            id="email"
            value={userData.email}
            onChange={(e) => handleChange(e)}
            required
          ></TextField>
          <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              value={userData.password}
              onChange={(e) => handleChange(e)}
              required
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
            <AnimatePresence>
              {pwdFocus && !validPassword && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                  }}
                  className="p-3 mt-1 text-sm font-light border border-gray-300 rounded-md"
                  id="pwdnote"
                >
                  <p className="flex items-center gap-1">
                    <i>
                      <PrivacyTipOutlinedIcon />
                    </i>
                    8 to 24 characters.
                  </p>
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:
                  <span> !</span> <span>@</span> <span>#</span> <span>$</span>
                </motion.div>
              )}
            </AnimatePresence>
          </FormControl>
          <FormControl variant="outlined" size="small">
            <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirmpassword"
              type={showConfirmPassword ? "text" : "password"}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              onChange={(e) => handleChange(e)}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
            <AnimatePresence>
              {matchFocus && !matchPassword && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="p-3 mt-1 text-sm font-light border border-gray-300 rounded-md"
                  id="matchnote"
                >
                  Must match the first input format field
                </motion.div>
              )}
            </AnimatePresence>
          </FormControl>
          <Divider sx={{ my: 2 }} />

          {
            error 
            ? 
            <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleCloseSnackBar}>
              <Alert onClose={handleCloseSnackBar} severity="error" sx={{ width: '100%' }}>
                {message}
              </Alert>
            </Snackbar>
            :
            <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleCloseSnackBar}>
              <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
                {message}
              </Alert>
            </Snackbar>
          }

          <BlackButton label={"Sign Up"} onClick={()=>handleSubmit(userData)}/>
          <Typography
            variant="subtitle2"
            textAlign={"center"}
            className="transition-all duration-200 ease-in-out cursor-pointer hover:underline text-zinc-500 hover:text-zinc-700"
            onClick={() => navigate("/", { replace: true })}
          >
            Already have an account?
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Register