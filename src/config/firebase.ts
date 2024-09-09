// Import the functions you need from the SDKs you need
import { collection, getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_KEY,
	authDomain: "dream-home-react.firebaseapp.com",
	projectId: "dream-home-react",
	storageBucket: "dream-home-react.appspot.com",
	messagingSenderId: "554595117941",
	appId: "1:554595117941:web:9553bbb7677e60864c813c",
	measurementId: "G-60MZXLDW2R",
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const colRef = collection(db, "users");
