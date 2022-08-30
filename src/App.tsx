import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from "./main/theme/darkTheme";
import lightTheme from "./main/theme/lightTheme";
import HomePage from "./pages/HomePage";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppShell from "./components/appshell";

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
