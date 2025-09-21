import { useRecipes } from "@/hooks/useRecipes";
import Modal from "./Modal";
import  { getMotionProps } from "@/lib/utils";
import { motion } from "motion/react";

const RecipeModal = () => {
	const { currentRecipe } = useRecipes();
	const hours = currentRecipe && Math.floor((currentRecipe.cookTime as number) / 60);
	const minutes = currentRecipe && currentRecipe?.cookTime % 60;
	return (
		<Modal name="recipe" className="max-h-full overflow-y-scroll">
			<div className="flex flex-col gap-12 ">
				<div className="flex flex-col gap-1">
					<motion.h4 {...getMotionProps()} className="heading5 text-primary">
						{currentRecipe?.title}
					</motion.h4>
					<motion.p
						{...getMotionProps()}
						className="text-muted buttontext"
					>{`Difficulty: ${currentRecipe?.difficulty}`}</motion.p>
					<motion.p className="buttontext text-card-foreground">
						{" "}
						Cook Time:{" "}
						{hours
							? `${hours} hr${hours > 1 ? "s" : ""} ${
									minutes ? `${minutes} mins` : ""
							  }`
							: `${minutes} mins`}
					</motion.p>
				</div>
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-1">
						<h5 className="heading6">Ingredients</h5>
						<ul className="list-inside list-disc">
							{currentRecipe?.ingredients.map((ingredient, i) => (
								<motion.li
									key={ingredient}
									className="buttontext"
									{...getMotionProps(i)}
								>
									{ingredient}
								</motion.li>
							))}
						</ul>
					</div>
					<div className="flex flex-col gap-1">
						<h5 className="heading5">Instructions</h5>
						<ul className="list-inside list-decimal">
							{currentRecipe?.instructions.map((instruction, i) => (
								<motion.li
									key={instruction}
									className="buttontext"
									{...getMotionProps(i)}
								>
									{instruction}
								</motion.li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default RecipeModal;
