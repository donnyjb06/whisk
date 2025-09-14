import type { Difficulty } from "@/types/Recipe";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface DifficultyRadioGroupProps {
	difficulty: Difficulty;
	setDifficulty:
		| React.Dispatch<React.SetStateAction<Difficulty>>
		| ((value: Difficulty) => void);
}

const DifficultyRadioGroup = ({
	difficulty,
	setDifficulty,
}: DifficultyRadioGroupProps) => {
	return (
		<Label className="button-text flex flex-col items-start">
			Difficulty
			<RadioGroup
				value={difficulty}
				onValueChange={(value: Difficulty) => setDifficulty(value)}
			>
				<Label className="button-text font-light">
					<RadioGroupItem value="Easy" />
					Easy
				</Label>
				<Label className="button-text font-light">
					<RadioGroupItem value="Medium" />
					Medium
				</Label>
				<Label className="button-text font-light">
					<RadioGroupItem value="Hard" />
					Hard
				</Label>
			</RadioGroup>
		</Label>
	);
};

export default DifficultyRadioGroup;
