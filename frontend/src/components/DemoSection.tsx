import { useEffect, useRef, useState } from "react";
import type { Recipe } from "@/types/Recipe";
import { TagsInput } from "@/components/TagsInput";
import { Button } from "./ui/Button";
import { motion } from "motion/react";
import { getMotionProps } from "@/lib/utils";
import { TourProvider, TourStep, TourTrigger } from "./GuidedTour";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { CircleQuestionMark } from "lucide-react";

const mockRecipe: Recipe = {
	_id: "64f1c3a7b9e2a9f5c0d12345",
	title: "Classic Spaghetti Bolognese",
	ingredients: [
		"200g spaghetti",
		"150g ground beef",
		"1 onion, chopped",
		"2 cloves garlic, minced",
		"400g canned tomatoes",
		"2 tbsp olive oil",
		"1 tsp salt",
		"1/2 tsp black pepper",
		"Fresh basil leaves",
	],
	instructions: [
		"Cook spaghetti according to package instructions.",
		"Heat olive oil in a pan over medium heat.",
		"Add onion and garlic, sauté until softened.",
		"Add ground beef, cook until browned.",
		"Stir in canned tomatoes, salt, and pepper. Simmer for 15 minutes.",
		"Drain spaghetti and top with sauce.",
		"Garnish with fresh basil leaves before serving.",
	],
	difficulty: "Medium",
	cookTime: 130,
	createdBy: "64f1b2a6a9e2d5c0d0e67890",
	createdAt: "2025-09-04T19:00:00Z",
};

const DemoSection = () => {
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const cookTimeHours = recipe && Math.floor((recipe.cookTime as number) / 60);
	const cookTimeMinutes = recipe && recipe?.cookTime % 60;
	const tourCompleteIngredients = useRef<string[] | null>(null)
	const tourCompleteRecipe = useRef<Recipe | null>(null)
	const recipeDivRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!recipe) return;
		recipeDivRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		})
	}, [recipe])

	const handleClick = () => {
		if (recipe) {
			setRecipe(null);
			return;
		}
		setRecipe(mockRecipe);
	};

	const handleReset = () => {
		setIngredients([]);
	};

	const onTourComplete = () => {
		if (!tourCompleteIngredients.current || !tourCompleteRecipe) return
		setIngredients(tourCompleteIngredients.current)
		setRecipe(tourCompleteRecipe.current);
	}

	const addRecipeTourStep = () => {
		tourCompleteRecipe.current = recipe;
		setRecipe(mockRecipe);
	}

	const addIngredientsTourStep = () => {
		tourCompleteIngredients.current = ingredients;
		setIngredients([
			"Spaghetti",
			"Ground Beef",
			"Garlic",
			"Olive Oil",
			"Black Pepper",
			"Basil Leaves",
			"Onions",
			"Salt",
			"Canned Tomatoes",
		]);
	};
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
						order={4}
						position="right"
						onStepEnter={addRecipeTourStep}
					>
						<div className="flex justify-start items-center border-border border rounded-2xl p-6" ref={recipeDivRef}>
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
					<div className="grow p-6 rounded-2xl border border-border flex flex-col justify-between gap-6">
						<TourStep
							id="enter-ingredients"
							title="Enter your ingredients"
							content="Type your ingredient and press enter to add it to your list"
							order={1}
							position="top"
							onStepEnter={addIngredientsTourStep}
						>
							<TagsInput
								value={ingredients}
								onValueChange={setIngredients}
								placeholder="Enter your Ingredients"
							/>
						</TourStep>
						<div className="flex gap-2 self-stretch flex-col md:flex-row ">
							<TourStep
								id="generate-recipe"
								title="Generate your Recipe"
								content="After entering your ingredients, click this button to generate your recipe!"
								order={3}
								position="top"
							>
								<Button onClick={handleClick} className="buttontext grow w-full">
									Generate Recipe
								</Button>
							</TourStep>
							<TourStep
								id="reset-ingredients"
								title="Reset your ingredients"
								content="Press this button to empty your list of ingredients."
								order={2}
								position="top"
							>
								<Button
									disabled={ingredients.length === 0}
									onClick={handleReset}
									className="buttontext w-full grow bg-foreground hover:bg-muted text-background disabled:bg-card-foreground"
								>
									Reset Ingredients
								</Button>
							</TourStep>
						</div>
					</div>
				</div>
			</TourProvider>
		</section>
	);
};

export default DemoSection;
