import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import * as React from "react";
import { BiBath, BiBed } from "react-icons/bi";
import { millify } from "millify";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { IProperty } from "@/types";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }: { property: IProperty }) => {
	const [saved, setSaved] = React.useState(false);
	console.log("saved", saved);

	return (
		<Card className="relative text-left overflow-hidden">
			<div className="h-48 overflow-hidden">
				<img
					className="w-full h-48 object-cover hover:scale-105 transition-all duration-300 ease-in-out"
					src={property.image_354_255_url}
					alt="image of house"
				/>
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
				<button
					className="absolute top-6 right-6 !mt-0"
					onClick={() => setSaved(!saved)}
				>
					{saved ? (
						<HeartIcon className="w-6 h-6 text-destructive" />
					) : (
						<HeartOutline className="w-6 h-6 text-destructive" />
					)}
				</button>
			</CardHeader>
			<CardContent>
				<p className="text-sm text-muted-foreground">
					{property.displayable_address.length > 35
						? property.displayable_address.substring(0, 35) + " ..."
						: property.displayable_address}
				</p>
				<p className="text-sm text-muted-foreground mt-2">{property.county}</p>
			</CardContent>
			<CardFooter className="flex ">
				<BiBed className="size-5 text-primary" />
				<p className="text-sm text-muted-foreground ml-2 mr-4">
					{property.num_bedrooms}
				</p>
				<BiBath className="size-5 text-primary" />
				<p className="text-sm text-muted-foreground ml-2">
					{property.num_bathrooms}
				</p>
			</CardFooter>
		</Card>
	);
};

export default PropertyCard;
