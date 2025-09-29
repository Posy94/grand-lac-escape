// src/scenes/HomeScene.tsx - VERSION OPTIMISÉE
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CharacterSelector } from '../components/characters/CharacterSelector';
import { useGameStore, useCurrentCharacter } from '../stores/gameStore';
import { NarrativeScene } from '../components/NarrativeScene';
import { homeSceneData } from '../data/scenes/homeSceneData';

export const HomeScene: React.FC = () => {
  const navigate = useNavigate();
  const { makeChoice, changeLocation } = useGameStore(); // 🎯 Utiliser les nouvelles méthodes du store
  const currentCharacter = useCurrentCharacter(); // 🎯 Hook optimisé

  const handleChoiceSelect = (choiceId: string, nextSceneId: string) => {
    console.log(`🎯 Choix sélectionné: ${choiceId} → ${nextSceneId}`);

    // 🎯 Trouver le choix dans les données de la scène
    const selectedChoice = homeSceneData.choices?.find(choice => choice.id === choiceId);

    if (selectedChoice) {
      // ✅ Le store s'occupe maintenant de tout automatiquement !
      makeChoice(choiceId, selectedChoice.consequences);

      // 🎬 Navigation vers la scène suivante
      handleSceneNavigation(nextSceneId);
    } else {
      console.warn(`❌ Choix non trouvé: ${choiceId}`);
    }
  };

  const handleSceneNavigation = (nextSceneId: string) => {
    switch (nextSceneId) {
      case 'morning-preparation':
        // 🏠 Changer la location dans le store
        changeLocation('morning-preparation');
        alert('🌅 Vous vous reposez pour la nuit...\n(Prochaine scène à implémenter)');
        break;
        
      case 'night-departure':
        changeLocation('night-departure');
        alert('🌙 Vous partez discrètement dans la nuit...\n(Prochaine scène à implémenter)');
        break;
        
      case 'parents-advice':
        changeLocation('parents-advice');
        alert('👨‍👩‍👧‍👦 Vos parents vous donnent leurs conseils...\n(Prochaine scène à implémenter)');
        break;
        
      default:
        console.warn(`❌ Scène non implémentée: ${nextSceneId}`);
        alert(`Scène "${nextSceneId}" pas encore implémentée !`);
    }
  };

  // 🚨 Gestion des états de chargement
  if (!currentCharacter) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-amber-900/20 flex items-center justify-center">
        <div className="text-white text-xl">
          🎭 Chargement du personnage...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-amber-900/20">
      {/* 🎭 Sélecteur de personnage en overlay */}
      <div className="fixed top-4 left-4 z-20">
        <CharacterSelector />
      </div>

      {/* 🎬 Scène narrative principale */}
      <NarrativeScene 
        content={homeSceneData}
        onChoiceSelect={handleChoiceSelect}
      />

      {/* 🛠️ Debug panel en développement */}
      {process.env.NODE_ENV === 'development' && (
        <DebugPanel />
      )}
    </div>
  );
};

// 🛠️ COMPOSANT DEBUG POUR LE DÉVELOPPEMENT
const DebugPanel: React.FC = () => {
  const { gameFlags, currentLocation, timeElapsed } = useGameStore();
  const currentCharacter = useCurrentCharacter();

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-sm max-w-xs">
      <h3 className="font-bold mb-2">🐛 Debug Info</h3>
      <div className="space-y-1">
        <div><strong>Personnage:</strong> {currentCharacter?.name}</div>
        <div><strong>Lieu:</strong> {currentLocation}</div>
        <div><strong>Temps:</strong> {timeElapsed}</div>
        <div><strong>Flags:</strong></div>
        <div className="text-xs max-h-20 overflow-y-auto">
          {Object.entries(gameFlags).length > 0 
            ? JSON.stringify(gameFlags, null, 2)
            : 'Aucun flag'
          }
        </div>
      </div>
    </div>
  );
};
