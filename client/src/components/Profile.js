import { Box, Typography, Container, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
const Profile = ({ name, email, setAuth }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleDelete = () => {
    axios
      .delete("http://localhost:5000/dashboard/user", {
        headers: { token: localStorage.token },
      })
      .then(({ data }) => {
        localStorage.removeItem("token");
        setAuth(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
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
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent dividers>
            <Typography variant="h6">
              Are you sure you want to delete the account?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              disableElevation={true}
              variant="contained"
              color="error"
              autoFocus
              onClick={handleDelete}
            >
              {" "}
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
};

export default Profile;
