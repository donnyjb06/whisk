import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import { useLocation } from "react-router";
import { Outlet } from "react-router";

const ProfilePage = () => {
	const location = useLocation();
	const nestedLevel = location.pathname.split("/")[2] || "/";

	return (
		<main className="overflow-hidden grow max-w-7xl mx-auto min-h-screen flex flex-col p-6 gap-6 md:flex-row">
			<Sidebar />
			<PageTransition className="grow" pathName={nestedLevel}>
				<Outlet />
			</PageTransition>
		</main>
	);
};

export default ProfilePage;
