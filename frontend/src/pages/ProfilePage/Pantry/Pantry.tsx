import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserData } from "@/hooks/useUserData";
import { X } from "lucide-react";

const Pantry = () => {
	const { pantry } = useUserData();

	return (
		<div className="self-stretch grow flex flex-col gap-8">
			<form className="flex flex-col gap-6">
				<Label className="flex buttontext flex-col items-stretch">
					Add Ingredient
					<Input placeholder="Chicken" />
				</Label>
				<Button>Add Ingredient</Button>
			</form>
			{pantry.length > 0 ? (
				<div className="flex flex-wrap gap-4">
					{pantry.map((ingredient) => (
						<div className="flex items-center border border-border py-2 px-4 gap-2 rounded-md">
							<p>{ingredient}</p>

							<button type="button" className="flex items-center group">
								<X className="w-[1.2rem] h-[1.2rem] group-hover:scale-105" />
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
