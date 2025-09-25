import { useUserData } from "@/hooks/useUserData";
import { NavLink, redirect } from "react-router";

const navItems = [
	{
		to: "information",
		label: "Edit Profile",
	},
	{
		to: "recipes",
		label: "Recipes",
	},
	{
		to: "pantry",
		label: "Edit Pantry",
	},
];

const Sidebar = () => {
	const { currentUser } = useUserData();

	if (!currentUser) redirect("/");
	return (
		<div className="flex flex-col gap-4 lg:gap-6 items-start pb-6 lg:pr-6 lg:pb-0 lg:max-w-1/3 border-b-2 lg:border-b-0 lg:border-r-2">
			<h4 className="heading4">{currentUser?.name}</h4>
			<div className="flex flex-col gap-1 lg:gap-2">
				{navItems.map((item) => (
					<NavLink
						to={item.to}
						className={({ isActive }) =>
							[
								isActive ? "text-primary" : "",
								"buttontext hover:text-muted transition-colors duration-200",
							].join("")
						}
					>
						{item.label}
					</NavLink>
				))}
			</div>
		</div>
	);
};

export default Sidebar;
