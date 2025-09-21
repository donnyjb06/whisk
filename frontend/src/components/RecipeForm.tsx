import type { Difficulty, RecipePreferences } from "@/types/Recipe";
import PantrySelect from "./PantrySelect";
import React, { useState, type FormEvent } from "react";
import { Label } from "./ui/label";
import { TagsInput } from "./TagsInput";
import DifficultyRadioGroup from "./DifficultyRadioGroup";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import { motion } from "motion/react";
import { useRecipes } from "@/hooks/useRecipes";
import { Button } from "./ui/Button";

interface RecipeFormProps {
	recipePreferences: RecipePreferences;
	setRecipePreferences: React.Dispatch<React.SetStateAction<RecipePreferences>>;
}

const RecipeForm = ({
	recipePreferences,
	setRecipePreferences,
}: RecipeFormProps) => {
	const { addRecipe } = useRecipes();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const toggleSelectedIngredient = (ingredient: string) => {
		setRecipePreferences((prevPreferences) => {
			const isActive =
				prevPreferences.pantry.selectedIngredients.includes(ingredient);

			return {
				...prevPreferences,
				pantry: {
					...prevPreferences.pantry,
					selectedIngredients: isActive
						? prevPreferences.pantry.selectedIngredients.filter(
								(selected) => selected !== ingredient
						  )
						: [...prevPreferences.pantry.selectedIngredients, ingredient],
				},
			};
		});
	};

	const handleReset = () => {
		setRecipePreferences((prevPreferences) => ({
			...prevPreferences,
			ingredients: [],
		}));
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setIsLoading(true);
		try {
			const recipe = await addRecipe(recipePreferences);
			if (!recipe) {
				toast.error("Something unusual occured. Please try again!");
			}
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
				console.error(error.message);
				return;
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<motion.form
			layout
			layoutDependency={recipePreferences.allowPantry}
			transition={{ duration: 0.2, ease: "easeIn" }}
			className="flex flex-col justify-between gap-6"
			onSubmit={handleSubmit}
		>
			<Label className="flex buttontext flex-col items-stretch">
				Ingredients
				<TagsInput
					value={recipePreferences.ingredients}
					onValueChange={(value) => {
						setRecipePreferences((prevPreferences) => ({
							...prevPreferences,
							ingredients: value,
						}));
					}}
					placeholder="Enter your Ingredients"
				/>
			</Label>
			<Label className="flex buttontext flex-col items-stretch">
				<DifficultyRadioGroup
					difficulty={recipePreferences.difficulty}
					setDifficulty={(value: Difficulty) => {
						setRecipePreferences((prevPreferences) => ({
							...prevPreferences,
							difficulty: value,
						}));
					}}
				/>
			</Label>
			<div className="flex flex-col gap-2 justify-end">
				<Label className="flex items-center buttontext">
					<Checkbox
						checked={recipePreferences.allowExtras}
						onCheckedChange={(value) => {
							setRecipePreferences((prevPreferences) => ({
								...prevPreferences,
								allowExtras: value as boolean,
							}));
						}}
					/>
					Allow extra ingredients
				</Label>
				<Label
					className="flex items-center buttontext"
					onClick={() => {
						if (!(recipePreferences.pantry.full.length < 1)) return;
						toast.warning(
							"You currently don't have any ingredients in your pantry."
						);
					}}
				>
					<Checkbox
						checked={recipePreferences.allowPantry}
						disabled={recipePreferences.pantry.full.length < 1}
						onCheckedChange={(value) => {
							setRecipePreferences((prevPreferences) => ({
								...prevPreferences,
								allowPantry: value as boolean,
							}));
						}}
					/>
					Include pantry ingredients
				</Label>
			</div>
			{recipePreferences.allowPantry && (
				<PantrySelect
					pantry={recipePreferences.pantry}
					toggleSelectedIngredient={toggleSelectedIngredient}
				/>
			)}
			<div className="flex gap-2 self-stretch flex-col md:flex-row ">
				<Button type="submit" className="buttontext grow" disabled={isLoading}>
					Generate Recipe
				</Button>
				<Button
					onClick={handleReset}
					disabled={recipePreferences.ingredients.length === 0}
					type="reset"
					className="buttontext  grow bg-foreground hover:bg-muted text-background disabled:bg-card-foreground"
				>
					Reset Ingredients
				</Button>
			</div>
		</motion.form>
	);
};

export default RecipeForm;
