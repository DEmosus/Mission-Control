import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';

import theme from './theme';
import AppLayout from './pages/AppLayout';

import './global.css';
import './App.css';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <div className="space-background" />
        <Router>
          <AppLayout />
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
