import React, { useState } from "react"
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material"
import { NavLink } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"
import Sidebar from "./Sidebar"
const { file_storage } = require("../databases/config.json")

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{
        background: "linear-gradient(95.53deg, rgb(0, 56, 65) 30%, rgb(0, 47, 85) 86%)"
      }}>
        <IconButton
          onClick={handleSidebarOpen}
          sx={{ position: "absolute" }}
        >
          <MenuRoundedIcon fontSize="large" sx={{ fill: "black" }} edge="start" />
        </IconButton>
        <div style={{ flexGrow: 1 }}><NavLink to="/" width="auto"><img height="50px" src={file_storage + "logo.svg"} /></NavLink></div>
      </Toolbar>
      <Drawer open={isSidebarOpen} onClose={handleSidebarClose}>
        <Box onClick={handleSidebarClose} onKeyDown={handleSidebarClose}>
          <Sidebar />
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
