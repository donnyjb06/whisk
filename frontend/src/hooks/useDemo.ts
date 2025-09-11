import type { Recipe } from "@/types/Recipe";
import { useState, useRef, useEffect, type FormEvent } from "react";
import { MINIMUM_INGREDIENTS, MOCK_RECIPE } from "@/lib/constants";
import { toast } from "sonner";
import { generateRecipe } from "@/services/gemini/generateRecipe";

export const useDemo = () => {
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [allowExtras, setAllowExtras] = useState<boolean>(true);
	const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">(
		"Easy"
	);
	const [recipe, setRecipe] = useState<Recipe | null>(null);

	const tourCompleteSettings = useRef<{
		recipe: Recipe | null;
		ingredients: string[];
		allowExtras: boolean;
	}>({ ingredients: [], recipe: null, allowExtras: false });
	const recipeDivRef = useRef<HTMLDivElement>(null);

	const cookTimeHours = recipe && Math.floor((recipe.cookTime as number) / 60);
	const cookTimeMinutes = recipe && recipe?.cookTime % 60;

	useEffect(() => {
		if (!recipe) return;
		recipeDivRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}, [recipe]);

	const onTourComplete = () => {
		if (!tourCompleteSettings.current) return;
		setIngredients(tourCompleteSettings.current.ingredients);
		setRecipe(tourCompleteSettings.current.recipe);
		setAllowExtras(tourCompleteSettings.current.allowExtras);
	};

	const addRecipeTourStep = () => {
		if (!recipe) return;
		tourCompleteSettings.current.recipe = recipe;
		setRecipe(MOCK_RECIPE);
	};

	const addIngredientsTourStep = () => {
		tourCompleteSettings.current.ingredients = ingredients;
		setIngredients([
			"Spaghetti",
			"Ground Beef",
			"Garlic",
			"Olive Oil",
			"Black Pepper",
			"Basil Leaves",
			"Onions",
			"Salt",
			"Canned Tomatoes",
		]);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (recipe) {
			setRecipe(null);
			return;
		}

		if (ingredients.length < MINIMUM_INGREDIENTS) {
			toast.warning("You must input at least 4 ingredients");
			return;
		}

		setIsLoading(true);

		const userInput = { ingredients, allowExtras, difficulty };

		try {
			const recipe = await generateRecipe(userInput);
			if (recipe.error) {
				toast.error(recipe.error);
				console.error(recipe.raw);
				return;
			}

			setRecipe(recipe);
		} catch (error) {
			if (error instanceof Error) {
				toast.error("Hugging Face API Call failed");
				console.error(error.message);
				return;
			}

			toast.error("An unknown error has occured. Please try again!");
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleReset = () => {
		setIngredients([]);
	};

	return {
		isLoading,
		recipe,
		allowExtras,
		setAllowExtras,
		ingredients,
		handleReset,
		handleSubmit,
		onTourComplete,
		difficulty,
		setDifficulty,
		setIngredients,
		addIngredientsTourStep,
		addRecipeTourStep,
		cookTimeHours,
		cookTimeMinutes,
		recipeDivRef,
	};
};
