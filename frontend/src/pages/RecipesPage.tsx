import { useState } from "react";
import RecipeForm from "@/components/RecipeForm";
import type { RecipePreferences } from "@/types/Recipe";

const RecipesPage = () => {
	const [recipePreferences, setRecipePreferences] = useState<RecipePreferences>(
		{
			ingredients: [],
			allowExtras: false,
			allowPantry: false,
			difficulty: "Easy",
			pantry: {
				full: [
					"chicken",
					"salt",
					"black pepper",
					"chicken broth",
					"eggs",
					"milk",
				],
				selectedIngredients: [],
			},
		}
	);

	return (
		<main className="overflow-hidden max-w-7xl mx-auto flex flex-col gap-6 p-6">
			<section>
				<RecipeForm
					recipePreferences={recipePreferences}
					setRecipePreferences={setRecipePreferences}
				/>
			</section>
		</main>
	);
};

export default RecipesPage;
