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
import { auth, colRef } from "../firebase";
import {
	doc,
	DocumentData,
	onSnapshot,
	serverTimestamp,
	setDoc,
	query,
	where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export type AuthContextType = {
	user: User | null;
	signInWithGoogle: () => Promise<UserCredential>;
	createUser: (email: string, password: string) => Promise<UserCredential>;
	signIn: (email: string, password: string) => Promise<UserCredential>;
	logOut: () => Promise<void>;
	userData: DocumentData | undefined;
};
type createUser = (email: string, password: string) => Promise<UserCredential>;

const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
	const [user, setUser] = useState<User | null>(null);
	const [userData, setUserData] = useState<any | null>(null);

	const provider = new GoogleAuthProvider();
	const navigate = useNavigate();

	// Sign in with Google
	const signInWithGoogle = () => {
		signInWithPopup(auth, provider);
		navigate("/");
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
			console.log(currentUser);
			setUser(currentUser);
			// 	if (currentUser) {
			// 		onSnapshot(doc(db, 'users', currentUser.uid), (snapshot) => {
			// 			setUserData(snapshot.data());

			// 			// if (!snapshot.exists()) {
			// 			// 	setDoc(doc(db, 'users', user.uid), {
			// 			// 		displayName: user.displayName,
			// 			// 		email: user.email,
			// 			// 		photoURL: user.photoURL,
			// 			// 		createdAt: serverTimestamp(),
			// 			// 	});
			// 			// } else {
			// 			// 	setUserData(snapshot.data());
			// 			// }
			// 		});
			// }
		});
		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (!user) return;
		const q = query(colRef, where("uid", "==", user.uid));

		onSnapshot(q, (snapshot) => {
			let data: any = [];
			snapshot.forEach((doc) => {
				data.push({ ...doc.data(), id: doc.id });
			});

			if (data.length === 0) {
				return;
			} else {
				setUserData({ id: data[0].id, savedIds: data[0].saved });
			}
		});
	}, [user]);

	return (
		<AuthContext.Provider
			value={{ createUser, user, logOut, signIn, signInWithGoogle, userData }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
