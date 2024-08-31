import { getPropertiesById } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "@/context/authContext";
import { LoadingSpinner } from "@/components/ui/loading";
import PropertyCard from "@/components/PropertyCard";

const Saved = () => {
	const { userData } = useContext(AuthContext);
	const savedIds = userData?.savedIds;

	const { data: properties } = useQuery({
		queryKey: ["getProperties"],
		queryFn: () => getPropertiesById(savedIds),
		enabled: !!savedIds,
	});

	return (
		<div className="flex-auto flex-col w-full">
			{properties === undefined ? (
				<LoadingSpinner />
			) : (
				<div className="container text-left">
					<p className="ml-2 mt-4 -mb-4 font-semibold text-lg">
						{properties?.length === 0
							? "No saved properties found."
							: `${properties?.length} Saved Properties`}
					</p>

					<div className="grid grid-flow-row gap-6 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-8">
						{properties.map((property) => (
							<PropertyCard key={property.id} property={property} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Saved;
