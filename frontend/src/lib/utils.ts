import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MOTION_DELAY, SLIDE_IN_ANIMATE, SLIDE_IN_INITIAL } from "./constants";

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

const getMotionProps = (delayMultiplier = 0) => {
	return {
		initial: SLIDE_IN_INITIAL,
		animate: SLIDE_IN_ANIMATE,
		transition: { duration: 0.3, delay: delayMultiplier * MOTION_DELAY },
	};
};

export { cn, getInitialTheme, getMotionProps };
