import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = ({ children }) => {
  return (
    <AppBar elevation={0} position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {children}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
