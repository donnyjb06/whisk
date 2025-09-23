import { useState } from "react";
import RecipeForm from "@/components/RecipeForm";
import type { RecipePreferences } from "@/types/Recipe";
import RecipeGrid from "@/components/RecipeGrid";
import { useUserData } from "@/hooks/useUserData";

const RecipesPage = () => {
	const { pantry } = useUserData();
	const [recipePreferences, setRecipePreferences] = useState<RecipePreferences>(
		{
			ingredients: [],
			allowExtras: false,
			allowPantry: false,
			difficulty: "Easy",
			pantry: {
				full: pantry,
				selectedIngredients: [],
			},
		}
	);

	return (
		<main className="overflow-hidden max-w-7xl mx-auto flex flex-col gap-6 p-6">
			<section className="grow p-6 rounded-2xl border border-border flex flex-col gap-8">
				<h1 className="heading1">Generate your recipe</h1>
				<RecipeForm
					recipePreferences={recipePreferences}
					setRecipePreferences={setRecipePreferences}
				/>
			</section>
			<section className="grow">
				<RecipeGrid />
			</section>
		</main>
	);
};

export default RecipesPage;
