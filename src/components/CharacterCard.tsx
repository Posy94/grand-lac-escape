import React from "react";
import { motion } from "framer-motion";
import type { Character } from "../types/game.types";

interface characterCardProps {
    character: Character;
    isSelected?: boolean;
    onClick?: (character : Character) => void;
    disabled?: boolean;
}

export const CharacterCard: React.FC<characterCardProps> = ({
    character,
    isSelected = false,
    onClick,
    disabled = false
}) => {
    return (
        <motion.div
            className={`
                relative overflow-hidden rounded-xl border-2 cursor-pointer transition-all duration-300 bg-white/90 backdrop-blur-sm"
                ${isSelected
                    ? 'border-orange-500 ring-2 ring-orange-500/30 shadow-lg shadow-orange-500/25'
                    : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
                }
                ${disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }
            `}
            onClick={() => !disabled && onClick?.(character)}
            whileHover={!disabled ? { y: -4, scale: 1.02 } : {}}
            whileTap={!disabled ? {scale: 0.98} : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Indicateur de sélection */}
            {isSelected && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
            )}

            <div className="p-6">
                {/* Avatar et nom */}
                <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{character.avatar}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {character.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {character.description}
                    </p>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                            💪 Énergie
                        </span>
                        <span className="text-sm font-bold text-orange-600">
                            {character.stats.energy}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">
                            ⏰ Temps
                        </span>
                        <span className="text-sm font-bold text-blue-600">
                            {character.stats.time}h
                        </span>
                    </div>

                    {/* Barres de progression */}
                    <div className="space-y-2 mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: `${character.stats.energy}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay d'interaction */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent opacity-0"
                animate={{ opacity: isSelected ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
};