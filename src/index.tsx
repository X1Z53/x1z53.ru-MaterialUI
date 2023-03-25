import React from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { Box, ThemeProvider, createTheme, Container } from "@mui/material"
import { green, red } from "@mui/material/colors"

import { Header, Routing, Footer } from "./components"

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
        <Container component="main" sx={{ padding: "20px" }}>
          <Routing />
        </Container>
        <Footer />
      </Router>
    </ThemeProvider>
  </Box>
)
