import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeScene } from "./scenes/HomeScene";
import { LandingPage } from "./components/ui/LandingPage";
import { CharacterSelectionScene } from "./scenes/CharacterSelectionScene";
import { RouteGuard } from "./components/RouteGuard";
import { WelcomePage } from "./pages/WelcomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/game" element={<LandingPage />} />
        <Route path="/characters" element={<CharacterSelectionScene />} />
        <Route 
          path="/home" 
          element={
            <RouteGuard requireGame={true}>
              <HomeScene />
            </RouteGuard>
          }
        />
        <Route path="/forest" element={<div>🌲 Forêt - Coming Soon</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;