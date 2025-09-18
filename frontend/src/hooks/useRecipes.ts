import { RecipesContext } from "@/context/Recipes/Recipes.context";
import { useContext } from "react";

export const useRecipes = () => {
  const context = useContext(RecipesContext);

  if (!context) {
    throw new Error("useRecipes must be used within a RecipesProvider component");
  }
  
  return context
}