// src/data/scenes/homeSceneData.ts
import type { NarrativeContent } from '../../types/narrative';

export const homeSceneData: NarrativeContent = {
  id: 'home-family-house',
  title: 'La Maison Familiale',
  text: `La nuit tombe sur la maison où vous avez grandi. Rik et Suzana, vos parents, vous regardent avec inquiétude. Des nouvelles troublantes sont arrivées du royaume voisin, et une décision importante doit être prise.
  
  "Mon enfant," dit doucement Suzana, "les temps changent. Nous devons décider si nous partons dès ce soir ou si nous prenons le temps de nous préparer."
  
  Rik hoche la tête gravement. "Chaque choix a ses conséquences. Que veux-tu faire ?"`,
  
  backgroundImage: undefined,
  backgroundMusic: undefined,
  
  choices: [
    {
      id: 'rest-and-prepare',
      text: 'Se reposer et se préparer cette nuit',
      nextSceneId: 'morning-preparation',
      consequences: {
        flags: { 'well-rested': true, 'hasSupplies': true },
        stats: { 'energy': 10 }
      }
    },
    {
      id: 'leave-immediately',
      text: 'Partir immédiatement dans la nuit',
      nextSceneId: 'night-departure',
      consequences: {
        flags: { 'stealthy-escape': true, 'rushed-departure': true },
        stats: { 'stealth': 5 }
      }
    },
    {
      id: 'ask-parents-advice',
      text: 'Demander conseil aux parents',
      nextSceneId: 'parents-advice',
      requirements: {
        character: ['rik', 'suzana'] // Disponible seulement si on joue avec les parents
      }
    }
  ]
};
