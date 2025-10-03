import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserData } from "@/hooks/useUserData";
import { X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

const Pantry = () => {
	const { deleteIngredient, pantry, addIngredientToPantry } = useUserData();
	const [newIngredient, setNewIngredient] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);

		try {
			addIngredientToPantry(newIngredient);
			setNewIngredient("");
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
				return;
			}
			toast.error("An unexpected error has occured");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="self-stretch grow flex flex-col gap-8">
			<form className="flex flex-col gap-6" onSubmit={handleSubmit}>
				<Label className="flex buttontext flex-col items-stretch">
					Add Ingredient
					<Input
						placeholder="Chicken"
						value={newIngredient}
						onChange={(e) => setNewIngredient(e.target.value)}
						required
					/>
				</Label>
				<Button type="submit" disabled={loading}>
					Add Ingredient
				</Button>
			</form>
			{pantry.length > 0 ? (
				<div className="flex flex-wrap gap-4">
					{pantry.map((ingredient) => (
						<div className="flex items-center border border-border py-2 px-4 gap-2 rounded-md">
							<p className="buttontext capitalize">{ingredient}</p>

							<button
								type="button"
								onClick={() => deleteIngredient(ingredient)}
								className="flex items-center group"
							>
								<X className="w-[1.2rem] h-[1.2rem] group-hover:scale-115 transition-transform duration-200" />
							</button>
						</div>
					))}
				</div>
			) : (
				<h2 className="heading2">
					You currently don't have any ingredients in your pantry
				</h2>
			)}
		</div>
	);
};

export default Pantry;
