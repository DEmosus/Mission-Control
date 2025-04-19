import React from 'react';
import './Highlight.css';

const Highlight = ({ children, className = '', ...rest }) => {
  return (
    <span className={`custom-highlight ${className}`} {...rest}>
      {children}
    </span>
  );
};

export default Highlight;
