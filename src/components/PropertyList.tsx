import { IProperty } from "@/types";
import PropertyCard from "./PropertyCard";
import { Button } from "./ui/button";
import { BiMapAlt } from "react-icons/bi";
import { useState } from "react";
import MapMain from "./MapMain";
import { useLocation } from "react-router-dom";

const PropertyList = ({ properties }: { properties: IProperty[] }) => {
	const [isOpen, setIsOpen] = useState(false);

	const location = useLocation();

	return (
		<div className="container p-1 md:px-8">
			<div className=" flex items-center justify-between mt-4 -mb-4 text-left">
				<p className=" font-semibold">
					{location.pathname === "/"
						? "Featured Properties For Sale"
						: properties?.length === 0
							? "No properties found."
							: `${
									properties[0].city.charAt(0).toUpperCase() +
									properties[0].city.substring(1)
								} - ${
									properties[0].status === "sale" ? "For Sale" : "To Rent"
								} - ${properties?.length} Properties`}
				</p>
				<Button
					variant="ghost"
					className="bg-none text-md"
					onClick={() => setIsOpen(!isOpen)}
				>
					<BiMapAlt className="size-5 mr-2" />
					<p className="hidden sm:flex ">
						{isOpen ? "Hide Map" : "Show on Map"}
					</p>
				</Button>
			</div>

			{isOpen && (
				<div className="grid gap-6 ">
					<MapMain properties={properties} />
				</div>
			)}

			<div className=" grid grid-flow-row gap-6 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-8">
				{properties.map((property) => (
					<PropertyCard key={property.id} property={property} />
				))}
			</div>
		</div>
	);
};

export default PropertyList;
