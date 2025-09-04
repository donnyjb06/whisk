import { useState } from "react"
import type { Recipe } from "@/types/Recipe"

const recipe: Recipe = {
  "_id": "64f1c3a7b9e2a9f5c0d12345",
  "title": "Classic Spaghetti Bolognese",
  "ingredients": [
    "200g spaghetti",
    "150g ground beef",
    "1 onion, chopped",
    "2 cloves garlic, minced",
    "400g canned tomatoes",
    "2 tbsp olive oil",
    "1 tsp salt",
    "1/2 tsp black pepper",
    "Fresh basil leaves"
  ],
  "instructions": [
    "Cook spaghetti according to package instructions.",
    "Heat olive oil in a pan over medium heat.",
    "Add onion and garlic, sauté until softened.",
    "Add ground beef, cook until browned.",
    "Stir in canned tomatoes, salt, and pepper. Simmer for 15 minutes.",
    "Drain spaghetti and top with sauce.",
    "Garnish with fresh basil leaves before serving."
  ],
  "difficulty": "Medium",
  "cookTime": 30,
  "createdBy": "64f1b2a6a9e2d5c0d0e67890",
  "createdAt": "2025-09-04T19:00:00Z"
}

const DemoSection = () => {
  const [ingredients, setIngredients] = useState<string[]>([])

  return (
  <section>

  </section>
  )
}

export default DemoSection
