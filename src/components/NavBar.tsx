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
} from "./ui/resizable-navbar";

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
	return (
		<Navbar>
			{/* Desktop Navigation */}
			<NavBody className="bg-foreground">
				<NavbarLogo />
				<NavItems items={navItems} />
				<div className="flex items-center gap-4">
					<NavbarButton variant="secondary">Login</NavbarButton>
				</div>
			</NavBody>

			{/* Mobile Navigation */}
			<MobileNav>
				<MobileNavHeader>
					<NavbarLogo />
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
						<a
							key={`mobile-link-${idx}`}
							href={item.link}
							onClick={() => setIsMobileMenuOpen(false)}
							className="relative text-neutral-600 dark:text-neutral-300"
						>
							<span className="block">{item.name}</span>
						</a>
					))}
					<div className="flex w-full flex-col gap-4">
						<NavbarButton
							onClick={() => setIsMobileMenuOpen(false)}
							variant="primary"
							className="w-full"
						>
							Login
						</NavbarButton>
						<NavbarButton
							onClick={() => setIsMobileMenuOpen(false)}
							variant="primary"
							className="w-full"
						>
							Book a call
						</NavbarButton>
					</div>
				</MobileNavMenu>
			</MobileNav>
		</Navbar>
	);
};

export default NavBar;
