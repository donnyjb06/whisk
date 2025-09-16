import type { Recipe } from "@/types/Recipe";
const MOTION_DELAY = 0.15;
const SLIDE_IN_INITIAL = { x: -10, opacity: 0 };
const SLIDE_IN_ANIMATE = { x: 0, opacity: 1 };
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const SERPAPI_API_KEY = import.meta.env.VITE_SERPAPI_API_KEY;
const MINIMUM_INGREDIENTS = 4;
	
const MOCK_PANTRY: string[] = [
	"eggs",
	"milk",
	"salt",
	"black pepper",
	"chicken broth",
	"beef broth"
]

const MOCK_RECIPES: Recipe[] = [
	{
		_id: "64f1c3a7b9e2a9f5c0d11111",
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
	},
	{
		_id: "64f1c3a7b9e2a9f5c0d12222",
		title: "Chicken Tikka Masala",
		ingredients: [
			"500g chicken breast, cubed",
			"150g yogurt",
			"2 tbsp tikka masala paste",
			"1 onion, diced",
			"2 cloves garlic, minced",
			"200ml cream",
			"1 tbsp butter",
			"1 tsp cumin",
			"Fresh cilantro",
		],
		instructions: [
			"Marinate chicken in yogurt and tikka masala paste for at least 1 hour.",
			"Cook chicken in a pan until golden.",
			"In a separate pan, sauté onion and garlic with butter.",
			"Add cumin and stir in cream.",
			"Combine with chicken and simmer for 15 minutes.",
			"Garnish with cilantro before serving.",
		],
		difficulty: "Hard",
		cookTime: 180,
		createdBy: "64f1b2a6a9e2d5c0d0e67891",
		createdAt: "2025-09-05T10:00:00Z",
	},
	{
		_id: "64f1c3a7b9e2a9f5c0d13333",
		title: "Vegetable Stir Fry",
		ingredients: [
			"200g broccoli florets",
			"1 red bell pepper, sliced",
			"1 carrot, julienned",
			"100g snow peas",
			"2 tbsp soy sauce",
			"1 tbsp sesame oil",
			"2 cloves garlic, minced",
			"1 tsp ginger, grated",
			"Sesame seeds",
		],
		instructions: [
			"Heat sesame oil in a wok.",
			"Add garlic and ginger, sauté until fragrant.",
			"Add vegetables and stir fry for 5–7 minutes.",
			"Pour in soy sauce and toss.",
			"Sprinkle sesame seeds before serving.",
		],
		difficulty: "Easy",
		cookTime: 90,
		createdBy: "64f1b2a6a9e2d5c0d0e67892",
		createdAt: "2025-09-05T12:30:00Z",
	},
	{
		_id: "64f1c3a7b9e2a9f5c0d14444",
		title: "Beef Tacos",
		ingredients: [
			"200g ground beef",
			"1 onion, chopped",
			"1 packet taco seasoning",
			"6 taco shells",
			"50g shredded lettuce",
			"50g cheddar cheese",
			"Salsa",
			"Sour cream",
		],
		instructions: [
			"Cook beef with onion until browned.",
			"Add taco seasoning and simmer for 5 minutes.",
			"Fill taco shells with beef mixture.",
			"Top with lettuce, cheese, salsa, and sour cream.",
		],
		difficulty: "Easy",
		cookTime: 60,
		createdBy: "64f1b2a6a9e2d5c0d0e67893",
		createdAt: "2025-09-05T14:00:00Z",
	},
	{
		_id: "64f1c3a7b9e2a9f5c0d15555",
		title: "Margherita Pizza",
		ingredients: [
			"200g pizza dough",
			"100g mozzarella cheese",
			"150g tomato sauce",
			"Fresh basil leaves",
			"2 tbsp olive oil",
			"1 tsp oregano",
		],
		instructions: [
			"Preheat oven to 220°C.",
			"Roll out pizza dough and spread tomato sauce.",
			"Top with mozzarella and basil.",
			"Drizzle with olive oil and sprinkle oregano.",
			"Bake for 12–15 minutes until golden.",
		],
		difficulty: "Medium",
		cookTime: 110,
		createdBy: "64f1b2a6a9e2d5c0d0e67894",
		createdAt: "2025-09-06T09:00:00Z",
	},
	{
		_id: "64f1c3a7b9e2a9f5c0d16666",
		title: "Pancakes with Maple Syrup",
		ingredients: [
			"200g flour",
			"2 tbsp sugar",
			"1 tsp baking powder",
			"1 egg",
			"250ml milk",
			"50g butter, melted",
			"Maple syrup",
		],
		instructions: [
			"Mix flour, sugar, and baking powder in a bowl.",
			"Whisk in egg, milk, and melted butter.",
			"Heat a non-stick pan and pour batter.",
			"Cook until bubbles form, flip and cook until golden.",
			"Serve with maple syrup.",
		],
		difficulty: "Easy",
		cookTime: 40,
		createdBy: "64f1b2a6a9e2d5c0d0e67895",
		createdAt: "2025-09-06T10:30:00Z",
	},
	{
		_id: "64f1c3a7b9e2a9f5c0d17777",
		title: "Shrimp Fried Rice",
		ingredients: [
			"200g shrimp, peeled",
			"2 cups cooked rice",
			"2 eggs, beaten",
			"1 carrot, diced",
			"2 tbsp soy sauce",
			"1 tbsp sesame oil",
			"2 green onions, sliced",
		],
		instructions: [
			"Heat sesame oil in a wok.",
			"Scramble eggs, remove, and set aside.",
			"Add shrimp and carrot, stir fry until shrimp is pink.",
			"Add rice and soy sauce, stir well.",
			"Mix in eggs and green onions.",
		],
		difficulty: "Medium",
		cookTime: 70,
		createdBy: "64f1b2a6a9e2d5c0d0e67896",
		createdAt: "2025-09-06T12:00:00Z",
	},
	{
		_id: "64f1c3a7b9e2a9f5c0d18888",
		title: "Greek Salad",
		ingredients: [
			"2 cucumbers, diced",
			"2 tomatoes, chopped",
			"1 red onion, sliced",
			"100g feta cheese",
			"50g black olives",
			"2 tbsp olive oil",
			"1 tsp oregano",
		],
		instructions: [
			"Combine cucumbers, tomatoes, onion, and olives in a bowl.",
			"Crumble feta over the salad.",
			"Drizzle with olive oil and sprinkle oregano.",
			"Toss gently and serve fresh.",
		],
		difficulty: "Easy",
		cookTime: 20,
		createdBy: "64f1b2a6a9e2d5c0d0e67897",
		createdAt: "2025-09-06T13:30:00Z",
	},
	{
		_id: "64f1c3a7b9e2a9f5c0d19999",
		title: "Lemon Garlic Salmon",
		ingredients: [
			"2 salmon fillets",
			"2 tbsp olive oil",
			"2 cloves garlic, minced",
			"1 lemon, sliced",
			"1 tsp salt",
			"1/2 tsp black pepper",
			"Fresh dill",
		],
		instructions: [
			"Preheat oven to 200°C.",
			"Place salmon on a baking sheet.",
			"Rub with olive oil, garlic, salt, and pepper.",
			"Top with lemon slices and dill.",
			"Bake for 15–20 minutes until cooked through.",
		],
		difficulty: "Medium",
		cookTime: 90,
		createdBy: "64f1b2a6a9e2d5c0d0e67898",
		createdAt: "2025-09-07T08:00:00Z",
	},
	{
		_id: "64f1c3a7b9e2a9f5c0d20000",
		title: "Chocolate Chip Cookies",
		ingredients: [
			"200g flour",
			"100g butter",
			"100g sugar",
			"1 egg",
			"1 tsp vanilla extract",
			"1/2 tsp baking soda",
			"150g chocolate chips",
		],
		instructions: [
			"Preheat oven to 180°C.",
			"Cream butter and sugar together.",
			"Add egg and vanilla extract, mix well.",
			"Stir in flour and baking soda.",
			"Fold in chocolate chips.",
			"Scoop onto baking sheet and bake for 10–12 minutes.",
		],
		difficulty: "Easy",
		cookTime: 50,
		createdBy: "64f1b2a6a9e2d5c0d0e67899",
		createdAt: "2025-09-07T09:30:00Z",
	},
];

