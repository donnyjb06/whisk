import type { ThemeContextType } from "@/types/ui";
import { createContext } from "react";

export const ThemeContext = createContext<ThemeContextType | null>(null);