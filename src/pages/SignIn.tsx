'use client';

import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useContext } from 'react';
import AuthContext from '@/context/authContext';

export function Signin() {
	const { signInWithGoogle, user, userData } = useContext(AuthContext);

	console.log('user', user);
	console.log('userData', userData);

	return (
		<div className="flex-auto flex text-left items-center justify-center">
			<Card className="w-96">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Create an account</CardTitle>
					<CardDescription>
						Enter your email below to create your account
					</CardDescription>
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
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input id="email" type="email" placeholder="m@example.com" />
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input id="password" type="password" />
					</div>
				</CardContent>
				<CardFooter>
					<Button className="w-full">Create account</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
