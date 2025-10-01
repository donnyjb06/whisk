import type { ChildrenProps, User } from "@/types/ui";
import { UserDataContext } from "./UserData.context";
import { useCallback, useEffect, useState } from "react";

const UserDataProvider = ({ children }: ChildrenProps) => {
	const [currentUser, setCurrentUser] = useState<Omit<User, "password"> | null>(
		null
	);
	const [hydrated, setHydrated] = useState<boolean>(false);
	const [pantry, setPantry] = useState<string[]>([]);

	const getUser = useCallback(() => {
		const user = localStorage.getItem("user");
		if (!user) {
			throw new Error("User not found");
		}

		const userDetails = JSON.parse(user);
		return userDetails;
	}, []);

	useEffect(() => {
		const userDetails = localStorage.getItem("user");
		const pantry = localStorage.getItem("pantry") ?? "[]";
		setHydrated(true);
		if (!userDetails) return;
		const { name, email } = JSON.parse(userDetails);
		setCurrentUser({ name, email });
		setPantry(JSON.parse(pantry));
	}, []);

	// FIXME: use jwt over storing email and password in localStorage
	const loginUser = ({ email, password }: Omit<User, "name">) => {
		const userDetails = getUser();
		const pantry = localStorage.getItem("pantry") ?? "[]";

		if (email !== userDetails.email || password !== userDetails.password) {
			throw new Error("Incorrect user details. Please try again!");
		}

		setCurrentUser({ name: userDetails.name, email: userDetails.email });
		setPantry(JSON.parse(pantry));
		return userDetails;
	};

	const registerUser = ({ name, email, password }: User) => {
		const user = localStorage.getItem("user") ?? "{}";
		const userDetails = JSON.parse(user);

		if (userDetails?.email === email) {
			throw new Error("Email address already exists");
		}

		localStorage.setItem("user", JSON.stringify({ name, email, password }));
		setCurrentUser({ name, email });
		return { name, email };
	};

	const editProfile = (userSettings: Partial<User>) => {
		const filteredSettingsArr = Object.entries(userSettings).filter(
			([, value]) => value.trim() !== ""
		);

		const filteredSettings = Object.fromEntries(filteredSettingsArr);
		const oldSettings = getUser();
		const userData = JSON.stringify({
			...oldSettings,
			...filteredSettings,
		});

		localStorage.setItem("user", userData);
		setCurrentUser(
			(prevUser) => ({ ...prevUser, ...filteredSettings } as User)
		);

		return JSON.parse(userData);
	};

	return (
		<UserDataContext.Provider
			value={{
				currentUser,
				pantry,
				loginUser,
				registerUser,
				hydrated,
				editProfile,
			}}
		>
			{children}
		</UserDataContext.Provider>
	);
};

export default UserDataProvider;
