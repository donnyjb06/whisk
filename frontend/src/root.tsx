import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, type DataRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "./Layout.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import RecipesPage from "./pages/RecipesPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

const router: DataRouter = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: (
					<ProtectedRoute anonymous>
						<LandingPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/recipes",
				element: (
					<ProtectedRoute>
						<RecipesPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/profile",
				element: (
					<ProtectedRoute>
						<ProfilePage />
					</ProtectedRoute>
				),
				children: [
					
				]
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
