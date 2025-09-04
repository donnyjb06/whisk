import { ThemeContext } from "@/context/Theme/Theme.context";
import { useContext } from "react";

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider component");
	}

	return context;
};
