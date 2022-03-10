import React, { useEffect, useState } from "react";
import { Button, Container, Box } from "@mui/material";
import Header from "./Header";
import axios from "../api/apiConfig";
import Welcome from "./Welcome";
import Profile from "./Profile";
const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    axios
      .get("/dashboard", {
        headers: { token: localStorage.token },
      })
      .then(({ data }) => {
        setName(data.user_name);
        setEmail(data.user_email);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };
  const handleFlag = () => {
    setFlag((currentValue) => !currentValue);
  };
  return (
    <>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "right",
            bgcolor: "#f3f9ff",
            height: "100vh",
          }}
        >
          <Header>
            <Button onClick={handleFlag} variant="filled">
              Home
            </Button>

            <Button onClick={handleFlag} variant="filled">
              Profile
            </Button>
            <Button onClick={handleLogout} variant="filled">
              Logout
            </Button>
          </Header>
          {flag ? (
            <Profile name={name} email={email} setAuth={setAuth} />
          ) : (
            <Welcome name={name} />
          )}
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
