import { useEffect, useRef } from "react";

interface AudioManagerProps {
    backgroundMusic?: string;
    soundEffect?: string;
    volume?: number;
}

export const AudioManager: React.FC<AudioManagerProps> = ({
    backgroundMusic,
    soundEffect,
    volume = 0.5
}) => {
  // 🔇 Version silencieuse temporaire
  if (!backgroundMusic && !soundEffect) {
    return null;
  }

  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const sfxRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 Gestion musique de fond
  useEffect(() => {
    if (backgroundMusic) {
      // Arrêter la musique précédente
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }

      // Créer nouvelle instance audio
      bgMusicRef.current = new Audio(`/assets/audio/${backgroundMusic}`);
      bgMusicRef.current.volume = volume;
      bgMusicRef.current.loop = true;

      // Jouer avec gestion d'erreur
      bgMusicRef.current.play().catch(console.warn);
    }

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    };
  }, [backgroundMusic, volume]);

  // 🔊 Gestion effets sonores
  useEffect(() => {
    if (soundEffect) {
      sfxRef.current = new Audio(`/assets/audio/${soundEffect}`);
      sfxRef.current.volume = volume;
      sfxRef.current.play().catch(console.warn);
    }
  }, [soundEffect, volume]);

  return null;
};