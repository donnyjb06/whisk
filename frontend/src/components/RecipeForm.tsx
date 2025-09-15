import type { Difficulty, RecipePreferences } from "@/types/Recipe";
import PantrySelect from "./PantrySelect";
import React from "react";
import { Label } from "./ui/label";
import { TagsInput } from "./TagsInput";
import DifficultyRadioGroup from "./DifficultyRadioGroup";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner";
import { motion } from "motion/react";

interface RecipeFormProps {
	recipePreferences: RecipePreferences;
	setRecipePreferences: React.Dispatch<React.SetStateAction<RecipePreferences>>;
}

const RecipeForm = ({
	recipePreferences,
	setRecipePreferences,
}: RecipeFormProps) => {
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

	return (
		<motion.form
			layout
			layoutDependency={recipePreferences.allowPantry}
			transition={{duration: 0.2, ease: "easeIn"}}
			className="grow p-6 rounded-2xl border border-border flex flex-col justify-between gap-6"
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
		</motion.form>
	);
};

export default RecipeForm;
