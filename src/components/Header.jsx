import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { AppBar, Box, Drawer, IconButton, Toolbar } from "@mui/material"
import { MenuRounded } from "@mui/icons-material"

import Sidebar from "./Sidebar"

const { image_storage } = require("../databases/config.json")

export default () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSidebarOpen = () => { setIsSidebarOpen(true) }
  const handleSidebarClose = () => { setIsSidebarOpen(false) }

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ background: "linear-gradient(95.53deg, rgb(0, 56, 65) 30%, rgb(0, 47, 85) 86%)" }}>
        <IconButton onClick={handleSidebarOpen} sx={{ position: "absolute" }}>
          <MenuRounded fontSize="large" sx={{ fill: "black" }} edge="start" />
        </IconButton>
        <div style={{ flexGrow: 1 }}><NavLink to="/" width="auto"><img height="50px" src={image_storage + "x1z53.svg"} /></NavLink></div>
      </Toolbar>
      <Drawer open={isSidebarOpen} onClose={handleSidebarClose}>
        <Box onClick={handleSidebarClose} onKeyDown={handleSidebarClose}>
          <Sidebar />
        </Box>
      </Drawer>
    </AppBar>
  )
}
