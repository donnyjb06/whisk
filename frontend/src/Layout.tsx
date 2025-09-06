import { Outlet, useLocation } from "react-router";
import NavBar from "./components/NavBar";
import ThemeProvider from "./context/Theme/Theme.provider";
import ModeToggle from "./components/ModeToggle";
import { AnimatePresence, motion } from "motion/react";
import { Toaster } from "./components/ui/sonner";

function Layout() {
	const location = useLocation();

	return (
		<>
			<ThemeProvider>
					<Toaster richColors position="bottom-left" />
					<ModeToggle className="lg:hidden" />
					<NavBar />
					<AnimatePresence mode="wait">
						<motion.div
							key={location.pathname}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.9 }}
							className="flex-1"
						>
							<Outlet />
						</motion.div>
					</AnimatePresence>
			</ThemeProvider>
		</>
	);
}

export default Layout;
