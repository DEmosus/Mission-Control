import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Centered from './Centered';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        mt: 'auto',
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }}
    >
      <Centered>
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: 12, sm: 14 },
            color: theme.palette.text.secondary || '#a1ecfb',
          }}
        >
          This is not an official site and is not affiliated with NASA or SpaceX in any way. For educational purposes only.
        </Typography>
      </Centered>
    </Box>
  );
};

export default Footer;
