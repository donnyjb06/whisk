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

interface User {
	email: string;
	name: string;
	password: string;
}

interface UserDataContextType {
	currentUser: Omit<User, "password"> | null;
	pantry: string[];
	loginUser: ({ email, password }: Omit<User, "name">) => User;
	registerUser: ({ name, email, password }: User) => Omit<User, "password">;
	hydrated: boolean;
	editProfile: (userSettings: Partial<User>) => Omit<User, "password">
	logOutUser: () => void;
}

interface ChildrenProps {
	children: React.ReactNode;
}

export type {
	Theme,
	ThemeContextType,
	ChildrenProps,
	ModalContextType,
	UserDataContextType,
	User,
};
