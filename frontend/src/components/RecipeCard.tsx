import type { Recipe } from "@/types/Recipe";
import { Button } from "./ui/Button";
import { ChevronRight, Trash2 } from "lucide-react";
import { useRecipes } from "@/hooks/useRecipes";
import { motion } from "motion/react";

interface RecipeCardProps {
	recipe: Recipe;
}

const MAX_LISTED_INGREDIENTS = 5;
const DIFFICULTY_COLORS = {
	Easy: "text-easy",
	Medium: "text-medium",
	Hard: "text-hard",
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
	const hours = recipe && Math.floor((recipe.cookTime as number) / 60);
	const minutes = recipe && recipe?.cookTime % 60;
	const { deleteRecipe } = useRecipes();
	const extraIngredientsAmount =
		recipe.ingredients.length - MAX_LISTED_INGREDIENTS;
	const difficultyColor = DIFFICULTY_COLORS[recipe.difficulty];

	return (
		<motion.div
			className="flex flex-col px-2 py-2 rounded-md bg-accent text-accent-foreground cursor-pointer justify-between group min-h-[300px]"
			key={recipe._id}
			layout
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{
				duration: 0.25,
				layout: {
					type: "spring",
					stiffness: 300,
					damping: 25,
				},
			}}
		>
			{" "}
			<div
				className={`px-3 py-6 bg-card rounded-sm grow group-hover:scale-[1.01] transition-transform duration-200`}
			>
				{" "}
				<div className="flex flex-col gap-1">
					{" "}
					<h5 className="heading6 font-bold text-primary">
						{recipe.title}
					</h5>{" "}
					<p className="buttontext text-card-foreground">
						{" "}
						Cook Time:{" "}
						{hours
							? `${hours} hr${hours > 1 ? "s" : ""} ${
									minutes ? `${minutes} mins` : ""
							  }`
							: `${minutes} mins`}
					</p>
					<p className="buttontext text-card-foreground">
						Difficulty:{" "}
						<span className={difficultyColor}>{recipe.difficulty}</span>
					</p>
					<ul className="flex gap-2 flex-wrap mt-3">
						{recipe.ingredients.map((ingredient, i) => {
							if (i > MAX_LISTED_INGREDIENTS) return;
							const isPastMaxListedAmount = i === MAX_LISTED_INGREDIENTS;

							return (
								<li
									className="bg-background px-3 py-2 text-xs text-foreground rounded-xl"
									key={ingredient}
								>
									{isPastMaxListedAmount
										? `+${extraIngredientsAmount}`
										: ingredient}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
			<div className="px-2 py-2 flex items-center  justify-between">
				<button className="flex gap-1 items-center buttontext">
					View{" "}
					<ChevronRight className="group-hover:translate-x-1 transition-transform duration-300 w-[1rem] h-[1rem]" />
				</button>
				<Button
					variant="outline"
					size="icon"
					onClick={() => deleteRecipe(recipe._id)}
				>
					<Trash2 />
				</Button>
			</div>
		</motion.div>
	);
};

export default RecipeCard;
