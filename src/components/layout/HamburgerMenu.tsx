import { Button } from "@/components/ui/button";
import {
	UserIcon,
	HeartIcon,
	CogIcon,
	ArrowLeftStartOnRectangleIcon,
	Bars3Icon,
} from "@heroicons/react/24/outline";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext } from "react";
import AuthContext from "@/context/authContext";
import { Link } from "react-router-dom";

export function HamburgerMenu() {
	const { user, logOut } = useContext(AuthContext);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="bg-white sm:bg-secondary text-primary rounded-full hover:text-white"
					size="icon"
				>
					<UserIcon className="size-6 hidden sm:block" />
					<Bars3Icon className="block sm:hidden size-6" />
				</Button>
			</DropdownMenuTrigger>
			{user ? (
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">
								{user?.displayName}
							</p>
							<p className="text-xs leading-none text-muted-foreground">
								{user?.email}
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<UserIcon className="w-4 h-4 mr-2" />
							Profile
						</DropdownMenuItem>
						<DropdownMenuItem>
							<HeartIcon className="w-4 h-4 mr-2" />
							Saved Properties
						</DropdownMenuItem>
						<DropdownMenuItem>
							<CogIcon className="w-4 h-4 mr-2" />
							Settings
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuItem onClick={logOut}>
						<ArrowLeftStartOnRectangleIcon className="w-4 h-4 mr-2" />
						Log out
					</DropdownMenuItem>
				</DropdownMenuContent>
			) : (
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<Link to="/login">Login</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link to="/signup">Signup</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			)}
		</DropdownMenu>
	);
}
