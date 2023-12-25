import About from "@/pages/About";
import { lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "@heroicons/react/24/solid";

import {
  Outlet,
  RouteObject,
  useRoutes,
  BrowserRouter,
  Link,
} from "react-router-dom";

const Loading = () => (
  <p className="p-4 w-full h-full text-center">Loading...</p>
);

const App = lazy(() => import("../pages/App"));
const NotFound = lazy(() => import("../pages/NotFound"));

function Layout() {
  return (
    <div>
      <nav className="p-2 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <HomeIcon className="w-6 h-6 mr-2 text-accent" />
          <p className="font-bold text-2xl">
            Dream <span className="text-accent">Home</span>
          </p>
        </Link>
        <div className="flex items-center">
          <Link to="/about" className="mr-4">
            Login
          </Link>
          <Link to="/about" className="mr-4">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

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
          path: "/about",
          element: <About />,
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
    <div>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};
