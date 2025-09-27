import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../stores/gameStore';
import { useNavigate } from 'react-router-dom';
import { CharacterCard } from '../components/CharacterCard';

type Character = {
    id: string;
    name: string;
    avatar: string;
    description: string;
    stats: { energy: number; time: number; money: number; };
};

export function CharacterSelectionScene() {
    const { selectedCharacter, setSelectedCharacter } = useGameStore();
    const navigate = useNavigate();

    // 🎯 Liste des personnages disponibles
const AVAILABLE_CHARACTERS: Character[] = [
  {
    id: 'alex',
    name: 'Alex l\'Aventurier',
    avatar: '🧑‍🏕️',
    description: 'Jeune explorateur plein d\'énergie, toujours prêt pour une nouvelle aventure.',
    stats: {
      energy: 85,
      time: 12,
      money:50
    }
  },
  {
    id: 'maya',
    name: 'Maya la Sage',
    avatar: '👩‍🔬',
    description: 'Scientifique brillante qui analyse chaque situation avant d\'agir.',
    stats: {
      energy: 70,
      time: 15,
      money: 50
    }
  },
  {
    id: 'kai',
    name: 'Kai le Survivant',
    avatar: '🧑‍🌾',
    description: 'Ancien guide de montagne, habitué aux situations extrêmes.',
    stats: {
      energy: 95,
      time: 10,
      money: 50
    }
  }
];

    const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleStartGame = () => {
    if (selectedCharacter) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* 🎯 Header */}
      <motion.div 
        className="container mx-auto px-6 py-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            ⚡ Choisissez Votre Héros
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Chaque personnage a ses propres forces. Votre choix influencera l'histoire...
          </p>
        </div>

        {/* 🎯 Grille de personnages */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {AVAILABLE_CHARACTERS.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <CharacterCard
                character={character}
                isSelected={selectedCharacter?.id === character.id}
                onClick={handleCharacterSelect}
              />
            </motion.div>
          ))}
        </div>

        {/* 🎯 Bouton de validation */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button
            onClick={handleStartGame}
            disabled={!selectedCharacter}
            className={`
              px-12 py-4 text-xl font-bold rounded-2xl transition-all duration-300 transform
              ${selectedCharacter 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105 text-white shadow-xl' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {selectedCharacter ? '🚀 Commencer l\'Aventure' : '👆 Sélectionnez un personnage'}
          </button>

          {/* 🎯 Info du personnage sélectionné */}
          {selectedCharacter && (
            <motion.div
              className="mt-6 p-6 bg-white/10 rounded-2xl max-w-md mx-auto backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-blue-200 mb-2">Personnage sélectionné :</p>
              <p className="text-2xl font-bold text-yellow-400">{selectedCharacter.name}</p>
              <p className="text-sm text-blue-100 mt-2">{selectedCharacter.description}</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
