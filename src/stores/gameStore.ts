// src/stores/gameStore.ts - VERSION SANS IMPORTS EXTERNES
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Types définis localement pour éviter les problèmes d'import
interface Character {
  id: string;
  name: string;
  avatar: string;
  description: string;
  stats: { energy: number; time: number; money: number; };
}

interface ChoiceConsequence {
  flags?: Record<string, boolean>;
  stats?: Record<string, number>;
  location?: string;
}

interface GameState {
  currentLocation: string;
  activeCharacter: string | null;
  characters: Record<string, Character>;
  gameFlags: Record<string, boolean>;
  timeElapsed: number;
  gameStarted: boolean;
}

interface GameStore extends GameState {
  setActiveCharacter: (characterId: string) => void;
  updateCharacterStats: (characterId: string, updates: Partial<Character['stats']>) => void;
  changeLocation: (locationId: string) => void;
  setGameFlag: (flag: string, value: boolean) => void;
  makeChoice: (choiceId: string, consequences?: ChoiceConsequence) => void;
  selectAndStartWithCharacter: (character: Character) => void;
  resetGame: () => void;
  getAvailableCharacters: () => Character[];
  getCurrentCharacter: () => Character | null;
  getGameFlag: (flag: string) => boolean;
}

const PREDEFINED_CHARACTERS: Character[] = [
  {
    id: 'rik',
    name: 'Rik',
    avatar: '👨',
    description: 'Père de famille responsable',
    stats: { energy: 100, time: 0, money: 50 },
  },
  {
    id: 'suzana',
    name: 'Suzana',
    avatar: '👩',
    description: 'Mère de famille organisée',
    stats: { energy: 100, time: 0, money: 50 },
  },
];

export const useGameStore = create<GameStore>()(
  devtools(
    persist(
      (set, get) => ({
        // État initial
        currentLocation: 'character-selection', // 🎯 Commencer par la sélection
        activeCharacter: null, // 🎯 null jusqu'à sélection
        characters: {}, // 🎯 Vide au début
        gameFlags: {},
        timeElapsed: 0,
        gameStarted: false, // 🎯 Flag pour savoir si le jeu a commencé

        // 🔧 ACTIONS AMÉLIORÉES
        setActiveCharacter: (characterId: string) => {
          const state = get();
          // 🚨 FIX: Permettre le changement même si le jeu n'a pas encore commencé
          if (
            state.characters[characterId] ||
            PREDEFINED_CHARACTERS.find(c => c.id === characterId)
          ) {
            set({ activeCharacter: characterId });
            console.log(`✅ Personnage actif: ${characterId}`);
          } else {
            console.warn(`❌ Personnage non trouvé: ${characterId}`);
          }
        },

        updateCharacterStats: (
          characterId: string,
          newStats: Partial<Character['stats']>
        ) => {
          const state = get();
          if (state.characters[characterId]) {
            set(state => ({
              characters: {
                ...state.characters,
                [characterId]: {
                  ...state.characters[characterId],
                  stats: {
                    ...state.characters[characterId].stats,
                    ...newStats,
                  },
                },
              },
            }));
            console.log(`📊 Stats mises à jour pour ${characterId}:`, newStats);
          } else {
            console.warn(
              `❌ Personnage non trouvé pour mise à jour stats: ${characterId}`
            );
          }
        },

        changeLocation: (locationId: string) => {
          set({ currentLocation: locationId });
          console.log(`🗺️ Changement de lieu: ${locationId}`);
        },

        setGameFlag: (flag: string, value: boolean) => {
          set(state => ({
            gameFlags: { ...state.gameFlags, [flag]: value },
          }));
          console.log(`🏁 Flag mis à jour: ${flag} = ${value}`);
        },

        // 🎯 MAKECHOICE AMÉLIORÉ POUR LES CONSÉQUENCES
        makeChoice: (choiceId: string, consequences?: ChoiceConsequence) => {
          console.log(`🎯 Choix effectué: ${choiceId}`);

          if (consequences) {
            const state = get();
            const updates: Partial<GameState> = {};

            // Appliquer les flags
            if (consequences.flags) {
              updates.gameFlags = { ...state.gameFlags, ...consequences.flags };
            }

            // Appliquer les changements de stats au personnage actif
            if (consequences.stats && state.activeCharacter) {
              const character = state.characters[state.activeCharacter];
              if (character) {
                updates.characters = {
                  ...state.characters,
                  [state.activeCharacter]: {
                    ...character,
                    stats: { ...character.stats, ...consequences.stats },
                  },
                };
              }
            }

            // Changer de lieu si spécifié
            if (consequences.location) {
              updates.currentLocation = consequences.location;
            }

            set(updates);
            console.log('✅ Conséquences appliquées:', consequences);
          }
        },

        // 🎯 NOUVELLE ACTION PRINCIPALE
        selectAndStartWithCharacter: (character: Character) => {
          set({
            characters: { [character.id]: character },
            activeCharacter: character.id,
            currentLocation: 'maison', // 🎯 Aller directement à la maison
            gameStarted: true,
            timeElapsed: 0,
            gameFlags: {},
          });
          console.log(`🚀 Jeu démarré avec ${character.name}`);
        },

        // 🎯 OBTENIR LES PERSONNAGES DISPONIBLES
        getAvailableCharacters: () => {
          return PREDEFINED_CHARACTERS;
        },

        getCurrentCharacter: () => {
          const state = get();
          if (!state.activeCharacter) return null;
          return (
            state.characters[state.activeCharacter] ||
            PREDEFINED_CHARACTERS.find(c => c.id === state.activeCharacter) ||
            null
          );
        },

        getGameFlag: (flag: string) => {
          const state = get();
          return state.gameFlags[flag] || false;
        },

        resetGame: () => {
          set({
            currentLocation: 'character-selection',
            activeCharacter: null,
            characters: {},
            gameFlags: {},
            timeElapsed: 0,
            gameStarted: false
          });
          console.log('🔄 Jeu réinitialisé');
        }
      }),
      { 
        name: 'grand-lac-escape-store',
        // 🎯 Optimisation: ne persiste que l'essentiel
        partialize: (state) => ({
          currentLocation: state.currentLocation,
          activeCharacter: state.activeCharacter,
          characters: state.characters,
          gameFlags: state.gameFlags,
          timeElapsed: state.timeElapsed,
          gameStarted: state.gameStarted
        })
      }
    ),
    { name: 'GrandLacEscape' } // Nom dans Redux DevTools
  )
);

// 🛠️ HOOKS UTILITAIRES POUR TES COMPOSANTS
export const useCurrentCharacter = () => {
  return useGameStore(state => state.getCurrentCharacter());
};

export const useGameFlag = (flag: string) => {
  return useGameStore(state => state.getGameFlag(flag));
};
