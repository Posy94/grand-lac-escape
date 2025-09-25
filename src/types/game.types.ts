export interface Character {
    id: string;
    name: string;
    avatar: string;
    description: string;
    stats: {
        energy: number;
        time: number;
        money: number;
    };
}

export interface Choice {
    id: string;
    label: string;
    description: string;
    cost: {
        energy?: number;
        time ?: number;
        money?: number;
    };
    consequences: string[];
    requirements?: {
        character?: string;
        minEnergy?: number;
        minMoney?: number;
    };
}

export interface Location {
    id: string;
    name: string;
    narratives: Record<string, string>;
    choices: Choice[];
}

export interface GameState {
    currentLocation: string;
    activeCharacter: string;
    characters: Record<string, Character>;
    gameFlags: Record<string, boolean>;
    timeElapsed: number;
}

export interface GameActions {
    setActiveCharacter: (characterId: string) => void;
    updateCharacterStats: (characterId: string, stats: Partial<Character['stats']>) => void;
    changeLocation: (locationId: string) => void;
    setGameFlag: (flag: string, value: boolean) => void;
    makeChoice: (choiceId: string) => void;
    resetGame: () => void;
}

export type GameStore = GameState & GameActions;