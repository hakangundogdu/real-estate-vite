import { getPropertiesById } from "@/api/api";
import PropertyList from "@/components/PropertyList";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "@/context/authContext";
import { LoadingSpinner } from "@/components/ui/loading";

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
				<>
					<div className="container text-left">
						<p className="ml-2 mt-4 -mb-4">
							{properties?.length === 0
								? "No saved properties found."
								: `${properties?.length} Saved Properties`}
						</p>
					</div>
					<PropertyList properties={properties} />
				</>
			)}
		</div>
	);
};

export default Saved;
