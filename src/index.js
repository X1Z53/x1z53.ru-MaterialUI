import React from "react"
import { createRoot } from 'react-dom/client'
import { useLocation, BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Box, Container } from "@mui/material"
import { green, red } from "@mui/material/colors"
import { ThemeProvider, createTheme } from "@mui/material/styles"

import Header from "./components/Header"
import Footer from "./components/Footer"

import Main from "./pages/Main"
import Collection from "./pages/Collection"
import TrumBlacklist from "./pages/TrumBlacklist"
import TrumAccountForm from "./pages/TrumAccountForm"
import TrumAdmins from "./pages/TrumAdmins"
import ImportSubstitution from "./pages/ImportSubstitution"
import SnakeGame from "./pages/SnakeGame"

import Plug from "./components/Plug"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    success: { main: green[900] },
    error: { main: red[900] },
  }
})

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ThemeProvider theme={darkTheme}>
        <Router>
          <Header />
          <Container component="main" sx={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/*" element={<Plug />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/trum_blacklist" element={<TrumBlacklist />} />
              <Route path="/trum_account_form" element={<TrumAccountForm />} />
              <Route path="/trum_admins" element={<TrumAdmins />} />
              <Route path="/import_substitution" element={<ImportSubstitution />} />
              <Route path="/snake_game" element={<SnakeGame />} />
            </Routes>
          </Container>
          <Footer />
        </Router>
      </ThemeProvider>
    </Box>
  )
}

createRoot(document.getElementById('root')).render(<App />)
