// src/components/FullscreenButton.tsx
import React, { useState, useEffect } from 'react';

const FullscreenButton: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenActive = !!document.fullscreenElement;
      setIsFullscreen(fullscreenActive);
      
      // 🎯 GESTION AUTOMATIQUE DE LA SCROLLBAR
      if (fullscreenActive) {
        // En fullscreen : masquer scrollbar
        document.body.classList.remove('normal-scrollbar');
        document.body.classList.add('fullscreen-no-scrollbar');
        document.documentElement.classList.remove('normal-scrollbar');
        document.documentElement.classList.add('fullscreen-no-scrollbar');
      } else {
        // Hors fullscreen : scrollbar normale
        document.body.classList.remove('fullscreen-no-scrollbar');
        document.body.classList.add('normal-scrollbar');
        document.documentElement.classList.remove('fullscreen-no-scrollbar');
        document.documentElement.classList.add('normal-scrollbar');
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    // Initialiser l'état
    handleFullscreenChange();
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      // Nettoyer au démontage
      document.body.classList.remove('fullscreen-no-scrollbar', 'normal-scrollbar');
      document.documentElement.classList.remove('fullscreen-no-scrollbar', 'normal-scrollbar');
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Erreur plein écran:', err);
    }
  };

  return (
    <button
      onClick={toggleFullscreen}
      className="fixed top-4 right-4 z-50 bg-village-800 hover:bg-village-600 text-amber-100 hover:text-white p-3 rounded-lg shadow-lg transition-all duration-200 group"
      title={isFullscreen ? "Sortir du plein écran (ESC)" : "Plein écran (F11)"}
    >
      {isFullscreen ? (
        // Icône "sortir plein écran"
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5m11 5.5V4.5M15 9h4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5m11-5.5v4.5m0-4.5h4.5m-4.5 0l5.5 5.5" />
        </svg>
      ) : (
        // Icône "plein écran"
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.5 3.5L9 9m0 0V4.5M9 9H4.5m11-5.5L15 9m0 0h4.5M15 9V4.5M3.5 20.5L9 15m0 0v4.5M9 15H4.5m11 5.5L15 15m0 0h4.5m-4.5 0v4.5" />
        </svg>
      )}
      
      {/* Texte d'aide */}
      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {isFullscreen ? "ESC pour sortir" : "Clic pour plein écran"}
      </span>
    </button>
  );
};

export default FullscreenButton;
