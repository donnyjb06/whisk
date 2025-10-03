import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { type DataRouter } from "react-router";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Layout from "./Layout.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import RecipesPage from "./pages/RecipesPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import EditProfileForm from "./pages/ProfilePage/EditProfileForm/EditProfileForm.tsx";
import RecipeGrid from "./components/RecipeGrid.tsx";
import Pantry from "./pages/ProfilePage/Pantry/Pantry.tsx";

const router: DataRouter = createHashRouter([
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
					{
						index: true,
						element: <EditProfileForm />,
					},
					{
						path: "recipes",
						element: <RecipeGrid  className="grid-cols-1 lg:grid-cols-2"/>,
					},
					{
						path: "pantry",
						element: <Pantry />
					}
				],
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
