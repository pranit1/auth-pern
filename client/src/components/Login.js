import React, { useState } from "react";
import { Container, Box, Typography, Button, TextField } from "@mui/material";
import axios from "../api/apiConfig";
import { Link } from "react-router-dom";
import Notification from "./Notification";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    const { email, password } = inputs;
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
          <Notification error={error} setError={setError} />
        </Box>
      </Container>
    </>
  );
};

export default Login;
