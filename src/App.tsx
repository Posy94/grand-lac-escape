import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeScene } from "./scenes/HomeScene";
import { LandingPage } from "./components/ui/LandingPage";
import { CharacterSelectionScene } from "./scenes/CharacterSelectionScene";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/characters" element={<CharacterSelectionScene />} />
        <Route path="/home" element={<HomeScene />} />
        <Route path="/forest" element={<div>🌲 Forêt - Coming Soon</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;