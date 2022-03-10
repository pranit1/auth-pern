import { Snackbar, Alert } from "@mui/material";
const Notification = ({ error, setError }) => {
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError("");
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={error.length > 0}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
export default Notification;
