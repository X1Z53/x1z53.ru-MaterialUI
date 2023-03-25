import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { AppBar, Box, Drawer, IconButton, Toolbar } from "@mui/material"
import { MenuRounded } from "@mui/icons-material"

import { Sidebar } from "./"
import { getImage } from "../hooks"


export default function Header(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  function handleSidebarOpen(): void { setIsSidebarOpen(true) }
  function handleSidebarClose(): void { setIsSidebarOpen(false) }

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{ background: "linear-gradient(95.53deg, rgb(0, 56, 65) 30%, rgb(0, 47, 85) 86%)" }}
      >
        <IconButton onClick={handleSidebarOpen} sx={{ position: "absolute" }}>
          <MenuRounded fontSize="large" sx={{ fill: "black" }} />
        </IconButton>
        <div style={{ flexGrow: 1 }}>
          <NavLink to="/" style={{ width: "auto" }}>
            <img height="50px" src={getImage("x1z53")} />
          </NavLink>
        </div>
      </Toolbar>
      <Drawer open={isSidebarOpen} onClose={handleSidebarClose}>
        <Box onClick={handleSidebarClose} onKeyDown={handleSidebarClose}>
          <Sidebar />
        </Box>
      </Drawer>
    </AppBar>
  )
}
