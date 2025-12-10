import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  glow = false,
  ...props 
}) => {
  const baseStyles = "px-6 py-3 rounded-sm font-bold uppercase tracking-wider transition-all duration-300 clip-path-polygon";
  
  const variants = {
    primary: "bg-cyan-600 hover:bg-cyan-500 text-white border-l-4 border-cyan-300",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white border-l-4 border-slate-500",
    outline: "bg-transparent border border-cyan-500/50 text-cyan-400 hover:bg-cyan-950/30 hover:text-cyan-200"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={clsx(
        baseStyles,
        variants[variant],
        glow && "box-glow text-glow",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
