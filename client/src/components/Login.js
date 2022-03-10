import React, { useState } from "react";
import {
  Snackbar,
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import axios from "../api/apiConfig";
import { Link } from "react-router-dom";
const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError("");
  };
  const handleSubmit = (e) => {
    const { email, password } = inputs;
    console.log(email, password);
    e.preventDefault();
    axios
      .post("/auth/login", {
        email,
        password,
      })
      .then(({ data }) => {
        localStorage.setItem("token", data.token);
        setAuth(true);
      })
      .catch((err) => {
        const { data } = err.response;
        setError(data);
      });
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 5 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Link to="/register"> Register</Link>
          </Box>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={error.length > 0}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </>
  );
};

export default Login;
