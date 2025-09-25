// src/App.tsx
import React from 'react';
import { CharacterSelector } from './components/characters/CharacterSelector';
import { useGameStore } from './stores/gameStore';

function App() {
  const { characters, activeCharacter } = useGameStore();
  const currentChar = characters[activeCharacter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto p-4 max-w-4xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">La fuite de Grand-lac</h1>
          <CharacterSelector />
        </header>

        {/* Stats rapides */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Ressources - {currentChar.name}</h2>
          <div className="flex gap-6">
            <div>⚡ Énergie: {currentChar.stats.energy}</div>
            <div>⏱️ Temps: {currentChar.stats.time}h</div>
            <div>💰 Argent: {currentChar.stats.money}€</div>
          </div>
        </div>

        {/* Zone principale */}
        <main className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Maison familiale</h2>
          <p className="text-gray-700 leading-relaxed">
            {activeCharacter === 'rik' 
              ? "Vous regardez votre maison une dernière fois. Après des années de bonheur familial ici, il faut partir. Le temps presse, mais chaque minute compte."
              : "Cette demeure était votre sanctuaire. Maintenant il faut l'abandonner, mais peut-être pouvez-vous sauver quelques souvenirs précieux."
            }
          </p>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Actions possibles :</h3>
            <div className="space-y-3">
              <button className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors">
                🚗 Partir immédiatement
                <span className="block text-sm text-gray-600">Économise du temps mais vous serez fatigués</span>
              </button>
              <button className="w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
                🛏️ Se reposer 1 heure
                <span className="block text-sm text-gray-600">Récupère de l'énergie mais prend du temps</span>
              </button>
              <button className="w-full p-3 text-left bg-yellow-50 hover:bg-yellow-100 rounded-lg border border-yellow-200 transition-colors">
                📦 Rassembler des provisions
                <span className="block text-sm text-gray-600">Trouvez des objets utiles</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
