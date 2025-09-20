import { useRecipes } from "@/hooks/useRecipes";
import RecipeCard from "./RecipeCard";

const RecipeGrid = () => {
	const { recipes } = useRecipes();
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{recipes.map((recipe) => (
				<RecipeCard recipe={recipe} />
			))}
		</div>
	);
};

export default RecipeGrid;
