import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, type DataRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App.tsx";

const router: DataRouter = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
