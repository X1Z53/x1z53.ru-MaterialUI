import React from "react"
import { AppBar, IconButton, Toolbar, Typography, Drawer, Box } from "@mui/material"
import { useState } from "react"
import { formatString } from "../functions"

// Icons
import MenuRoundedIcon from "@mui/icons-material/MenuRounded"

// Components
import Sidebar from "./Sidebar"

const sections = require("../databases/sections.json")

const urlElement = document.URL.split("/").at(-1)
const pageName = urlElement
  ? formatString(
    urlElement,
    sections[urlElement] ? sections[urlElement]["charsToUpCase"] : null
  ) : "Main Page"

// Sidebar
function drawSidebar(sidebarStatus, changeSidebarStatus) {
  return (
    <Drawer open={sidebarStatus["open"]} onClose={changeSidebarStatus(false)}>
      <Box onClick={changeSidebarStatus(false)} onKeyDown={changeSidebarStatus(false)}>
        <Sidebar />
      </Box>
    </Drawer>
  )
}

export default function Header() {
  const [sidebarStatus, setSidebarStatus] = useState({ open: false })

  const changeSidebarStatus = (isOpen) => (event) => {
    if (event.type !== "keydown") { setSidebarStatus({ open: isOpen }) }
  }

  return (
    <AppBar sx={{ marginBottom: "20px" }} position="sticky">
      <Toolbar>
        <IconButton onClick={changeSidebarStatus(true)} sx={{ position: "absolute" }}>
          <MenuRoundedIcon
            edge="start"
            sx={{ color: "text.primary" }}
          />
        </IconButton>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {pageName}
        </Typography>
      </Toolbar>

      {drawSidebar(sidebarStatus, changeSidebarStatus)}
    </AppBar>
  )
}
