import React, { useEffect, useRef } from "react";

interface AudioManagerProps {
    backgroundMusic?: string;
    soundEffect?: string;
    volume?: number;
    loop?: boolean;
    autoplay?: boolean;
}

export const AudioManager: React.FC<AudioManagerProps> = ({
    backgroundMusic,
    soundEffect,
    volume = 0.3,
    loop = true,
    autoplay = false
}) => {
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const sfxRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 Gestion musique de fond
  useEffect(() => {
    if (backgroundMusic && bgMusicRef.current) {
      const audio = bgMusicRef.current;

      audio.volume = volume;
      audio.loop = loop;
      audio.src = `/assets/audio/music/${backgroundMusic}`;

      if (autoplay) {
        // Lecture automatique
        const playPromise = audio.play();
        playPromise.catch(error => {
          console.log('🔇 Autoplay bloqué, attendre interaction utilisateur:', error.message);
        });
      }

      return () => {
        audio.pause();
        audio.currentTime = 0;
      };
    }
  }, [backgroundMusic, volume, loop, autoplay]);

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