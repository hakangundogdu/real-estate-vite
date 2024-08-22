import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { goToLogin } from "@/lib/utils";
import { useLocation } from "react-router-dom";

type LoginProps = {
	onClose: () => void;
};

export function LoginAlertDialog(props: LoginProps) {
	const location = useLocation();

	return (
		<AlertDialog open={true}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>You are not logged in!</AlertDialogTitle>
					<AlertDialogDescription>
						Please login to save properties.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={props.onClose}>Cancel</AlertDialogCancel>

					<AlertDialogAction onClick={() => goToLogin(location.pathname)}>
						Login
					</AlertDialogAction>
					{/* <AlertDialogAction>
						<Link to="/login" state={location.pathname}>
							Login{" "}
						</Link>
					</AlertDialogAction> */}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
