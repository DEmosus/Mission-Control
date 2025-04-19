import React, { useState } from 'react';
import { ButtonBase } from '@mui/material';

const Clickable = ({ children, onClick, className = '', ...rest }) => {
  const [clickSound] = useState(() => new Audio('/sound/click.mp3'));

  const handleClick = (e) => {
    clickSound.play();
    onClick?.(e);
  };

  return (
    <ButtonBase onClick={handleClick} className={className} {...rest}>
      {children}
    </ButtonBase>
  );
};

export default Clickable;
