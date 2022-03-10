import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
} from "@mui/material";
import axios from "../api/apiConfig";
const DeleteProfile = ({ open, setOpen, setAuth }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    axios
      .delete("/dashboard/user", {
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
    </>
  );
};
export default DeleteProfile;
