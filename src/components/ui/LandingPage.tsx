// src/components/ui/LandingPage.tsx
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import homeImage from './../../assets/images/home-illustration.png';
import FullscreenButton from '../FullscreenButton';
import { useTimedAudio } from '../../hooks/useTimeAudio';
import landingTheme from '../../assets/audio/music/landing-theme.mp3';

export function LandingPage() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);

  // 🖥️ NOUVEL ÉTAT - Gestion plein écran
  const [isFullscreenActive, setIsFullscreenActive] = useState(false);
  const [showFullscreenWelcome, setShowFullscreenWelcome] = useState(false);

  // 🎵 MUSIQUE SYNCHRONISÉE AVEC LE TITRE
  const { stopAudio, playAudio } = useTimedAudio({
    audioSrc: landingTheme,
    startDelay: 4000, // 4 secondes = moment d'apparition du titre
    volume: 0.25,
    loop: true,
  });

  // Parallaxe et révélation progressive de l'image
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const overlayOpacity = useTransform(scrollY, [0, 200, 400], [0.8, 0.4, 0.1]);
  const imageOpacity = useTransform(scrollY, [0, 300], [0.7, 1]);

  // 🔥 NOUVEAU - Vérification plein écran au montage
  useEffect(() => {
    // Vérifier si on arrive avec demande plein écran
    const fullscreenRequested = localStorage.getItem('fullscreen-requested');

    if (fullscreenRequested === 'true') {
      setIsFullscreenActive(!!document.fullscreenElement);

      // Afficher message de bienvenue plein écran
      if (document.fullscreenElement) {
        setShowFullscreenWelcome(true);
        setTimeout(() => setShowFullscreenWelcome(false), 3000);
      }

      localStorage.removeItem('fullscreen-requested'); // Nettoyer
    }

    // Écouter les changements de plein écran
    const handleFullscreenChange = () => {
      setIsFullscreenActive(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Animation de révélation de l'image après 4 secondes
  useEffect(() => {
    const revealTimer = setTimeout(() => setOverlayVisible(false), 4000);
    const titleTimer = setTimeout(() => setTitleVisible(true), 5000);
    const scrollTimer = setTimeout(() => setShowScrollPrompt(true), 6500);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(titleTimer);
      clearTimeout(scrollTimer);
      // 🎯 PAS DE stopAudio() ici ! Le hook s'en occupe
    };
  }, []);

  const scrollToContent = () => {
    document.getElementById('game-content')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <>
      <FullscreenButton />

      <div className="bg-gradient-to-br from-slate-900 via-orange-950 to-green-950">
        {/* HERO SECTION */}
        <motion.div className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* IMAGE BACKGROUND AVEC RÉVÉLATION PROGRESSIVE */}
          <motion.div style={{ y }} className="absolute inset-0 z-0">
            <motion.img
              src={homeImage}
              alt="La famille fuit Grand-Lac en flammes"
              className="w-full h-full object-cover object-center"
              style={{
                opacity: imageOpacity,
                animation: 'heartbeat 4s ease-in-out infinite',
              }}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />

            {/* OVERLAY AVEC ANIMATION LIMITÉE */}
            <motion.div
              className="absolute inset-0"
              style={{ opacity: overlayOpacity }}
              animate={{
                background: [
                  'linear-gradient(to top, rgba(234,88,12,0.3) 0%, rgba(0,0,0,0.2) 50%, rgba(234,88,12,0.4) 100%)', // 🎯 1ère pulsation
                  'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.8) 100%)', // 🎯 Retour
                  'linear-gradient(to top, rgba(234,88,12,0.3) 0%, rgba(0,0,0,0.2) 50%, rgba(234,88,12,0.4) 100%)', // 🎯 2ème pulsation
                ],
              }}
              transition={{
                duration: 8, // 🎯 8 secondes pour 2 cycles complets
                repeat: 1, // 🎯 PAS DE RÉPÉTITION - une seule fois !
                ease: 'easeInOut',
                times: [0, 0.2, 0.4, 0.6, 1], // 🎯 Timing précis des étapes
              }}
            />
          </motion.div>

          {/* PARTICULES ADAPTATIVES AVEC TRANSITION FLUIDE */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-orange-100/70 rounded-full"
                style={{
                  boxShadow: '0 0 4px rgba(255, 165, 0, 0.6)',
                  filter: 'brightness(1.4)',
                }}
                initial={{
                  x:
                    Math.random() *
                    (typeof window !== 'undefined' ? window.innerWidth : 1200),
                  y:
                    (typeof window !== 'undefined' ? window.innerHeight : 800) +
                    50,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  y: -50,
                  x:
                    Math.random() *
                      (typeof window !== 'undefined'
                        ? window.innerWidth
                        : 1200) +
                    (Math.random() - 0.5) * 200,
                  scale: [0, 1, 1, 0],
                  opacity: [0, 0.75, 0.75, 0], // 🎯 OPACITÉ FIXE - plus de changement brutal
                }}
                transition={{
                  duration: 8 + Math.random() * 6,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: 'linear',
                }}
              />
            ))}

            {/* 🎯 PARTICULES SUPPLÉMENTAIRES QUI APPARAISSENT APRÈS LA RÉVÉLATION */}
            {!overlayVisible &&
              [...Array(15)].map((_, i) => (
                <motion.div
                  key={`late-${i}`}
                  className="absolute w-1 h-1 bg-orange-200/50 rounded-full"
                  style={{
                    boxShadow: '0 0 3px rgba(255, 165, 0, 0.4)',
                    filter: 'brightness(1.2)',
                  }}
                  initial={{
                    x:
                      Math.random() *
                      (typeof window !== 'undefined'
                        ? window.innerWidth
                        : 1200),
                    y:
                      (typeof window !== 'undefined'
                        ? window.innerHeight
                        : 800) + 50,
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    y: -50,
                    x:
                      Math.random() *
                        (typeof window !== 'undefined'
                          ? window.innerWidth
                          : 1200) +
                      (Math.random() - 0.5) * 200,
                    scale: [0, 1, 1, 0],
                    opacity: [0, 0.5, 0.5, 0],
                  }}
                  transition={{
                    duration: 10 + Math.random() * 8,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: 'linear',
                  }}
                />
              ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20">
            <div className="bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-24 pb-12">
              <motion.div
                className="container mx-auto px-4 text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: titleVisible ? 1 : 0,
                  y: titleVisible ? 0 : 50,
                }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                {/* 👑 TITRE AVEC ANIMATION CONDITIONNELLE */}
                <motion.h1
                  className="font-title text-4xl md:text-6xl lg:text-7xl font-bold 
          text-amber-100 mb-4 tracking-wider
          drop-shadow-[3px_3px_6px_rgba(0,0,0,0.8)]"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: titleVisible ? 1 : 0,
                    scale: titleVisible ? 1 : 0.8,
                  }}
                  transition={{ delay: 0.3, duration: 1 }}
                >
                  La fuite de{' '}
                  <motion.span
                    className="font-medieval text-5xl md:text-7xl lg:text-8xl 
                            text-amber-300 inline-block
                            drop-shadow-[2px_2px_4px_rgba(0,0,0,0.9)]"
                    animate={
                      titleVisible
                        ? {
                            textShadow: [
                              '0 0 20px #f59e0b, 0 0 40px #d97706',
                              '0 0 30px #f59e0b, 0 0 60px #d97706',
                              '0 0 20px #f59e0b, 0 0 40px #d97706',
                            ],
                          }
                        : {}
                    }
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    Grand-Lac
                  </motion.span>
                </motion.h1>

                {/* 📖 SOUS-TITRE AVEC SYNC */}
                <motion.p
                  className="font-narrative text-amber-200 text-lg md:text-xl 
                          mb-8 max-w-3xl mx-auto leading-relaxed
                          drop-shadow-[1px_1px_2px_rgba(0,0,0,0.7)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: titleVisible ? 1 : 0,
                    y: titleVisible ? 0 : 20,
                  }}
                  transition={{ delay: 0.8, duration: 1 }}
                >
                  Quand les flammes et la guerre ravagent votre village, chaque
                  seconde compte.
                  <motion.span
                    className="block mt-2 text-amber-300 font-medium"
                    animate={
                      titleVisible ? { opacity: [1, 0.7, 1] } : { opacity: 0 }
                    }
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    Chaque choix peut sauver une vie... ou la condamner.
                  </motion.span>
                </motion.p>
              </motion.div>
            </div>
          </div>

          {/* 🎯 PROMPT DE SCROLL AVEC ÉTAT */}
          {showScrollPrompt && (
            <motion.div
              className="absolute bottom-6 transform -translate-x-1/2 z-30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.button
                onClick={scrollToContent}
                className="flex flex-col items-center text-amber-200 hover:text-amber-100 
                         transition-colors duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm mb-2 font-ui">
                  Découvrir l'aventure
                </span>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  <ChevronDownIcon className="w-6 h-6 group-hover:text-amber-300" />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* 📖 CONTENU ADDITIONNEL - NOUVELLES SECTIONS */}
        <section
          id="game-content"
          className="min-h-screen bg-slate-900/95 backdrop-blur-sm"
        >
          <div className="container mx-auto px-6 py-20">
            {/* À PROPOS DU JEU */}
            <motion.div
              className="max-w-4xl mx-auto mb-20"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
            >
              <h2
                className="font-title text-4xl md:text-5xl font-bold 
                          text-amber-100 text-center mb-12"
              >
                Une Histoire à{' '}
                <span className="font-medieval text-amber-300">Façonner</span>
              </h2>

              <div
                className="bg-slate-800/60 backdrop-blur-sm p-8 md:p-12 rounded-2xl 
                          border border-amber-700/30 shadow-2xl"
              >
                <p
                  className="font-narrative text-amber-50/90 leading-relaxed text-center
                          text-lg md:text-xl"
                >
                  La cité de Grand-Lac s'effondre, votre famille doit fuir.
                  Incarnez tour à tour différents membres de la famille et
                  prenez des décisions cruciales qui influenceront le cours de
                  votre évasion.
                </p>
              </div>
            </motion.div>

            {/* PERSONNAGES */}
            <motion.div
              className="mb-20"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-title text-4xl font-bold text-amber-100 text-center mb-16">
                Les{' '}
                <span className="font-medieval text-amber-300">
                  Protagonistes
                </span>
              </h2>

              {/* 🔥 GRILLE RESPONSIVE OPTIMISÉE */}
              <div
                className="
    grid gap-6 
    
    /* 📱 MOBILE : 1 colonne */
    grid-cols-1 
    
    /* 📱 SMALL TABLET : 2 colonnes */
    sm:grid-cols-2 sm:gap-6
    
    /* 🖥️ LARGE TABLET : 4 colonnes (une ligne) */
    lg:grid-cols-4 lg:gap-8
    
    /* 🖥️ TRÈS LARGE ÉCRAN : Espacement optimisé */
    xl:gap-10
    
    max-w-7xl mx-auto px-4
  "
              >
                {[
                  {
                    name: 'Rik, le Père',
                    desc: 'Protecteur déterminé, ses choix guideront la famille vers la sécurité.',
                  },
                  {
                    name: 'Suzana, la Mère',
                    desc: "Sage et intuitive, elle maintient l'unité familiale dans l'adversité.",
                  },
                  {
                    name: "Eda, L'adolescente",
                    desc: 'Impétueuse et mystérieuse. Elle découvre ses pouvoirs naissants.',
                  },
                  {
                    name: 'Karl, Le jeune garçon',
                    desc: 'Innocent et malin, son regard change tout.',
                  },
                ].map((character, index) => (
                  <motion.div
                    key={character.name}
                    className="
          bg-slate-800/60 p-6 rounded-xl border border-amber-700/30 
          text-center hover:bg-slate-800/80 transition-all duration-500
          transform hover:scale-105 hover:shadow-2xl 
          hover:shadow-amber-500/10 group
          
          /* 📱 RESPONSIVE PADDING */
          sm:p-7 lg:p-8
          
          /* 🎯 HAUTEUR UNIFORME */
          min-h-[200px] flex flex-col justify-center
        "
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                  >
                    <h3
                      className="
          font-title text-xl font-semibold text-amber-200 mb-4
          group-hover:text-amber-100 transition-colors duration-300
          
          /* 📱 RESPONSIVE FONT SIZE */
          sm:text-2xl sm:mb-6
        "
                    >
                      {character.name}
                    </h3>
                    <p
                      className="
          font-narrative text-amber-100/80 leading-relaxed text-sm
          group-hover:text-amber-50/90 transition-colors duration-300
          
          /* 📱 RESPONSIVE FONT SIZE */
          sm:text-base
        "
                    >
                      {character.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA FINAL */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.button
                onClick={() => navigate('/characters')}
                className="font-title bg-gradient-to-r from-amber-700 to-amber-600 
                       hover:from-amber-600 hover:to-amber-500 
                       text-white px-16 py-6 rounded-2xl text-2xl font-bold
                       shadow-2xl hover:shadow-amber-500/25 transition-all duration-400
                       transform hover:scale-110 active:scale-95"
                whileHover={{
                  boxShadow:
                    '0 30px 60px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(245, 158, 11, 0.3)',
                }}
              >
                Entrer dans l'Aventure
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
