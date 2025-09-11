import type React from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
	theme: Theme | undefined;
	toggleTheme: () => void;
}

interface ModalContextType {
	modalIsOpen: string;
	setModalIsOpen: React.Dispatch<React.SetStateAction<string>>;
}

interface ChildrenProps {
  children: React.ReactNode
}

export type { Theme, ThemeContextType, ChildrenProps, ModalContextType };