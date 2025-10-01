import { Outlet, useLocation } from "react-router";
import NavBar from "./components/NavBar";
import ThemeProvider from "./context/Theme/Theme.provider";
import ModeToggle from "./components/ModeToggle";
import { Toaster } from "./components/ui/sonner";
import ModalProvider from "./context/Modal/Modal.provider";
import AuthModal from "./components/AuthModal";
import RecipesProvider from "./context/Recipes/Recipes.provider";
import RecipeModal from "./components/RecipeModal";
import UserDataProvider from "./context/UserData/UserData.provider";
import PageTransition from "./components/PageTransition";
import LogOutConfirmationModal from "./components/LogOutConfirmationModal";

function Layout() {
	const location = useLocation();
	const topLevel = location.pathname.split("/")[1] || "/";

	return (
		<>
			<ModalProvider>
				<ThemeProvider>
					<Toaster richColors position="bottom-left" />
					<ModeToggle className="lg:hidden" />
					<UserDataProvider>
						<AuthModal />
						<LogOutConfirmationModal />
						<NavBar />
						<PageTransition
							className="flex-1 mt-10 overflow-x-hidden"
							pathName={topLevel}
						>
							<RecipesProvider>
								<RecipeModal />
								<Outlet />
							</RecipesProvider>
						</PageTransition>
					</UserDataProvider>
				</ThemeProvider>
			</ModalProvider>
		</>
	);
}

export default Layout;
