export interface NarrativeContent {
    id: string;
    title?: string;
    text: string;
    backgroundImage?: string;
    backgroundMusic?: string;
    soundEffect?: string;
    choices?: Choice[];
    autoAdvance?: {
        delay: number;
        nextSceneId: string;
    };
}

export interface Choice {
    id: string;
    text: string;
    nextSceneId: string;
    requirements?: {
        characters?: string[];
        flags?: Record<string, boolean>;
        items?: string[];
        stats?: Record<string, number>;
    };
}