import React from 'react';
import useSounds from '../hooks/useSounds';

const AnimatedFrame = ({ children, show = true, corners = 6, style = {}, className = '' }) => {
  const { playSound } = useSounds();

  const handleClick = () => playSound('click');
  const handleHover = () => playSound('typing');

  return (
    <div
      className={className}
      style={{ position: 'relative', ...style }}
      onClick={handleClick}
      onMouseEnter={handleHover}
    >
      {/* Glow Pulse Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: `${corners * 2}px`,
          background: 'radial-gradient(circle, rgba(0,224,255,0.1), transparent 70%)',
          animation: 'pulseGlow 3s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Neon Frame */}
      <div
        style={{
          position: 'relative',
          border: '2px solid #00e0ff',
          borderRadius: `${corners * 2}px`,
          boxShadow: `
            0 0 5px rgba(0,224,255,0.5),
            0 0 15px rgba(0,224,255,0.3),
            inset 0 0 10px rgba(0,224,255,0.2)
          `,
          padding: '20px',
          backdropFilter: 'blur(2px)',
          opacity: show ? 1 : 0,
          transform: show ? 'scale(1)' : 'scale(0.97)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          zIndex: 1,
          cursor: 'pointer',
        }}
      >
        {children}
      </div>

      {/* Scan Lines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: `${corners * 2}px`,
          pointerEvents: 'none',
          zIndex: 2,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            height: '2px',
            width: '200%',
            background: 'linear-gradient(90deg, transparent, #00e0ff, transparent)',
            animation: 'scanLineX 2s linear infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '-100%',
            width: '2px',
            height: '200%',
            background: 'linear-gradient(180deg, transparent, #00e0ff, transparent)',
            animation: 'scanLineY 3s linear infinite',
          }}
        />
      </div>

      {/* Keyframes */}
      <style>
        {`
          @keyframes scanLineX {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          @keyframes scanLineY {
            0% { top: -100%; }
            100% { top: 100%; }
          }
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default AnimatedFrame;
