import { Box, Typography, Container, Button } from "@mui/material";
import { useState } from "react";
import DeleteProfile from "./DeleteProfile";
const Profile = ({ name, email, setAuth }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ margin: "22px 22px" }}>
          <Typography variant="h5"> Name: {name}</Typography>
          <Typography variant="h5"> Email: {email}</Typography>
        </Box>
        <Button onClick={handleOpen} variant="outlined" color="error">
          Delete Account
        </Button>
        <DeleteProfile open={open} setOpen={setOpen} setAuth={setAuth} />
      </Container>
    </>
  );
};

export default Profile;
