import type { ChildrenProps, Theme } from "@/types/ui";
import { ThemeContext } from "./Theme.context";
import { useEffect, useState } from "react";
import { getInitialTheme } from "@/lib/utils";

const ThemeProvider = ({ children }: ChildrenProps) => {
	const [theme, setTheme] = useState<Theme | undefined>();

	useEffect(() => {
		const initialTheme = getInitialTheme();
		setTheme(initialTheme);
	}, []);

	useEffect(() => {
		if (!theme) return;

		if (theme === "dark") {
			document.body.classList.add("dark");
		} else {
			document.body.classList.remove("dark");
		}

		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
	};

	if (!theme) return;

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
