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

const PropertyCard = ({ property }: { property: IProperty }) => {
	const [saved, setSaved] = React.useState(false);
	console.log("saved", saved);

	return (
		<Card className="relative text-left overflow-hidden">
			<img
				className="w-full h-40 object-cover"
				src={property.image_354_255_url}
				alt="image of house"
			/>

			<CardHeader className="relative">
				<CardTitle>£{millify(+property.price)}</CardTitle>
				<p className="mt-2 font-semibold text-primary">
					{property.title.length > 28
						? property.title.substring(0, 25) + " ..."
						: property.title}
				</p>
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
