import React from 'react';
import './Logo.css';

const Logo = ({ size = 50, className = '', ...rest }) => {
  return (
    <div
      className={`custom-logo ${className}`}
      style={{ height: size, ...rest.style }}
      {...rest}
    >
      <img src="/favicon.png" alt="Logo" className="custom-logo-image" />
    </div>
  );
};

export default Logo;
