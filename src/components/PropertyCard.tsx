import { BiBath, BiBed } from "react-icons/bi";
import { millify } from "millify";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Link } from "react-router-dom";

const PropertyCard = ({ property }: { property: any }) => {
	return (
		<Card className="relative text-left overflow-hidden">
			<div className="h-48 overflow-hidden">
				{!property.image ? (
					<div className="flex items-center justify-center  w-full bg-center bg-cover h-full bg-gray-300 overflow-hidden relative">
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
				) : (
					<img
						className="w-full h-48 object-cover hover:scale-105 transition-all duration-300 ease-in-out"
						src={property.image}
						alt="image of house"
					/>
				)}
			</div>

			<CardHeader className="relative">
				<Link to={`/properties/${property.id}`} target="_blank">
					<CardTitle>£{millify(+property.price)}</CardTitle>
					<p className="mt-2 font-semibold text-primary">
						{property.title.length > 28
							? property.title.substring(0, 25) + " ..."
							: property.title}
					</p>
				</Link>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">
					{property.address.length > 35
						? property.address.substring(0, 35) + " ..."
						: property.address}
				</p>
				<p className="text-sm text-muted-foreground mt-2">
					{property.city[0].toUpperCase() + property.city.slice(1)}
				</p>
			</CardContent>
			<CardFooter className="flex ">
				<BiBed className="size-5 text-primary" />
				<p className="text-sm text-muted-foreground ml-2 mr-4">
					{property.bedrooms}
				</p>
				<BiBath className="size-5 text-primary" />
				<p className="text-sm text-muted-foreground ml-2">
					{property.bathrooms}
				</p>
			</CardFooter>
		</Card>
	);
};

export default PropertyCard;
