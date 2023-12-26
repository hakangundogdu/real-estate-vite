import { HomeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <nav className="container p-2 flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <HomeIcon className="w-6 h-6 mr-2 text-primary" />
        <p className="font-bold text-2xl">
          Dream <span className="text-primary">Home</span>
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
  );
};

export default Header;
