import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { Box, ThemeProvider, createTheme } from "@mui/material"
import { green, red } from "@mui/material/colors"
import Header from "./components/Header"
import Routes from "./components/Routes"
import Footer from "./components/Footer"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    success: { main: green[900] },
    error: { main: red[900] }
  }
})
createRoot(document.getElementById("root") as HTMLElement).render(
  <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Header />
        <Routes />
        <Footer />
      </Router>
    </ThemeProvider>
  </Box>
)
