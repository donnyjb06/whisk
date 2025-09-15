import Ingredient from "./Ingredient";

interface PantrySelectProps {
	pantry: { full: string[]; selectedIngredients: string[] };
	toggleSelectedIngredient: (ingredient: string) => void;
}

const PantrySelect = ({
	pantry,
	toggleSelectedIngredient,
}: PantrySelectProps) => {
	return (
		<div className="flex flex-col gap-2">
			<h5 className="heading5">Your Pantry</h5>
			<div className="flex flex-wrap gap-2">
			
				{pantry.full.map((ingredient) => (
					<Ingredient
						toggleSelectedIngredient={toggleSelectedIngredient}
						ingredient={ingredient}
						isActive={pantry.selectedIngredients.includes(ingredient)}
					/>
				))}
			</div>
		</div>
	);
};

export default PantrySelect;
