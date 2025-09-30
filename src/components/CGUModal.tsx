import { motion } from "framer-motion";

export function CGUModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <motion.div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className="bg-slate-800 rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto p-6"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-amber-300">
            Conditions Générales d'Utilisation
          </h2>
          <button onClick={onClose} className="text-white hover:text-amber-300">
            ✕
          </button>
        </div>
        
        <div className="text-white space-y-4">
          <h3 className="text-lg font-semibold">1. Projet en développement</h3>
          <p>Ce jeu est actuellement en phase de développement. Des bugs peuvent survenir...</p>
          
          <h3 className="text-lg font-semibold">2. Données utilisateur</h3>
          <p>Vos données de progression sont stockées localement...</p>
          
          {/* etc. */}
        </div>
      </motion.div>
    </motion.div>
  );
}