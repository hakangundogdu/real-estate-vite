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
import ImageSkeleton from "./ui/ImageSkeleton";
import { useState } from "react";

const PropertyCard = ({ property }: { property: any }) => {
	const [imageError, setImageError] = useState(false);

	!property.image && console.log("property", property.image);

	const handleImageError = () => {
		setImageError(true);
	};

	return (
		<Card className="relative text-left overflow-hidden">
			<div className="h-48 overflow-hidden">
				{imageError ? (
					<ImageSkeleton />
				) : (
					<img
						className="w-full h-48 object-cover hover:scale-105 transition-all duration-300 ease-in-out"
						src={property.image}
						alt="image of house"
						onError={handleImageError}
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
