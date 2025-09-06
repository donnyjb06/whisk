import { motion } from "motion/react";
import { getMotionProps } from "@/lib/utils";
import { TourProvider, TourStep, TourTrigger } from "./GuidedTour";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { CircleQuestionMark } from "lucide-react";
import { Button } from "./ui/Button";
import { useDemo } from "@/hooks/useDemo";
import { TagsInput } from "./TagsInput";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import DifficultyRadioGroup from "./DifficultyRadioGroup";

const DemoSection = () => {
	const {
		allowExtras,
		setAllowExtras,
		onTourComplete,
		handleSubmit,
		handleReset,
		setIngredients,
		cookTimeHours,
		cookTimeMinutes,
		recipe,
		addRecipeTourStep,
		addIngredientsTourStep,
		ingredients,
		recipeDivRef,
		difficulty,
		setDifficulty,
	} = useDemo();

	return (
		<section className="pb-10 lg:pb-16 px-6">
			<TourProvider onTourComplete={onTourComplete} onTourSkip={onTourComplete}>
				<div>
					<div className="flex gap-1 items-center">
						<h2 className="heading2">Try it out</h2>
						<Tooltip>
							<TooltipTrigger>
								<TourTrigger>
									<Button size="icon" variant="ghost">
										<CircleQuestionMark className="text-primary w-[1.2rem] h-[1.2rem]" />
									</Button>
								</TourTrigger>
							</TooltipTrigger>
							<TooltipContent>Take a guided tour</TooltipContent>
						</Tooltip>
					</div>
					<p className="text-muted bodytext mb-8 lg:mb-12">
						Enter your ingredients and watch the AI cook up a recipe just for
						you.
					</p>
				</div>
				<div className="flex flex-col  gap-6">
					<TourStep
						id="show-recipe"
						title="Get your recipe"
						content="Congratulations! You now have your recipe!"
						order={6}
						position="right"
						onStepEnter={addRecipeTourStep}
					>
						<div
							className="flex justify-start items-center border-border border rounded-2xl p-6"
							ref={recipeDivRef}
						>
							{recipe ? (
								<div className="flex flex-col gap-12 ">
									<div className="flex flex-col gap-1">
										<motion.h4
											{...getMotionProps()}
											className="heading4 text-primary"
										>
											{recipe.title}
										</motion.h4>
										<motion.p
											{...getMotionProps()}
											className="text-muted buttontext"
										>{`Difficulty: ${recipe.difficulty}`}</motion.p>
										<motion.p
											{...getMotionProps()}
											className="buttontext text-muted"
										>
											Cook Time:{" "}
											{cookTimeHours
												? `${cookTimeHours} hrs ${cookTimeMinutes} mins`
												: `${cookTimeMinutes} mins`}
										</motion.p>
									</div>
									<div className="flex flex-col gap-6">
										<div className="flex flex-col gap-1">
											<h5 className="heading5">Ingredients</h5>
											<ul className="list-inside list-disc">
												{recipe.ingredients.map((ingredient, i) => (
													<motion.li
														key={ingredient}
														className="bodytext"
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
												{recipe.instructions.map((instruction, i) => (
													<motion.li
														key={instruction}
														className="bodytext"
														{...getMotionProps(i)}
													>
														{instruction}
													</motion.li>
												))}
											</ul>
										</div>
									</div>
								</div>
							) : (
								<h3 className="heading4">
									No recipe yet - add your ingredients and let's get cooking!
								</h3>
							)}
						</div>
					</TourStep>
					<form
						onSubmit={handleSubmit}
						className="grow p-6 rounded-2xl border border-border flex flex-col justify-between gap-6"
					>
						<TourStep
							id="enter-ingredients"
							title="Enter your ingredients"
							content="Type your ingredient and press enter to add it to your list"
							order={1}
							position="top"
							onStepEnter={addIngredientsTourStep}
						>
							<Label className="flex buttontext flex-col items-stretch">
								Ingredients
								<TagsInput
									value={ingredients}
									onValueChange={setIngredients}
									placeholder="Enter your Ingredients"
								/>
							</Label>
						</TourStep>
						<TourStep
							id="set-difficulty"
							title="Set your Recipe Difficulty"
							content="Recipe difficulty is determined by cook time and amount of steps included"
							order={2}
						>
							<DifficultyRadioGroup
								difficulty={difficulty}
								setDifficulty={setDifficulty}
							/>
						</TourStep>
						<TourStep
							id="allow-extras"
							title="Allow Extra Ingredients"
							content="If this is checked the AI will include a few common household ingredients not listed in your added ingredients"
							order={3}
							position="top"
						>
							<Label className="flex items-center buttontext">
								<Checkbox
									checked={allowExtras}
									onCheckedChange={(value) => setAllowExtras(value as boolean)}
								/>
								Allow extra ingredients
							</Label>
						</TourStep>
						<div className="flex gap-2 self-stretch flex-col md:flex-row ">
							<TourStep
								id="generate-recipe"
								title="Generate your Recipe"
								content="After entering your ingredients, click this button to generate your recipe!"
								order={5}
								position="top"
							>
								<Button type="submit" className="buttontext grow w-full">
									Generate Recipe
								</Button>
							</TourStep>
							<TourStep
								id="reset-ingredients"
								title="Reset your ingredients"
								content="Press this button to empty your list of ingredients."
								order={4}
								position="top"
							>
								<Button
									disabled={ingredients.length === 0}
									onClick={handleReset}
									type="reset"
									className="buttontext w-full grow bg-foreground hover:bg-muted text-background disabled:bg-card-foreground"
								>
									Reset Ingredients
								</Button>
							</TourStep>
						</div>
					</form>
				</div>
			</TourProvider>
		</section>
	);
};

export default DemoSection;
