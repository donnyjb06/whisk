import type { Recipe } from "@/types/Recipe";

const MOTION_DELAY = 0.15;
const SLIDE_IN_INITIAL = { x: -10, opacity: 0 };
const SLIDE_IN_ANIMATE = { x: 0, opacity: 1 };
const HF_INFERENCE_API_KEY = import.meta.env.HF_INFERENCE_API_KEY;
const MINIMUM_INGREDIENTS = 4;

const SYSTEM_PROMPT: string = `You are an AI recipe generator. Your task is to return a recipe in valid JSON format based on the provided parameters.  
The output must strictly follow this structure (no extra text or formatting):  

{
  "title": string,
  "ingredients": [string], // Seperate dry and wet ingredients, put the dry ingredients first and wet ingredients after those. Do not include any list styles such as "1. 2. 3." or discs.
  "instructions": [string],  // Must be in logical cooking order and cannot contain bullet points or any list styles for instance "1. 2. 3." or discs.
  "difficulty": "Easy" | "Medium" | "Hard",
  "cookTime": number // in minutes
}

### Rules:
1. Always base the recipe primarily on the provided ingredients.  
2. If "usePantry" = true, include ingredients from the saved pantry when relevant.  
3. If no pantry is provided, assume "usePantry" = false.  
4. If "allowExtras" is not provided, assume "allowExtras" = true.  
5. If "allowExtras" = false:  
   - Only use the provided ingredients (plus pantry if allowed).  
   - If a realistic recipe isn't possible, simplify to what's available.  
   - If no valid recipe can be made, return:  
     {
       "message": "No valid recipe available."
     }
6. If "allowExtras" = true, you may add minimal common ingredients (e.g., salt, pepper, oil, water) to make the recipe functional.  
7. Instructions must always be clear, step-by-step, and in correct cooking order.  
8. Difficulty is determined by:  
   - Easy: ≤ 5 steps, very simple techniques  
   - Medium: 6–10 steps, moderate techniques  
   - Hard: > 10 steps or advanced techniques  
9. cookTime must be a realistic integer value in minutes.  

### Parameters:
- ingredients: [array of strings]  
- usePantry: boolean (default = false if pantry not provided)  
- allowExtras: boolean (default = true if not provided)  
- pantry: [array of strings] (optional, only if usePantry = true)  

### Output:
Return only the JSON object. No explanations, no prose, no markdown.
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

export {
	MOTION_DELAY,
	SLIDE_IN_ANIMATE,
	SLIDE_IN_INITIAL,
	HF_INFERENCE_API_KEY,
	SYSTEM_PROMPT,
	MINIMUM_INGREDIENTS,
	MOCK_RECIPE,
};
