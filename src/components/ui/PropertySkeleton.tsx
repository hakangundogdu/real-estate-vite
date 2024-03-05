import { BiHeart, BiPhone } from "react-icons/bi";
import { Button } from "./button";

const PropertySkeleton = () => {
	return (
		<div className="flex-auto animate-pulse container px-8 py-6">
			<div className="grid gap-4 md:grid-cols-2 h-96">
				<div className="flex items-center justify-center w-full bg-center bg-cover h-96 bg-gray-300 overflow-hidden rounded-xl relative">
					<svg
						className="w-10 h-10 text-gray-200 dark:text-gray-600"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 20 18"
					>
						<path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
					</svg>
				</div>
				<div className="flex flex-col justify-center ml-6 p-4">
					<div className="h-3 bg-gray-200 rounded-full w-48"></div>
					<div className="h-2 bg-gray-200 rounded-full w-48 mt-6"></div>
					<div className="h-2 bg-gray-200 rounded-full w-48 mt-6"></div>
					<div className="h-2 bg-gray-200 rounded-full w-48 mt-2"></div>
					<div className="h-2 bg-gray-200 rounded-full w-24 mt-6"></div>

					<div className="flex gap-4 mt-6">
						<Button className="text-white text-md">
							<BiHeart className="size-5 mr-2 text-white" />
							Save
						</Button>

						<Button variant="outline" className="text-md">
							<BiPhone className="size-5 mr-2" />
							Call Agent
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertySkeleton;
