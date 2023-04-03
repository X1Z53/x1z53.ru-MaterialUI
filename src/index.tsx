import { Box, Container, createTheme, ThemeProvider } from "@mui/material"
import { green, red } from "@mui/material/colors"
import { createRoot } from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"

import { Footer, Header, Routing } from "./components"

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#e0e0e0" },
    success: { main: green[900] },
    error: { main: red[900] }
  }
})

createRoot(document.getElementById("root") as HTMLElement).render(
  <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <ThemeProvider theme={theme}>
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
