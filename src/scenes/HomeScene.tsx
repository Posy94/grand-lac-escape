// src/scenes/HomeScene.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterSelector } from '../components/characters/CharacterSelector';
import { useGameStore } from '../stores/gameStore';

export function HomeScene() {
  const navigate = useNavigate();
  const { characters, activeCharacter } = useGameStore();
  const currentChar = characters[activeCharacter];

  const handleAction = (action: string) => {
    switch (action) {
      case 'leave':
        navigate('/forest'); // Première destination
        break;
      case 'rest':
        // Logique de repos + navigation
        navigate('/home'); // Reste ici mais avec état modifié
        break;
      case 'gather':
        // Logique de collecte
        navigate('/home');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-50 to-forest-50">
      <div className="container mx-auto p-4 max-w-4xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-brown-800">La fuite de Grand-lac</h1>
          <CharacterSelector />
        </header>

        {/* Stats rapides */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-lg border border-brown-100">
          <h2 className="text-lg font-semibold mb-2 text-forest-700">
            Ressources - {currentChar.name}
          </h2>
          <div className="flex gap-6 text-brown-700">
            <div className="flex items-center">
              <span className="text-warning mr-1">⚡</span>
              <span className="font-medium">Énergie: {currentChar.stats.energy}</span>
            </div>
            <div className="flex items-center">
              <span className="text-info mr-1">⏱️</span>
              <span className="font-medium">Temps: {currentChar.stats.time}h</span>
            </div>
            <div className="flex items-center">
              <span className="text-warning-dark mr-1">💰</span>
              <span className="font-medium">Argent: {currentChar.stats.money}€</span>
            </div>
          </div>
        </div>

        {/* Zone principale */}
        <main className="bg-white rounded-lg p-6 shadow-lg border border-brown-100">
          <h2 className="text-2xl font-semibold mb-4 text-forest-700">
            🏠 Maison familiale
          </h2>
          <p className="text-brown-600 leading-relaxed mb-6">
            {activeCharacter === 'rik' 
              ? "Vous regardez votre maison une dernière fois. Après des années de bonheur familial ici, il faut partir. Le temps presse, mais chaque minute compte."
              : "Cette demeure était votre sanctuaire. Maintenant il faut l'abandonner, mais peut-être pouvez-vous sauver quelques souvenirs précieux."
            }
          </p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 text-forest-600">
              ⚡ Actions possibles :
            </h3>
            <div className="space-y-3">
              {/* Action URGENTE - Partir */}
              <button 
                onClick={() => handleAction('leave')}
                className="w-full p-4 text-left bg-forest-100 hover:bg-forest-200 rounded-lg border border-forest-300 transition-all duration-200 hover:shadow-md group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-forest-700 font-semibold group-hover:text-forest-800">
                      🚗 Partir immédiatement
                    </div>
                    <span className="block text-sm text-forest-600 mt-1">
                      Économise du temps mais vous serez fatigués
                    </span>
                  </div>
                  <div className="text-forest-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </div>
                </div>
              </button>

              {/* Action POSITIVE - Se reposer */}
              <button 
                onClick={() => handleAction('rest')}
                className="w-full p-4 text-left bg-success-light hover:bg-success hover:text-white rounded-lg border border-forest-200 transition-all duration-200 hover:shadow-md group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold group-hover:text-white">
                      🛏️ Se reposer 1 heure
                    </div>
                    <span className="block text-sm text-success-dark group-hover:text-green-100 mt-1">
                      Récupère de l'énergie mais prend du temps
                    </span>
                  </div>
                  <div className="text-success opacity-0 group-hover:opacity-100 group-hover:text-white transition-all">
                    +⚡
                  </div>
                </div>
              </button>

              {/* Action NEUTRE - Rassembler */}
              <button 
                onClick={() => handleAction('gather')}
                className="w-full p-4 text-left bg-brown-100 hover:bg-brown-200 rounded-lg border border-brown-300 transition-all duration-200 hover:shadow-md group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-brown-700 font-semibold group-hover:text-brown-800">
                      📦 Rassembler des provisions
                    </div>
                    <span className="block text-sm text-brown-600 mt-1">
                      Trouvez des objets utiles pour le voyage
                    </span>
                  </div>
                  <div className="text-brown-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    +🎒
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Indicateur d'urgence */}
          <div className="mt-6 p-3 bg-warning-light border border-warning rounded-lg">
            <div className="flex items-center text-warning-dark">
              <span className="text-lg mr-2">⚠️</span>
              <span className="text-sm font-medium">
                Le feu gagne du terrain. Chaque action compte !
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
