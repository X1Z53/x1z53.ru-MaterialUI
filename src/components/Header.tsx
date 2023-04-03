import { MenuRounded } from "@mui/icons-material"
import { AppBar, Box, Drawer, IconButton, Toolbar } from "@mui/material"
import { NavLink } from "react-router-dom"
import { getImage, useBooleanState } from "../hooks"
import { Sidebar } from "./"


export default function Header() {
  const [isOpen, setOpen, setClose] = useBooleanState(false)

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{ background: "linear-gradient(95.53deg, rgb(0, 56, 65) 30%, rgb(0, 47, 85) 86%)" }}
      >
        <IconButton onClick={setOpen} sx={{ position: "absolute" }}>
          <MenuRounded fontSize="large" sx={{ fill: "black" }} />
        </IconButton>
        <div style={{ flexGrow: 1 }}>
          <NavLink to="/" style={{ width: "auto" }}>
            <img height="50px" src={getImage("x1z53")} />
          </NavLink>
        </div>
      </Toolbar>
      <Drawer open={isOpen} onClose={setClose}>
        <Box onClick={setClose} onKeyDown={setClose}>
          <Sidebar />
        </Box>
      </Drawer>
    </AppBar>
  )
}
