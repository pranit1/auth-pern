import { Typography } from "@mui/material";

const Welcome = ({ name }) => {
  return (
    <Typography sx={{ marginTop: "22px" }} component="h1" variant="h4">
      Welcome {name}
    </Typography>
  );
};
export default Welcome;
