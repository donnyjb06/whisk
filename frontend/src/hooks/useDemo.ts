import type { Recipe } from "@/types/Recipe";
import { useState, useRef, useEffect } from "react";
import { MINIMUM_INGREDIENTS, MOCK_RECIPE } from "@/lib/constants";
import { generateRecipe } from "@/services/huggingface/generateRecipe";
import { toast } from "sonner";

export const useDemo = () => {
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [recipe, setRecipe] = useState<Recipe | null>(null);

	const tourCompleteIngredients = useRef<string[] | null>(null);
	const tourCompleteRecipe = useRef<Recipe | null>(null);
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
		if (!tourCompleteIngredients.current || !tourCompleteRecipe) return;
		setIngredients(tourCompleteIngredients.current);
		setRecipe(tourCompleteRecipe.current);
	};

	const addRecipeTourStep = () => {
		tourCompleteRecipe.current = recipe;
		setRecipe(MOCK_RECIPE);
	};

	const addIngredientsTourStep = () => {
		tourCompleteIngredients.current = ingredients;
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

	const handleClick = async () => {
		if (ingredients.length < MINIMUM_INGREDIENTS) {
			toast.warning("You must input at least 4 ingredients");
			return;
		}
		if (recipe) {
			setRecipe(null);
			return;
		}
		const userPrompt = { ingredients };
		const temp = await generateRecipe(userPrompt);
		console.log(temp);
		setRecipe(MOCK_RECIPE);
	};

	const handleReset = () => {
		setIngredients([]);
	};

	return {
		recipe,
		ingredients,
		handleReset,
		handleClick,
		onTourComplete,
		setIngredients,
		addIngredientsTourStep,
		addRecipeTourStep,
		cookTimeHours,
		cookTimeMinutes,
		recipeDivRef
	};
};
