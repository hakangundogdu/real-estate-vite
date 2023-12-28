import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center w-full">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
