import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router";

const ProfilePage = () => {
	return (
		<main className="overflow-hidden max-w-7xl mx-auto flex flex-col p-6">
			<Sidebar />
			<Outlet />
		</main>
	);
};

export default ProfilePage;
