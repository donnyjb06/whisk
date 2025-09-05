import type { Recipe } from "@/types/Recipe";

const MOTION_DELAY = 0.15;
const SLIDE_IN_INITIAL = { x: -10, opacity: 0 };
const SLIDE_IN_ANIMATE = { x: 0, opacity: 1 };
const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY;
const MINIMUM_INGREDIENTS = 4;

const SYSTEM_PROMPT: string = `You are an AI recipe generator.  
Your ONLY job is to output a recipe in valid JSON, based on the provided user parameters.  

### Output format:
Return **only** a JSON object, no explanations, no markdown, no prose.  

{
  "title": string,
  "ingredients": [string], // Separate dry and wet ingredients, dry first then wet. No list styles (1., 2., •).
  "instructions": [string], // Logical cooking order, no numbering or bullet points.
  "difficulty": "Easy" | "Medium" | "Hard",
  "cookTime": number // in minutes
}

### Rules:
- Before attempting to generate a recipe, first check if the ingredients form a plausible, edible dish.  
- If they do not form a plausible dish, immediately return: {"error": "No valid recipe available."}.  
- Do not try to combine odd ingredients to make a “dish.”  
- Ingredients like only water, milk, soy sauce, food coloring, chemicals, or non-food items are always treated as no valid recipe.  
1. Always base the recipe primarily on the provided ingredients.  
2. If "usePantry" = true, include pantry ingredients when relevant. Otherwise assume false.  
3. If "allowExtras" is not provided, assume true.  
4. If "allowExtras" = false:  
   - Only use provided ingredients (plus pantry if allowed).  
   - Recipes must be real recipes not made up nonsense and must make sense.  
   - If there are non-edible ingredients in the list, treat as no valid recipe.  
   - If ingredients are too vague (e.g., only water, milk, salt, and pepper), treat as no valid recipe.  
   - DO NOT HALLUCINATE OR MAKE UP RECIPES. USE ONLY REAL RECIPES.  
   - If no valid recipe is possible, output: {"error": "No valid recipe available."} // Only return this object with the error property.  
5. If "allowExtras" = true, you may add minimal common items (salt, pepper, oil, water).  
6. Instructions must be clear, step-by-step, and ordered correctly.  
7. Difficulty:  
   - Easy: ≤ 5 steps  
   - Medium: 6-10 steps  
   - Hard: > 10 steps or advanced techniques  
8. cookTime must be realistic integer minutes.  

### ADDITIONAL CONSTRAINTS:
- If the provided ingredients do not form a plausible dish, do not attempt to generate a recipe. Return only the error object.  
- Never combine ingredients in ways that are obviously non-culinary or unsafe.  
- Ensure the recipe would be edible and follow normal cooking logic.  

### IMPORTANT:
- Do not add any surrounding text.  
- Do not include markdown formatting (like \`\`\`).  
- Do not roleplay or explain.  
- Output exactly one JSON object per request.  
`;

const MOCK_RECIPE: Recipe = {
	_id: "64f1c3a7b9e2a9f5c0d12345",
	title: "Classic Spaghetti Bolognese",
	ingredients: [
		"200g spaghetti",
		"150g ground beef",
		"1 onion, chopped",
		"2 cloves garlic, minced",
		"400g canned tomatoes",
		"2 tbsp olive oil",
		"1 tsp salt",
		"1/2 tsp black pepper",
		"Fresh basil leaves",
	],
	instructions: [
		"Cook spaghetti according to package instructions.",
		"Heat olive oil in a pan over medium heat.",
		"Add onion and garlic, sauté until softened.",
		"Add ground beef, cook until browned.",
		"Stir in canned tomatoes, salt, and pepper. Simmer for 15 minutes.",
		"Drain spaghetti and top with sauce.",
		"Garnish with fresh basil leaves before serving.",
	],
	difficulty: "Medium",
	cookTime: 130,
	createdBy: "64f1b2a6a9e2d5c0d0e67890",
	createdAt: "2025-09-04T19:00:00Z",
};

const AI_MODEL = "gemini-2.5-flash-lite"

export {
	MOTION_DELAY,
	AI_MODEL,
	SLIDE_IN_ANIMATE,
	SLIDE_IN_INITIAL,
	GEMINI_API_KEY,
	SYSTEM_PROMPT,
	MINIMUM_INGREDIENTS,
	MOCK_RECIPE,
};
