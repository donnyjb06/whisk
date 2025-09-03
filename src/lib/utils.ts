import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const getInitialTheme = () => {
	const theme = localStorage.getItem("theme");
	if (theme === "dark" || theme === "light") return theme;

	const prefersDarkMode = window.matchMedia(
		"(prefers-color-scheme: dark)"
	).matches;
	return prefersDarkMode ? "dark" : "light";
};

export { cn, getInitialTheme };
