import { HomeIcon } from '@heroicons/react/24/solid';
import { SignalIcon } from 'lucide-react';
import { lazy, Suspense } from 'react';
import {
	BrowserRouter,
	Link,
	Outlet,
	RouteObject,
	useRoutes,
} from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import About from '@/pages/About';
import { Signin } from '@/pages/SignIn';
import { AuthProvider } from '@/context/authContext';

const Loading = () => (
	<p className="p-4 w-full h-full text-center">Loading...</p>
);

const App = lazy(() => import('../pages/App'));
const NotFound = lazy(() => import('../pages/NotFound'));

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
			path: '/',
			element: <Layout />,
			children: [
				{
					index: true,
					element: <App />,
				},
				{
					path: '/about',
					element: <About />,
				},
				{
					path: '/login',
					element: <Signin />,
				},
				{
					path: '*',
					element: <NotFound />,
				},
			],
		},
	];
	const element = useRoutes(routes);
	return (
		<AuthProvider>
			<div className="w-full">
				<Suspense fallback={<Loading />}>{element}</Suspense>
			</div>
		</AuthProvider>
	);
};
