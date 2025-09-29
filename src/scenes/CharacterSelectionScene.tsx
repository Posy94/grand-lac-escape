import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/gameStore';
import { useNavigate } from 'react-router-dom';
import { CharacterCard } from '../components/CharacterCard';

type Character = ReturnType<typeof useGameStore.getState>['getAvailableCharacters'][0];

export const CharacterSelectionScene: React.FC = () => {
  const navigate = useNavigate();
  const { getAvailableCharacters, selectAndStartWithCharacter } = useGameStore();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // 🎯 Utiliser les personnages prédéfinis
  const characters = getAvailableCharacters();

  const handleStartGame = () => {
    if (selectedCharacter) {
      selectAndStartWithCharacter(selectedCharacter);
      navigate('/home');
    }
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        
        {/* 🎯 TITRE PRINCIPAL */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            🏔️ Grand Lac Escape
          </h1>
          <p className="text-xl text-blue-200 mb-8">
            Choisissez votre personnage pour commencer l'aventure
          </p>
        </div>

        {/* 🎯 GRILLE DES PERSONNAGES - AVEC CharacterCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {characters.map(character => (
            <CharacterCard
              key={character.id}
              character={character}
              isSelected={selectedCharacter?.id === character.id}
              onClick={handleCharacterSelect}
              className="transform hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>

        {/* 🎯 BOUTON DE DÉMARRAGE */}
        <div className="text-center">
          <button 
            onClick={handleStartGame} 
            disabled={!selectedCharacter}
            className={`
              px-8 py-4 rounded-xl font-bold text-xl transition-all duration-300 transform
              ${selectedCharacter 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-gray-900 shadow-2xl hover:scale-105 hover:shadow-yellow-400/25' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {selectedCharacter 
              ? `🚀 Commencer avec ${selectedCharacter.name}` 
              : '↑ Sélectionnez un personnage'
            }
          </button>

          {/* Indication visuelle */}
          {selectedCharacter && (
            <p className="text-blue-200 mt-4 animate-pulse">
              Prêt à commencer l'aventure avec {selectedCharacter.name} ! 🎯
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
