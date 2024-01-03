import { IProperty } from "@/types";
import PropertyCard from "./PropertyCard";

const PropertyList = ({ properties }: { properties: IProperty[] }) => {
	return (
		<div className="container grid grid-flow-row gap-6 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-8">
			{properties.map((property) => (
				<PropertyCard key={property.id} property={property} />
			))}
		</div>
	);
};

export default PropertyList;
