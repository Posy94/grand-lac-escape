import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { AudioManager } from "./AudioManager";
import { ChoiceButton } from "./ChoiceButton";
import { useGameStore } from "../stores/gameStore";
import type { NarrativeContent } from "../types/narrative";

interface NarrativeSceneProps {
    content: NarrativeContent;
    onChoiceSelect: (choiceId: string, nextSceneId: string) => void;
    className?: string;
}

export const NarrativeScene: React.FC<NarrativeSceneProps> = ({
    content,
    onChoiceSelect,
    className = ''
}) => {
    const [textVisible, setTextVisible] = useState(false);
    const [choicesVisible, setChoicesVisible] = useState(false);
    const { currentCharacter } = useGameStore();

    // 🎭 Animation d'apparition du texte
    useEffect(() => {
        const textTimer = setTimeout(() => setTextVisible(true), 500);
        const choicesTimer = setTimeout(() => setChoicesVisible(true), 2000);

        return () => {
            clearTimeout(textTimer);
            clearTimeout(choicesTimer);
        };
    }, [content.id]);

    // 🤖 Auto-advance si configuré
    useEffect(() => {
        if (content.autoAdvance) {
            const timer = setTimeout(() => {
                onChoiceSelect('auto', content.autoAdvance!.nextSceneId);
            }, content.autoAdvance.delay);

            return () => clearTimeout(timer);
        }
    }, [content, onChoiceSelect]);

    // 🎯 Filtrer les choix selon les requirements
    const availableChoices = content.choices?.filter(choice => {
        if (!choice.requirements) return true;

        // Vérifier le personnage
        if (choice.requirements.character && currentCharacter) {
            if (!choice.requirements.characters?.includes(currentCharacter.id)) {
                return false;
            }
        }
        // TODO: Ajouter vérification des flags et items
        return true;
    }) || [];

    return (
        <motion.div
            className={`relative min-h-screen flex flex-col ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* 🎵 Gestionnaire Audio */}
            <AudioManager
                backgroundMusic={content.backgroundMusic}
                soundEffect={content.soundEffect}
            />

            {/* 🖼️ Image de fond */}
            {content.backgroundImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(/assets/images/backgrounds/${content.backgroundImage})`,
                    }}    
                >
                    {/* Overlay sombre pour lisibilité */}
                    <div className="absolute inset-0 bg-black/40" />
                </div>
            )}
            
            {/* 📝 Contenu principal */}
            <div className="relative z-10 flex flex-col justify-center items-center p-6 flex-1">
                {/* 🏷️ Titre optionnel */}
                {content.title && (
                    <motion.h1
                        className="text-2xl md:text-4xl font-bold text-amber-100 mb-6 text-center"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {content.title}
                    </motion.h1>
                )}

                {/* 📖 Texte narratif */}
                <motion.div
                    className="max-w-4xl mx-auto mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: textVisible ? 1 : 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="bg-black/60 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-amber-700/50">
                        <p className="text-amber-50 text-lg md:text-xl leading-relaxed text-center">
                            {content.text}
                        </p>
                    </div>
                </motion.div>

                {/* 🎯 Choix disponibles */}
                {availableChoices.length > 0 && (
                    <motion.div
                        className="flex flex-col md:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: choicesVisible ? 1 : 0,
                            y: choicesVisible ? 0 : 20
                        }}
                        transition={{ duration: 0.6 }}
                    >
                        {availableChoices.map((choice) => (
                            <ChoiceButton
                                key={choice.id}
                                choice={choice}
                                onClick={() => onChoiceSelect(choice.id, choice.nextSceneId)}
                                className="min-w-48"
                            />
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};