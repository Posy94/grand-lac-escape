import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

export const CharacterSelector: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { characters, activeCharacter, setActiveCharacter } = useGameStore();

    const activeChar = characters[activeCharacter];
    const otherChars = Object.values(characters).filter(c => c.id !== activeCharacter);

    return (
        <div className="relative">
            {/* Portrait actuel */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-lg border-2 border-blue-200 hover:border-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Personnage actuel: ${activeChar.name}. Cliquer pour changer.`}
            >
                <div className="text-3xl" role="img" aria-label={activeChar.name}>
                    {activeChar.avatar}
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800">{activeChar.name}</h3>
                    <p className="text-sm text-gray-600">{activeChar.description}</p>
                </div>
                <div className="ml-auto text-gray-400">
                    {isOpen ? '▲' : '▼'}
                </div>
            </button>

            {/* Dropdown menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-10"
                    >
                        {otherChars.map((char) => (
                            <button
                                key={char.id}
                                onClick={() => {
                                    setActiveCharacter(char.id);
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-3 p-3 hover:bg-blue-50 first:rounded-t-lg last:rounded-b-lg transition-colors focus:outline-none focus:bg-blue-100"
                                arai-label={`Changer vers ${char.name}`}
                            >
                                <div className="text-2xl" role="img" aria-label={char.name}>
                                    {char.avatar}
                                </div>
                                <div className="text-left">
                                    <h4 className="font-medium text-gray-800">{char.name}</h4>
                                    <p className="text-sm text-gray-600">{char.description}</p>
                                </div>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};