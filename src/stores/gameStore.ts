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

interface GameState {
  currentLocation: string;
  activeCharacter: string;
  characters: Record<string, Character>;
  gameFlags: Record<string, boolean>;
  timeElapsed: number;
}

interface GameStore extends GameState {
  setActiveCharacter: (characterId: string) => void;
  updateCharacterStats: (characterId: string, updates: Partial<Character['stats']>) => void;
  changeLocation: (locationId: string) => void;
  setGameFlag: (flag: string, value: boolean) => void;
  makeChoice: (choiceId: string) => void;
  resetGame: () => void;
}

const initialCharacters: Record<string, Character> = {
  rik: {
    id: 'rik',
    name: 'Rik',
    avatar: '👨',
    description: 'Père de famille responsable',
    stats: { energy: 100, time: 0, money: 50 }
  },
  suzana: {
    id: 'suzana',
    name: 'Suzana',
    avatar: '👩',
    description: 'Mère de famille organisée',
    stats: { energy: 100, time: 0, money: 50 }
  }
};

export const useGameStore = create<GameStore>()(
  devtools(
    persist(
      (set, get) => ({
        // État initial
        currentLocation: 'maison',
        activeCharacter: 'rik',
        characters: initialCharacters,
        gameFlags: {},
        timeElapsed: 0,

        // Actions
        setActiveCharacter: (characterId: string) => {
          set({ activeCharacter: characterId });
        },

        updateCharacterStats: (characterId: string, newStats: Partial<Character['stats']>) => {
          set((state) => ({
            characters: {
              ...state.characters,
              [characterId]: {
                ...state.characters[characterId],
                stats: { ...state.characters[characterId].stats, ...newStats }
              }
            }
          }));
        },

        changeLocation: (locationId: string) => {
          set({ currentLocation: locationId });
        },

        setGameFlag: (flag: string, value: boolean) => {
          set((state) => ({
            gameFlags: { ...state.gameFlags, [flag]: value }
          }));
        },

        makeChoice: (choiceId: string) => {
          console.log('Choice made:', choiceId);
        },

        resetGame: () => {
          set({
            currentLocation: 'maison',
            activeCharacter: 'rik',
            characters: initialCharacters,
            gameFlags: {},
            timeElapsed: 0
          });
        }
      }),
      { name: 'grand-lac-escape-store' }
    )
  )
);
