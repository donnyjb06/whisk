import { useState } from "react";
import {
	Navbar,
	NavBody,
	NavbarLogo,
	NavItems,
	NavbarButton,
	MobileNav,
	MobileNavHeader,
	MobileNavToggle,
	MobileNavMenu,
} from "./ui/ResizableNavBar";
import ModeToggle from "./ModeToggle";
import { useModal } from "@/hooks/useModal";
import { useUserData } from "@/hooks/useUserData";
import { Link } from "react-router-dom";

const NavBar = () => {
	const navItems = [
		{
			name: "Home",
			link: "/",
		},
		{
			name: "Recipes",
			link: "/recipes",
		},
		{
			name: "Profile",
			link: "/profile",
		},
	];
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
	const { setModalIsOpen } = useModal();
	const { currentUser } = useUserData();
	return (
		<Navbar>
			{/* Desktop Navigation */}
			<NavBody className="bg-foreground">
				<NavbarLogo isMobileView={false} />
				<NavItems items={navItems} />
				<div className="flex items-center gap-4">
					{!currentUser && (
						<NavbarButton
							variant="primary"
							className="bg-primary text-primary-foreground hover:bg-primary-emphasis buttontext"
							onClick={() => setModalIsOpen("auth")}
						>
							Login
						</NavbarButton>
					)}
					<ModeToggle />
				</div>
			</NavBody>

			{/* Mobile Navigation */}
			<MobileNav>
				<MobileNavHeader>
					<NavbarLogo isMobileView={true} />
					<MobileNavToggle
						isOpen={isMobileMenuOpen}
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					/>
				</MobileNavHeader>

				<MobileNavMenu
					isOpen={isMobileMenuOpen}
					onClose={() => setIsMobileMenuOpen(false)}
				>
					{navItems.map((item, idx) => (
						<Link
							key={`mobile-link-${idx}`}
							to={item.link}
							onClick={() => setIsMobileMenuOpen(false)}
							className="relative text-neutral-600 dark:text-neutral-300 buttontext"
						>
							<span className="block">{item.name}</span>
						</Link>
					))}
					<div className="flex w-full flex-col gap-4">
						{!currentUser && (
							<NavbarButton
								onClick={() => {
									setIsMobileMenuOpen(false);
									setModalIsOpen("auth");
								}}
								variant="primary"
								className="w-full text-background button-text"
							>
								Login
							</NavbarButton>
						)}
					</div>
				</MobileNavMenu>
			</MobileNav>
		</Navbar>
	);
};

export default NavBar;
