import type { Difficulty } from "./Recipe";

interface PromptInput {
	ingredients: string[];
	usePantry?: boolean;
	allowExtras: boolean;
	pantry?: string[];
	difficulty: Difficulty;
}

export type { PromptInput };
