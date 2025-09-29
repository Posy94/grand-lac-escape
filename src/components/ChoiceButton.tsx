// src/components/ChoiceButton.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
  consequences?: {
    flags?: Record<string, boolean>;
    stats?: Record<string, number>;
  };
  requirements?: {
    character?: string;
    characters?: string[];
    flags?: Record<string, boolean>;
  };
}

interface ChoiceButtonProps {
  choice: Choice;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

export const ChoiceButton: React.FC<ChoiceButtonProps> = ({
  choice,
  onClick,
  className = '',
  disabled = false
}) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 
        bg-gradient-to-r from-amber-700 to-amber-600
        hover:from-amber-600 hover:to-amber-500
        disabled:from-gray-600 disabled:to-gray-500
        text-white font-medium rounded-lg
        border border-amber-500/50
        transition-all duration-200
        ${className}
      `}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {choice.text}
    </motion.button>
  );
};