const SYSTEM_PROMPT: string = `You are an AI recipe generator.  
Your ONLY job is to output a recipe in valid JSON, based on the provided user parameters.  

### Output format:
Return **only** a JSON object, no explanations, no markdown, no prose.  

{
  "title": string,
  "ingredients": [string], // Separate dry and wet ingredients, dry first then wet. No list styles (1., 2., •). Make sure to add the quantity of each ingredient as well
  "instructions": [string], // Logical cooking order, no numbering or bullet points.
	"difficulty": "Easy" | "Medium" | "Hard" 
  "cookTime": number // in minutes
}

### Rules:
- Difficulty determines the amount of steps(instructions) in the recipe.
- Before attempting to generate a recipe, first check if the ingredients form a plausible, edible dish.  
- If they do not form a plausible dish, immediately return: {"error": "No valid recipe available."}.  
- If you cannot find a recipe that matches the ingredients and the difficulty passed in then it should be treated as no valid recipe.
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
7. cookTime must be realistic integer minutes.  

### ADDITIONAL CONSTRAINTS:
- If the provided ingredients do not form a plausible dish, do not attempt to generate a recipe. Return only the error object.  
- Never combine ingredients in ways that are obviously non-culinary or unsafe.  
- Ensure the recipe would be edible and follow normal cooking logic.  

### DIFFICULTY LEVELS (STRICT):
- Easy difficulty: recipe must have 1, 2, 3, 4, or 5 instructions only
- Medium difficulty: recipe must have 6, 7, 8, 9, or 10 instructions only
- Hard difficulty: recipe must have 11 or more instructions

### IMPORTANT:
- Do not add any surrounding text.  
- Do not include markdown formatting (like \`\`\`).  
- Do not roleplay or explain.  
- Output exactly one JSON object per request.  

### FINAL VALIDATION (MANDATORY):
- Count the number of instructions.
- If the count does not exactly match the allowed range for the requested difficulty:
  - Do NOT output the recipe.
  - Instead, return exactly: {"error": "No valid recipe available."}
`;

const DEMO_RECIPE: Recipe = {
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

const AI_MODEL = "gemini-2.5-flash-lite";

export {
	MOCK_PANTRY,
	MOTION_DELAY,
	AI_MODEL,
	SLIDE_IN_ANIMATE,
	SLIDE_IN_INITIAL,
	GEMINI_API_KEY,
	SYSTEM_PROMPT,
	MINIMUM_INGREDIENTS,
	DEMO_RECIPE,
	SERPAPI_API_KEY,
	MOCK_RECIPES,
};
