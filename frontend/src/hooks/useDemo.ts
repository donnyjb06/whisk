import type { Recipe } from "@/types/Recipe";
import { useState, useRef, useEffect } from "react";
import { MINIMUM_INGREDIENTS, MOCK_RECIPE } from "@/lib/constants";
import { generateRecipe } from "@/services/huggingface/generateRecipe";
import { toast } from "sonner";

export const useDemo = () => {
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [allowExtras, setAllowExtras] = useState<boolean>(true);
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

	const handleClick = async () => {
		if (recipe) {
			setRecipe(null);
			return;
		}
		if (ingredients.length < MINIMUM_INGREDIENTS) {
			toast.warning("You must input at least 4 ingredients");
			return;
		}
		const userPrompt = { ingredients, allowExtras };
		const temp = await generateRecipe(userPrompt);
		console.log(temp);
		setRecipe(MOCK_RECIPE);
	};

	const handleReset = () => {
		setIngredients([]);
	};

	return {
		recipe,
		allowExtras,
		setAllowExtras,
		ingredients,
		handleReset,
		handleClick,
		onTourComplete,
		setIngredients,
		addIngredientsTourStep,
		addRecipeTourStep,
		cookTimeHours,
		cookTimeMinutes,
		recipeDivRef,
	};
};
