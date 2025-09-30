import { useUserData } from "@/hooks/useUserData";
import { cn } from "@/lib/utils";
import { NavLink, redirect } from "react-router";

const navItems = [
	{
		to: "/profile",
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
		<div className="flex flex-col gap-4 items-start pb-6 md:pr-6 md:pb-0 min-w-1/4 border-b-2 md:border-b-0 md:border-r-2">
			<h4 className="heading5 lg:heading4 whitespace-nowrap">
				{currentUser?.name}
			</h4>
			<div className="flex flex-col gap-1 lg:gap-2">
				{navItems.map((item) => (
					<NavLink
						key={item.to}
						end
						to={item.to}
						className={({ isActive }) =>
							cn(
								"buttontext hover:text-muted transition-colors duration-200",
								isActive && "text-primary"
							)
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
