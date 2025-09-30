import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CGUModal } from "../components/CGUModal";

export function WelcomePage() {
  const [showCGU, setShowCGU] = useState(false);
  const navigate = useNavigate();

  const handleStartExperience = async () => {
    try {
      // 🔥 1. Activer le plein écran AVANT la navigation
      await document.documentElement.requestFullscreen();
      console.log('Mode plein écran activé !');
      
      // 📦 2. Stocker les infos
      localStorage.setItem('cgu-accepted', 'true');
      localStorage.setItem('fullscreen-requested', 'true');
      
    } catch (error) {
      console.log('Plein écran refusé ou non supporté:', error.message);
      // Même si ça échoue, on continue
      localStorage.setItem('cgu-accepted', 'true');
      localStorage.setItem('fullscreen-requested', 'false');
    }
    
    // 🎮 3. Navigation vers le jeu
    navigate('/game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black 
                    flex items-center justify-center p-4">
      <motion.div 
        className="max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* 🎮 LOGO/TITRE DU JEU */}
        <h1 className="text-4xl font-bold text-amber-300 mb-8">
          La fuite de Grand-Lac
        </h1>

        {/* ⚠️ MESSAGE D'AVERTISSEMENT AMÉLIORÉ */}
        <div className="bg-slate-800/50 rounded-lg p-6 mb-8">
          <p className="text-xl text-amber-100 leading-relaxed mb-4">
            Vous vous apprêtez à jouer à un jeu en développement. 
            En cliquant sur le bouton{' '}
            <span className="font-semibold text-amber-300">
              "Prêt pour l'expérience"
            </span>{' '}
            vous acceptez les CGU lisibles{' '}
            <button 
              onClick={() => setShowCGU(true)}
              className="text-amber-400 underline hover:text-amber-300"
            >
              via ce lien
            </button>.
          </p>
          
          {/* 🖥️ INFO PLEIN ÉCRAN */}
          <div className="text-sm text-amber-300 bg-amber-900/20 
                        border border-amber-700 rounded px-3 py-2">
            💡 Le jeu sera lancé en mode plein écran pour une expérience optimale
          </div>
        </div>

        {/* 🚀 BOUTON PRINCIPAL MODIFIÉ */}
        <motion.button
          onClick={handleStartExperience}
          className="bg-gradient-to-r from-amber-600 to-amber-700 
                   text-white px-12 py-4 rounded-lg text-xl font-bold
                   hover:from-amber-500 hover:to-amber-600 transition-all
                   shadow-lg border border-amber-500
                   relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">
            🎵 Prêt pour l'expérience
          </span>
          <div className="text-sm font-normal mt-1 opacity-75">
            (Mode plein écran)
          </div>
          
          {/* ✨ Effet de brillance au survol */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent 
                     via-white/20 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            whileHover={{ x: '200%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>

        {/* 📱 Note pour mobile (optionnel) */}
        <p className="text-xs text-slate-400 mt-4 md:hidden">
          Sur mobile : le mode plein écran peut ne pas être disponible
        </p>
      </motion.div>

      {/* 📋 MODALE CGU */}
      <CGUModal isOpen={showCGU} onClose={() => setShowCGU(false)} />
    </div>
  );
}