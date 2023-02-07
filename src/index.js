import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Container, CssBaseline } from "@mui/material";

// Page Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Main from "./pages/Main";
import Collection from "./pages/Collection";
import TrumBlacklist from "./pages/TrumBlacklist";
import TrumAccountForm from "./pages/TrumAccountForm";
import TrumAdmins from "./pages/TrumAdmins";
import ImportSubstitution from "./pages/ImportSubstitution";

// Plug
import NotNow from "./components/NotNow";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    success: { main: "#070" },
    error: { main: "#700" },
    text: { primary: "#ccc" }
  }
});

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Header />
      <Container component="main">
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/*" element={<NotNow />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/trum_blacklist" element={<TrumBlacklist />} />
            <Route path="/trum_account_form" element={<TrumAccountForm />} />
            <Route path="/trum_admins" element={<TrumAdmins />} />
            <Route path="/import_substitution" element={<ImportSubstitution />} />
          </Routes>
        </Router>
      </Container>
      <Footer />
    </Box>
  </ThemeProvider>
);
