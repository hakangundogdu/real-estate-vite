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
import Layout from "@/components/layout/Layout";

const Loading = () => (
  <p className="p-4 w-full h-full text-center">Loading...</p>
);

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
    <div className="w-full">
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};
