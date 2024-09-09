import { PropsWithChildren, createContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	User,
	UserCredential,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase";

export type AuthContextType = {
	user: User | null;
	signInWithGoogle: () => void;
	createUser: (email: string, password: string) => Promise<UserCredential>;
	signIn: (email: string, password: string) => Promise<UserCredential>;
	logOut: () => Promise<void>;
};
type createUser = (email: string, password: string) => Promise<UserCredential>;

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
	const [user, setUser] = useState<User | null>(null);
	const provider = new GoogleAuthProvider();

	// Sign in with Google
	const signInWithGoogle = () => {
		return signInWithPopup(auth, provider);
	};

	const createUser: createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signIn: createUser = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	// Log out
	const logOut = () => signOut(auth);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider
			value={{ createUser, user, logOut, signIn, signInWithGoogle }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
