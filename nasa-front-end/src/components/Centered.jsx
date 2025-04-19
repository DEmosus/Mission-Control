import React from 'react';
import { Box } from '@mui/material';

const Centered = ({ children, className = '', ...rest }) => {
  return (
    <Box
      sx={{
        margin: '0 auto',
        maxWidth: 800,
        px: { xs: 1.5, sm: 2 },
      }}
      className={className}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Centered;
