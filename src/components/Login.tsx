import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { Button, TextField, Card, CardContent, Typography, Box, Snackbar, Alert, CircularProgress } from '@mui/material';
import { loginUser } from '../services/authService'; 

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSnackbarError, setOpenSnackbarError] = useState(false);
  const [openSnackbarSuccess, setOpenSnackbarSuccess] = useState(false);

  const sendDataLogin = async () => {
    setLoading(true); 
    try {

      const response = await loginUser(username, password);

      if (response.success) {
        dispatch(login(username));
        setError('');
        setSuccessMessage(response.message);
        setOpenSnackbarSuccess(true);
        setOpenSnackbarError(false);
      } else {
        setError(response.message);
        setOpenSnackbarError(true);
        setOpenSnackbarSuccess(false);
      }
    } catch (error) {
      setError('An unexpected error occurred');
      setOpenSnackbarError(true);
      setOpenSnackbarSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const closeSnackbarError = () => {
    setOpenSnackbarError(false);  
  };

  const closeSnackbarSuccess = () => {
    setOpenSnackbarSuccess(false);  
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f6f8',
      }}
    >
      <Card sx={{ width: '400px', padding: '20px' }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            sx={{ marginBottom: '16px' }}
          />
          
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px 0',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={sendDataLogin}
              fullWidth
              sx={{ marginTop: '16px' }}
            >
              Login
            </Button>
          )}
        </CardContent>
      </Card>
    
      <Snackbar
        open={openSnackbarSuccess}
        autoHideDuration={6000}
        onClose={closeSnackbarSuccess}
      >
        <Alert onClose={closeSnackbarSuccess} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openSnackbarError}
        autoHideDuration={6000}
        onClose={closeSnackbarError}
      >
        <Alert onClose={closeSnackbarError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
