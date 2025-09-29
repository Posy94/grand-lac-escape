import React from 'react';

interface FontTesterProps {
  isVisible: boolean;
  onToggle: () => void;
}

export const FontTester: React.FC<FontTesterProps> = ({ isVisible, onToggle }) => {
  if (!isVisible) {
    return (
      <button 
        onClick={onToggle}
        className="fixed top-4 left-4 z-[9999] bg-amber-600 hover:bg-amber-700 
                   text-white px-3 py-2 rounded text-sm font-bold transition-colors"
      >
        👁️ Test Polices
      </button>
    );
  }

  return (
    <>
      {/* Bouton de fermeture */}
      <button 
        onClick={onToggle}
        className="fixed top-4 left-4 z-[9999] bg-red-600 hover:bg-red-700 
                   text-white px-3 py-2 rounded text-sm font-bold transition-colors"
      >
        ✖️ Fermer
      </button>

      {/* Panel de test */}
      <div className="fixed top-4 right-4 z-[9999] bg-black/90 text-white p-6 rounded-lg 
                      border border-amber-500/50 shadow-2xl backdrop-blur-sm max-w-sm">
        
        {/* En-tête */}
        <div className="text-amber-300 font-bold text-sm mb-4 text-center border-b border-amber-700 pb-2">
          🎨 VÉRIFICATION DES POLICES
        </div>
        
        {/* Tests de polices */}
        <div className="space-y-4">
          {/* Cinzel */}
          <div className="space-y-1">
            <div className="text-xs text-amber-400">font-title (Cinzel):</div>
            <div className="font-title text-lg text-white">
              L'Évasion du Grand-Lac ⚔️
            </div>
          </div>

          {/* Uncial Antiqua */}
          <div className="space-y-1">
            <div className="text-xs text-amber-400">font-medieval (Uncial):</div>
            <div className="font-medieval text-xl text-amber-200">
              Quête Légendaire 🏰
            </div>
          </div>

          {/* Crimson Text */}
          <div className="space-y-1">
            <div className="text-xs text-amber-400">font-narrative (Crimson):</div>
            <div className="font-narrative text-base text-amber-100 italic">
              « Il était une fois, dans un royaume lointain... » 📜
            </div>
          </div>

          {/* System UI */}
          <div className="space-y-1">
            <div className="text-xs text-amber-400">font-ui (System):</div>
            <div className="font-ui text-sm text-gray-200">
              Interface utilisateur moderne ⚙️
            </div>
          </div>
        </div>

        {/* Status technique */}
        <div className="text-xs text-amber-300 border-t border-amber-700/50 pt-3 mt-4">
          <div className="mb-1">📊 Status: <span className="text-green-400">{document.fonts.status}</span></div>
          <div>📚 Polices chargées: <span className="text-blue-400">{document.fonts.size}</span></div>
        </div>

        {/* Tests spécifiques */}
        <div className="mt-3 text-xs">
          <button 
            onClick={() => {
              const tests = [
                { name: 'Cinzel', result: document.fonts.check('16px Cinzel') },
                { name: 'Uncial Antiqua', result: document.fonts.check('16px "Uncial Antiqua"') },
                { name: 'Crimson Text', result: document.fonts.check('16px "Crimson Text"') }
              ];
              console.log('🔍 Tests de polices:', tests);
              alert(`Résultats:\n${tests.map(t => `${t.name}: ${t.result ? '✅' : '❌'}`).join('\n')}`);
            }}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-1 px-2 rounded text-xs"
          >
            🧪 Test Console
          </button>
        </div>
      </div>
    </>
  );
};
