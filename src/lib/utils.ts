import { type ClassValue, clsx } from "clsx";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function goToLogin(lastUrl: string) {
	const navigate = useNavigate();
	localStorage.setItem("lastUrl", lastUrl);
	navigate("/login");
}
