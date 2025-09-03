import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import ThemeProvider from "./context/Theme/Theme.provider";
import ModeToggle from "./components/ModeToggle";

function App() {
	return (
		<>
			<ThemeProvider>
				<ModeToggle className="lg:hidden"/>
				<NavBar />
				<Outlet />
			</ThemeProvider>
		</>
	);
}

export default App;
