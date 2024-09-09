"use client";

import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext } from "react";
import AuthContext from "@/context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

export function Signup() {
	const { signInWithGoogle, createUser } = useContext(AuthContext);
	const navigate = useNavigate();
	const signInGoogle = async () => {
		try {
			await signInWithGoogle();
			navigate(-1);
		} catch (error) {
			console.log("error", error);
		}
	};

	const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const formElements = form.elements as typeof form.elements & {
			email: { value: string };
			password: { value: string };
			firstname: { value: string };
			lastname: { value: string };
		};
		const displayName = `${
			formElements.firstname.value.charAt(0).toUpperCase() +
			formElements.firstname.value.slice(1)
		} ${
			formElements.lastname.value.charAt(0).toUpperCase() +
			formElements.lastname.value.slice(1)
		}`;

		try {
			const userCredential = await createUser(
				formElements.email.value,
				formElements.password.value
			);
			await updateProfile(userCredential.user, {
				displayName: displayName,
			});
			navigate(-1);
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<div className="flex-auto flex text-left items-center justify-center">
			<Card className="w-96">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Signup</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4">
					<Button variant="outline" onClick={signInGoogle}>
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
						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-3 grid gap-2">
								<Label htmlFor="firstname">First Name</Label>
								<Input id="firstname" type="firstname" />
							</div>
							<div className="sm:col-span-3 grid gap-2">
								<Label htmlFor="lastname">Last Name</Label>
								<Input id="lastname" type="lastname" />
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input id="email" type="email" placeholder="m@example.com" />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input id="password" type="password" />
						</div>
						<Button className="w-full" type="submit">
							Sign up{" "}
						</Button>
					</form>
					<p className="text-sm text-muted-foreground">
						Alredy have an account?
						<Button variant="link">
							<Link to="/login">Login</Link>
						</Button>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
