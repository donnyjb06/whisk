type Difficulty = "Easy" | "Medium" | "Hard";

interface Recipe {
	_id?: string;
	title: string;
	ingredients: string[];
	instructions: string[];
	difficulty: Difficulty;
	cookTime: number;
	createdBy: string;
	createdAt?: string;
}

interface RecipePreferences {
	ingredients: string[];
	allowPantry: boolean;
	allowExtras: boolean;
	difficulty: Difficulty;
	pantry: { full: string[]; selectedIngredients: string[] };
}

export type { Recipe, Difficulty, RecipePreferences };
