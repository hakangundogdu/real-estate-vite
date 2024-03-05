import { CgSpinner } from "react-icons/cg";

export const LoadingSpinner = () => {
	return (
		<div className="h-48 m-auto flex items-center">
			<CgSpinner className="animate-spin m-auto text-primary text-5xl" />
		</div>
	);
};
