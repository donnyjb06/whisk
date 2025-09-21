import type { ChildrenProps } from "@/types/ui";
import { RecipesContext } from "./Recipes.context";
import type { Recipe, RecipePreferences } from "@/types/Recipe";
import { useEffect, useRef, useState } from "react";
import { generateRecipe } from "@/services/gemini/generateRecipe";
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MOCK_RECIPES } from "@/lib/constants";
import { useModal } from "@/hooks/useModal";

const RecipesProvider = ({ children }: ChildrenProps) => {
	const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const recipeIdsRef = useRef<string[]>([]);
	const hasRunRef = useRef<boolean>(false);
	const { setModalIsOpen } = useModal();

	useEffect(() => {
		if (hasRunRef.current) return;

		hasRunRef.current = true;
		const recipeIds = JSON.parse(localStorage.getItem("recipeIds") ?? "[]");
		recipeIdsRef.current = recipeIds;

		if (recipeIdsRef.current.length === 0) return;
		/* 		const mock = MOCK_RECIPES.map((recipe) => {
			localStorage.setItem(recipe._id, JSON.stringify(recipe));
			return recipe._id;
		});
		localStorage.setItem("recipeIds", JSON.stringify(mock)) */ const recipes =
			recipeIdsRef.current.map((id) => {
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
				throw new Error("You must have at least 4 ingredients")
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
				console.error(recipe.error)
				throw new Error(recipe.error);
			}

			recipeIdsRef.current.push(recipe._id);
			localStorage.setItem("recipeIds", JSON.stringify(recipeIdsRef.current));
			localStorage.setItem(recipe._id, JSON.stringify(recipe));
			setCurrentRecipe(recipe);
			setRecipes((prevRecipes) => [...prevRecipes, recipe]);
			setModalIsOpen("recipe");
			return recipe
		} catch (error) {
			if (error instanceof Error) {
				console.error(error.message);
				throw error
			}

			throw new Error("An unknown error has occured. Please try again!")
		}
	};

	const deleteRecipe = (_id: string) => {
		recipeIdsRef.current = recipeIdsRef.current?.filter((id) => id !== _id);
		localStorage.removeItem(_id);
		localStorage.setItem("recipeIds", JSON.stringify(recipeIdsRef.current));

		setRecipes((prevRecipes) =>
			prevRecipes.filter((recipe) => recipe._id !== _id)
		);
	};
	
	const showRecipeModal = (recipe: Recipe) => {
		setCurrentRecipe(recipe);
		setModalIsOpen("recipe");
	}

	return (
		<RecipesContext.Provider
			value={{ currentRecipe, showRecipeModal, recipes, addRecipe, deleteRecipe }}
		>
			{children}
		</RecipesContext.Provider>
	);
};

export default RecipesProvider;
