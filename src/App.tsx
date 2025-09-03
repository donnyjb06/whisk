import { Outlet } from "react-router";
import NavBar from "./components/NavBar";
import ThemeProvider from "./context/Theme/Theme.provider";

function App() {
	return (
		<>
			<ThemeProvider>
				<NavBar />
				<Outlet />
			</ThemeProvider>
		</>
	);
}

export default App;
