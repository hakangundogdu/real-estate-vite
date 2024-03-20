import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext } from "react";
import AuthContext from "@/context/authContext";
import { Link, useNavigate } from "react-router-dom";

export function Signin() {
	const { signInWithGoogle, signIn } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formElements = form.elements as typeof form.elements & {
			email: { value: string };
			password: { value: string };
		};

		try {
			signIn(formElements.email.value, formElements.password.value);
		} catch (error) {
			console.log("error", error);
		}
		navigate("/");
	};

	return (
		<div className="flex-auto flex text-left items-center justify-center">
			<Card className="w-96">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Login</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4">
					<Button variant="outline" onClick={signInWithGoogle}>
						<FcGoogle className="mr-2 h-4 w-4" />
						Google
					</Button>
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or continue with
							</span>
						</div>
					</div>
					<form className="grid gap-4" onSubmit={handleSubmit}>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" placeholder="m@example.com" />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" />
						</div>
						<Button className="w-full" type="submit">
							Login{" "}
						</Button>
					</form>
					<p className="text-sm text-muted-foreground">
						No account yet?{" "}
						<Button variant="link">
							<Link to="/signup">Sign up</Link>
						</Button>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
