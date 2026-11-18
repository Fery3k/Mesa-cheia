import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  // Smooth springs for magnetic cursor position
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    setIsPointerDevice(hasPointer);

    if (!hasPointer) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if target has custom cursor attributes
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const text = target.getAttribute('data-cursor');
        setCursorText(text);
        setCursorVariant('expanded');
      } else if (e.target.closest('button, a, input, select, [role="button"]')) {
        setCursorText('');
        setCursorVariant('hover');
      } else {
        setCursorText('');
        setCursorVariant('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isPointerDevice || !isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center font-display font-bold text-[11px] uppercase tracking-wider text-white shadow-lg"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: cursorVariant === 'expanded' ? 76 : cursorVariant === 'hover' ? 36 : 14,
        height: cursorVariant === 'expanded' ? 76 : cursorVariant === 'hover' ? 36 : 14,
        backgroundColor:
          cursorVariant === 'expanded'
            ? 'rgba(6, 78, 59, 0.92)'
            : cursorVariant === 'hover'
            ? 'rgba(5, 150, 105, 0.45)'
            : 'rgba(5, 150, 105, 0.85)',
        backdropFilter: cursorVariant === 'expanded' ? 'blur(8px)' : 'none',
        border: cursorVariant === 'hover' ? '1.5px solid rgba(5, 150, 105, 0.9)' : 'none',
        borderRadius: '9999px',
        scale: 1,
      }}
      transition={{ type: 'spring', damping: 22, stiffness: 380 }}
    >
      {cursorVariant === 'expanded' && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          className="text-center leading-tight px-1 drop-shadow"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
}
