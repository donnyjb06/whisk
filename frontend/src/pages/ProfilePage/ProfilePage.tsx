import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router";

const ProfilePage = () => {
	return (
		<main className="overflow-hidden grow max-w-7xl mx-auto min-h-screen flex flex-col p-6 gap-6 md:flex-row">
			<Sidebar />
			<Outlet />
		</main>
	);
};

export default ProfilePage;
