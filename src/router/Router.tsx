import { lazy, Suspense } from "react";
import { BrowserRouter, RouteObject, useRoutes } from "react-router-dom";

import Layout from "@/components/layout/Layout";
import About from "@/pages/About";
import { Signin } from "@/pages/SignIn";
import { Signup } from "@/pages/SignUp";
import { AuthProvider } from "@/context/authContext";
import PropertyDetail from "@/pages/PropertyDetail";
import { LoadingSpinner } from "@/components/ui/loading";
import Saved from "@/pages/Saved";

const App = lazy(() => import("../pages/App"));
const NotFound = lazy(() => import("../pages/NotFound"));

export const Router = () => {
	return (
		<BrowserRouter>
			<InnerRouter />
		</BrowserRouter>
	);
};

const InnerRouter = () => {
	const routes: RouteObject[] = [
		{
			path: "/",
			element: <Layout />,
			children: [
				{
					index: true,
					element: <App />,
				},
				{
					path: "/saved",
					element: <Saved />,
				},
				{
					path: "/about",
					element: <About />,
				},
				{
					path: "/properties/:id",
					element: <PropertyDetail />,
				},
				{
					path: "/login",
					element: <Signin />,
				},
				{
					path: "/signup",
					element: <Signup />,
				},
				{
					path: "*",
					element: <NotFound />,
				},
			],
		},
	];
	const element = useRoutes(routes);
	return (
		<AuthProvider>
			<div className="w-full">
				<Suspense fallback={<LoadingSpinner />}>{element}</Suspense>
			</div>
		</AuthProvider>
	);
};
