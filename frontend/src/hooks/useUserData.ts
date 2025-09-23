import { UserDataContext } from "@/context/UserData/UserData.context";
import { useContext } from "react";

export const useUserData = () => {
	const context = useContext(UserDataContext);

	if (!context) {
		throw new Error(
			"useUserData must be used within a UserDataProvider component"
		);
	}

	return context;
};
