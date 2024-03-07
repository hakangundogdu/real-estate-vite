import { HomeIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect } from "react";
import AuthContext from "@/context/authContext";
import { auth, colRef, db } from "../../firebase";
import {
	doc,
	DocumentData,
	onSnapshot,
	serverTimestamp,
	setDoc,
	query,
	where,
} from "firebase/firestore";
import { UserNav } from "./UserNav";

const Header = () => {
	const { user, userData } = useContext(AuthContext);

	console.log("user-context", user);
	console.log("userdata-context", userData);

	useEffect(() => {
		const auth = getAuth();

		onAuthStateChanged(auth, (user) => {
			console.log("currentuser", auth.currentUser);
			console.log("currentuserrr", user);
		});
	}, []);

	return (
		<nav className="container px-8 py-2 flex items-center justify-between">
			<Link to="/" className="flex items-center">
				<HomeIcon className="w-6 h-6 mr-2 text-primary" />
				<p className="font-bold text-2xl">
					Dream <span className="text-primary">Home</span>
				</p>
			</Link>
			{!user ? (
				<div className="flex items-center gap-4">
					<Link to="/login">Login</Link>
					<Link to="/login">
						<Button>Sign Up</Button>
					</Link>
				</div>
			) : (
				<div className="flex items-center gap-4">
					<Link to="/saved">
						<Button
							className="bg-secondary text-primary rounded-full hover:text-white"
							size="icon"
						>
							<HeartIcon className="size-6" />
						</Button>
					</Link>

					<UserNav />
				</div>
			)}
		</nav>
	);
};

export default Header;
