import React, { useState } from "react";
import axios from "../api/apiConfig";
import { Link } from "react-router-dom";
import Notification from "./Notification";
import { Container, Box, Typography, Button, TextField } from "@mui/material";
const Register = ({ setAuth }) => {
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, name, password } = inputs;
    axios
      .post("/auth/register", {
        name,
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

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
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
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 5 }}
          >
            <TextField
              autoComplete="given-name"
              name="name"
              required
              fullWidth
              id="name"
              label="Name"
              onChange={handleChange}
              autoFocus
            />
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
            <Link to="/login">Login</Link>
          </Box>
          <Notification error={error} setError={setError} />
        </Box>
      </Container>
    </>
  );
};

export default Register;
