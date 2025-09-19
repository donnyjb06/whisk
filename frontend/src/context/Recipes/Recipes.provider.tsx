import type { ChildrenProps } from "@/types/ui";
import { RecipesContext } from "./Recipes.context";
import type { Recipe, RecipePreferences } from "@/types/Recipe";
import { useEffect, useRef, useState } from "react";
import { generateRecipe } from "@/services/gemini/generateRecipe";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const RecipesProvider = ({ children }: ChildrenProps) => {
	const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const recipeIdsRef = useRef<string[]>([]);
	const hasRunRef = useRef<boolean>(false);

	useEffect(() => {
		if (hasRunRef.current) return;

		hasRunRef.current = true;
		const recipeIds = JSON.parse(localStorage.getItem("recipeIds") ?? "[]");
		recipeIdsRef.current = recipeIds;

		if (recipeIdsRef.current.length === 0) return;

		const recipes = recipeIdsRef.current.map((id) => {
			const recipe = localStorage.getItem(id);
			if (recipe) return JSON.parse(recipe);
		});
		setRecipes(recipes);
	}, []);

	const addRecipe = async (preferences: RecipePreferences) => {
		try {
			const ingredients = preferences.allowPantry
				? preferences.ingredients.concat(
						preferences?.pantry?.selectedIngredients
				  )
				: preferences.ingredients;

			if (ingredients.length < 4) {
				toast.warning("You must have at least 4 ingredients");
				return;
			}

			const userInput = {
				ingredients,
				difficulty: preferences.difficulty,
				allowExtras: preferences.allowExtras,
			};

			const _id = uuidv4();
			const createdBy = uuidv4();
			const recipe = { ...(await generateRecipe(userInput)), _id, createdBy };
			if (recipe.error) {
				toast.error(recipe.error);
				console.error(recipe.raw);
				return;
			}

			recipeIdsRef.current.push(recipe._id);
			localStorage.setItem("recipeIds", JSON.stringify(recipeIdsRef.current));
			localStorage.setItem(recipe._id, JSON.stringify(recipe));
			setCurrentRecipe(recipe);
			setRecipes((prevRecipes) => [...prevRecipes, recipe]);
		} catch (error) {
			if (error instanceof Error) {
				toast.error("Error when generating recipe. Please try again!");
				console.error(error.message);
				return;
			}

			toast.error("An unknown error has occured. Please try again!");
			console.error(error);
		}
	};

	const deleteRecipe = (_id: string) => {
		recipeIdsRef.current = recipeIdsRef.current?.filter((id) => id !== _id);
		localStorage.removeItem(_id);
		localStorage.setItem("recipesId", JSON.stringify(recipeIdsRef.current));

		setRecipes((prevRecipes) =>
			prevRecipes.filter((recipe) => recipe._id !== _id)
		);
	};

	return (
		<RecipesContext.Provider
			value={{ currentRecipe, recipes, addRecipe, deleteRecipe }}
		>
			{children}
		</RecipesContext.Provider>
	);
};

export default RecipesProvider;
