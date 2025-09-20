import { useRecipes } from "@/hooks/useRecipes";
import RecipeCard from "./RecipeCard";
import { AnimatePresence, motion } from "motion/react";

const RecipeGrid = () => {
	const { recipes } = useRecipes();
	return (
		<motion.div
			layout
			transition={{layout: { type: "spring", stiffness: 300, damping: 25}}}
			className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
		>
			<AnimatePresence>
				{recipes.map((recipe) => (
					<RecipeCard recipe={recipe} />
				))}
			</AnimatePresence>
		</motion.div>
	);
};

export default RecipeGrid;
