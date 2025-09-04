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

export type { Recipe };
