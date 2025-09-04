type Theme = "light" | "dark";

interface ThemeContextType {
	theme: Theme | undefined;
	toggleTheme: () => void;
}

interface ChildrenProps {
  children: React.ReactNode
}

export type { Theme, ThemeContextType, ChildrenProps };
