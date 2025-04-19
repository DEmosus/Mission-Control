import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import UpdateIcon from '@mui/icons-material/Update';
import HistoryIcon from '@mui/icons-material/History';

import Clickable from './Clickable';
import Highlight from './Highlight';
import AnimatedFrame from './AnimatedFrame';

const Header = ({ onNav }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Left side: Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src="/favicon.png" alt="NASA Logo" style={{ height: 50, marginRight: 10 }} />
          <AnimatedFrame corners={20} style={{ display: 'inline-block', padding: '0.5rem 1rem' }}>
            <Highlight>

              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                NASA Mission Control
              </Typography>
            </Highlight>
          </AnimatedFrame>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, sm: 0 } }}>
          <Clickable onClick={onNav}>
            <Button
              component={RouterLink}
              to="/launch"
              color="inherit"
              startIcon={<CheckCircleOutlineIcon />}
            >
              Launch
            </Button>
          </Clickable>
          <Clickable onClick={onNav}>
            <Button
              component={RouterLink}
              to="/upcoming"
              color="inherit"
              startIcon={<UpdateIcon />}
            >
              Upcoming
            </Button>
          </Clickable>
          <Clickable onClick={onNav}>
            <Button
              component={RouterLink}
              to="/history"
              color="inherit"
              startIcon={<HistoryIcon />}
            >
              History
            </Button>
          </Clickable>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
