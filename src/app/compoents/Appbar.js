import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { selectTotalFollowers } from "../Redux/Userslice";
import { useSelector } from "react-redux";

export default function ButtonAppBar() {
  const totalFollowers = useSelector(selectTotalFollowers);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <p
            style={{
              backgroundColor: "#FFF",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
            }}
          >
            <p style={{ color: "#000", textAlign: "center" }}>
              {totalFollowers}
            </p>
          </p>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
