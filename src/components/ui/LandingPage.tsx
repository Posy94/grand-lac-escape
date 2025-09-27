// src/components/ui/LandingPage.tsx
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import homeImage from './../../assets/images/home-illustration.png';

export function LandingPage() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const [overlayVisible, setOverlayVisible] = useState(true);
  
  // Parallaxe et révélation progressive de l'image
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const overlayOpacity = useTransform(scrollY, [0, 200, 400], [0.8, 0.4, 0.1]);
  const imageOpacity = useTransform(scrollY, [0, 300], [0.7, 1]);

  // Animation de révélation de l'image après 3 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setOverlayVisible(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
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

        {/* CONTENU PRINCIPAL */}
        <motion.div
          className="relative z-10 container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* TITRE */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <motion.h1
              className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
            >
              Grand-
              <motion.span
                className="inline-block text-fire-500"
                animate={{
                  textShadow: [
                    '0 0 20px #f97316, 0 0 40px #ea580c',
                    '0 0 30px #f97316, 0 0 60px #ea580c',
                    '0 0 20px #f97316, 0 0 40px #ea580c',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Lac
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-smoke-100 max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
              variants={itemVariants}
            >
              Quand les flammes ravagent votre village, chaque seconde compte.
              <motion.span
                className="inline-block ml-2"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Chaque choix peut sauver une vie... ou la condamner.
              </motion.span>
            </motion.p>
          </motion.div>

          {/* BOUTON CTA */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.button
              onClick={() => navigate('/characters')}
              className="group relative bg-fire-600 hover:bg-fire-700 text-white text-xl font-bold py-4 px-12 rounded-xl shadow-2xl overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow:
                  '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 50px rgba(249, 115, 22, 0.4)',
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 1.5,
                duration: 0.8,
                type: 'spring',
                stiffness: 200,
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
              />

              <motion.span
                className="relative flex items-center gap-3"
                whileHover={{ x: 5 }}
              >
                🔥 Commencer l'Aventure
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* SECTION À PROPOS */}
      <motion.section
        className="py-20 bg-gradient-to-b from-fire-900/90 to-green-800/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Une Histoire de <span className="text-fire-500">Survie</span>
            </h2>
            <p className="text-xl text-smoke-100 leading-relaxed mb-8">
              L'incendie qui ravage Grand-Lac n'est que le début. Suivez la
              famille de Rik, Suzana, Eda et Karl dans leur fuite désespérée.
              Chaque décision que vous prendrez influencera leur destin et celui
              des habitants du village.
            </p>
            <p className="text-lg text-smoke-200 leading-relaxed">
              Un récit interactif où vos choix comptent vraiment. Serez-vous
              capable de tous les sauver ?
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* SECTION PERSONNAGES */}
      <motion.section
        className="py-20 bg-green-800/80"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            Rencontrez la <span className="text-fire-500">Famille</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {characters.map((character, index) => (
              <motion.div
                key={character.name}
                className="bg-green-700/50 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-green-700/80 transition-colors"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{character.emoji}</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {character.name}
                </h3>
                <p className="text-fire-400 mb-3">{character.role}</p>
                <p className="text-smoke-200 text-sm">
                  {character.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA FINAL */}
      <motion.section
        className="py-16 bg-gradient-to-b from-green-800/90 to-fire-900/90 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            Prêt à changer leur destin ?
          </h3>
          <motion.button
            onClick={() => navigate('/characters')}
            className="bg-fire-600 hover:bg-fire-700 text-white text-lg font-bold py-3 px-10 rounded-lg shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⚡ Jouer Maintenant
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  );
}

// DONNÉES DES PERSONNAGES
const characters = [
  {
    name: "Rik",
    role: "Le Père Protecteur", 
    emoji: "👨‍🌾",
    description: "Fermier courageux, il ferait tout pour sa famille"
  },
  {
    name: "Suzana", 
    role: "La Mère Sage",
    emoji: "👩‍🏫", 
    description: "Érudite et stratège, elle connaît les secrets du village"
  },
  {
    name: "Eda",
    role: "L'Adolescente Rebelle",
    emoji: "👧",
    description: "16 ans, déterminée et mystérieuse"
  },
  {
    name: "Karl",
    role: "Le Petit Frère",
    emoji: "👦", 
    description: "12 ans, curieux et plein d'espoir malgré la catastrophe"
  }
];

// VARIANTES D'ANIMATION (inchangées)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.3,
      duration: 1
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    filter: 'blur(4px)' 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { 
      duration: 1, 
      ease: "easeOut" as const  // 🎯 CORRECTION ICI
    }
  }
};
