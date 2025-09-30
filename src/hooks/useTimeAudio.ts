// src/hooks/useTimeAudio.ts - VERSION DEBUG
import { useRef, useEffect } from 'react';

interface UseTimedAudioProps {
  audioSrc: string;
  startDelay: number;
  volume?: number;
  loop?: boolean;
}

export const useTimedAudio = ({ 
  audioSrc, 
  startDelay, 
  volume = 0.3, 
  loop = true 
}: UseTimedAudioProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef(false); // 🎯 Éviter les doublons

  useEffect(() => {
    // Éviter les re-déclenchements
    if (hasTriggeredRef.current) {
      console.log('🔄 useTimedAudio déjà initialisé, skip');
      return;
    }

    hasTriggeredRef.current = true;

    console.log('🎵 useTimedAudio - Initialisation:', {
      audioSrc,
      startDelay,
      volume,
      loop
    });

    // Créer l'élément audio
    audioRef.current = new Audio(audioSrc);
    audioRef.current.volume = volume;
    audioRef.current.loop = loop;
    audioRef.current.preload = 'auto';

    // Events
    audioRef.current.addEventListener('canplay', () => {
      console.log('✅ Audio peut être joué');
    });

    audioRef.current.addEventListener('error', (e) => {
      console.error('❌ Erreur audio:', e);
    });

    audioRef.current.addEventListener('loadstart', () => {
      console.log('🔄 Début chargement audio');
    });

    // Programmer le démarrage
    console.log(`⏰ Audio programmé dans ${startDelay}ms`);
    
    timeoutRef.current = window.setTimeout(() => {
      console.log('🎵 DÉCLENCHEMENT DU TIMEOUT - Tentative de lecture audio...');
      
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            console.log('✅ Audio démarré avec succès !');
          })
          .catch(error => {
            console.error('❌ Erreur lecture audio:', error);
            console.log('💡 Peut nécessiter une interaction utilisateur');
          });
      }
    }, startDelay);

    // Cleanup seulement au démontage du composant
    return () => {
      console.log('🛑 CLEANUP FINAL - Arrêt audio demandé');
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []); // 🎯 DÉPENDANCES VIDES = une seule exécution

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return { stopAudio };
};
