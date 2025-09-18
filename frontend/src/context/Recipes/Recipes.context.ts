import type { RecipesContextType } from "@/types/Recipe";
import { createContext } from "react";

export const RecipesContext = createContext<null | RecipesContextType>(null);
