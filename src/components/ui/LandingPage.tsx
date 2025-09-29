// src/components/ui/LandingPage.tsx
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import homeImage from './../../assets/images/home-illustration.png';
import FullscreenButton from '../FullscreenButton';

export function LandingPage() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [showScrollPrompt, setShowScrollPrompt] = useState(false);
  
  // Parallaxe et révélation progressive de l'image
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const overlayOpacity = useTransform(scrollY, [0, 200, 400], [0.8, 0.4, 0.1]);
  const imageOpacity = useTransform(scrollY, [0, 300], [0.7, 1]);

  // Animation de révélation de l'image après 8 secondes
  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setOverlayVisible(false);
    }, 8000);

    // Prompt de scroll après la révélation
    const scrollTimer = setTimeout(() => {
      setShowScrollPrompt(true);
    }, 10000);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(scrollTimer);
    };
  }, []);

  const scrollToContent = () => {
    document.getElementById('game-content')?.scrollIntoView({
      behavior: 'smooth'
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
                    (typeof window !== 'undefined' ? window.innerWidth : 1200) +
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 9, duration: 1.2 }} // Après la révélation
            >
              {/* 👑 TITRE AVEC POLICES PERSONNALISÉES */}
              <motion.h1
                className="font-title text-4xl md:text-6xl lg:text-7xl font-bold 
                          text-amber-100 mb-4 tracking-wider
                          drop-shadow-[3px_3px_6px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 9.3, duration: 1 }}
              >
                La fuite de{' '}
                <motion.span
                  className="font-medieval text-5xl md:text-7xl lg:text-8xl 
                            text-amber-300 inline-block
                            drop-shadow-[2px_2px_4px_rgba(0,0,0,0.9)]"
                  animate={{
                    textShadow: [
                      '0 0 20px #f59e0b, 0 0 40px #d97706',
                      '0 0 30px #f59e0b, 0 0 60px #d97706',
                      '0 0 20px #f59e0b, 0 0 40px #d97706',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  Grand-Lac
                </motion.span>
              </motion.h1>

              {/* 📖 SOUS-TITRE */}
              <motion.p
                className="font-narrative text-amber-200 text-lg md:text-xl 
                          mb-8 max-w-3xl mx-auto leading-relaxed
                          drop-shadow-[1px_1px_2px_rgba(0,0,0,0.7)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 9.8, duration: 1 }}
              >
                Quand les flammes ravagent votre village, chaque seconde compte.
                <motion.span
                  className="block mt-2 text-amber-300 font-medium"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  Chaque choix peut sauver une vie... ou la condamner.
                </motion.span>
              </motion.p>

              
            </motion.div>
          </div>
        </div>

        {/* 📜 INVITATION AU SCROLL */}
        <motion.div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 
                    cursor-pointer group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showScrollPrompt ? 1 : 0,
            y: showScrollPrompt ? 0 : 20
          }}
          onClick={scrollToContent}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center text-amber-200/80 
                        group-hover:text-amber-100 transition-all duration-300">
            <motion.p 
              className="font-ui text-sm mb-2 font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Découvrez l'histoire
            </motion.p>
            
            <ChevronDownIcon 
              className="w-6 h-6 animate-bounce-gentle 
                        group-hover:text-amber-300 transition-colors duration-300" 
            />
          </div>
        </motion.div>
      </motion.div>

      {/* 📖 CONTENU ADDITIONNEL - NOUVELLES SECTIONS */}
      <section id="game-content" className="min-h-screen bg-slate-900/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-20">
          
          {/* À PROPOS DU JEU */}
          <motion.div 
            className="max-w-4xl mx-auto mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-title text-4xl md:text-5xl font-bold 
                          text-amber-100 text-center mb-12">
              Une Histoire à{' '}
              <span className="font-medieval text-amber-300">Façonner</span>
            </h2>
            
            <div className="bg-slate-800/60 backdrop-blur-sm p-8 md:p-12 rounded-2xl 
                          border border-amber-700/30 shadow-2xl">
              <p className="font-narrative text-amber-50/90 leading-relaxed text-center
                          text-lg md:text-xl">
                Au cœur d'une contrée mystique, votre famille doit fuir face à un danger imminent. 
                Incarnez tour à tour différents membres de la famille et prenez des décisions 
                cruciales qui influenceront le cours de votre évasion vers le légendaire Grand Lac.
              </p>
            </div>
          </motion.div>

          {/* PERSONNAGES */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-title text-4xl font-bold text-amber-100 text-center mb-16">
              Les <span className="font-medieval text-amber-300">Protagonistes</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Le Père', desc: 'Protecteur déterminé, ses choix guideront la famille vers la sécurité.' },
                { name: 'La Mère', desc: 'Sage et intuitive, elle maintient l\'unité familiale dans l\'adversité.' },
                { name: 'L\'Enfant', desc: 'Innocent mais perspicace, son regard change tout.' }
              ].map((character, index) => (
                <motion.div
                  key={character.name}
                  className="bg-slate-800/60 p-8 rounded-xl border border-amber-700/30 
                           text-center hover:bg-slate-800/80 transition-all duration-500
                           transform hover:scale-105 hover:shadow-2xl 
                           hover:shadow-amber-500/10 group"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                >
                  <h3 className="font-title text-2xl font-semibold text-amber-200 mb-6
                                group-hover:text-amber-100 transition-colors duration-300">
                    {character.name}
                  </h3>
                  <p className="font-narrative text-amber-100/80 leading-relaxed text-base
                               group-hover:text-amber-50/90 transition-colors duration-300">
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
                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(245, 158, 11, 0.3)'
              }}
            >
              🚪 Entrer dans l'Aventure
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  );
};
