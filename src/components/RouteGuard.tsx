import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../stores/gameStore";

interface RouteGuardProps {
    children: React.ReactNode;
    requireGame?: boolean;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({
    children,
    requireGame = false
}) => {
    const navigate = useNavigate();
    const gameStarted = useGameStore(state => state.gameStarted);

    useEffect(() => {
        if (requireGame && !gameStarted) {
            console.log('🛡️ Accès non autorisé - Redirection vers /');
            navigate('/', { replace: true })            
        }
    }, [gameStarted, requireGame, navigate]);

    // Si protection requise et jeu non démarré, ne pas afficher
    if (requireGame && !gameStarted) {
        return null;
    }

    return <>{children}</>;
};