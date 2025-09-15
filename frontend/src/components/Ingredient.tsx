interface IngredientProps {
	ingredient: string;
	isActive: boolean;
	toggleSelectedIngredient: (ingredient: string) => void;
}

const Ingredient = ({
	ingredient,
	isActive,
	toggleSelectedIngredient,
}: IngredientProps) => {
	return (
		<button
			type="button"
			onClick={() => toggleSelectedIngredient(ingredient)}
			className={`px-3 py-2 border border-border rounded-md buttontext ${
				isActive
					? "bg-primary"
					: "bg-secondary text-secondary-foreground cursor-pointer"
			} hover:bg-primary-emphasis transition-colors duration-200 shadow-md capitalize`}
		>
			{ingredient}
		</button>
	);
};

export default Ingredient;
