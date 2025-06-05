import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Tutorials from "./pages/tutorials/Tutorials";
import Impressum from "./pages/Impressum";
import { GlobalStyles, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./appTheme";
import SPOCKLY from "./components/Spockly";
import Toast from "./components/Toast";
import './components/init.js';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(getCookie('isDarkMode') === 'true');
  const toggleTheme = () => setIsDarkMode((prev) => !prev);
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    document.cookie = `isDarkMode=${isDarkMode}; path=/; max-age=31536000`; //1 year
  }, [isDarkMode]);

  useEffect(() => {
    if (~window.location.href.indexOf('SPOCKLY')) {
      document.getElementById('toast').style.animation = 'slideIn 5s ease-in-out';
      document.getElementById('toast').style.display = 'block';
    }
  }, []);

  return (
    <ThemeProvider theme={ theme }>
      <GlobalStyles
        styles={{
          html: { height: "100%" },
          body: {
            margin: 0,
            padding: 0,
            backgroundColor: theme.palette.background.default,
          },
          "#root": {
            height: "100%",
            width: "100%",
          },
          h1: { textTransform: "none" },
          h2: { textTransform: "none" },
          h3: { textTransform: "none" },
          h4: { textTransform: "none" },
          h5: { textTransform: "none" },
          h6: { textTransform: "none" },
          p: { textTransform: "none" },
          ".blocklyTrash": {
            opacity: "1 !important",
          },
          image: {
            opacity: "1 !important",
          },
        }}
      />
      <Toast />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout isDarkMode={ isDarkMode } toggleTheme={ toggleTheme } />
            }
          >
            <Route index element={ <Home isDarkMode={ isDarkMode } /> } />
            <Route
              path="spockly"
              element={ <SPOCKLY isDarkMode={ isDarkMode } /> }
            />
            <Route path="tutorials" element={ <Tutorials isDarkMode={ isDarkMode } /> } />
            <Route path="impressum" element={ <Impressum /> } />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
