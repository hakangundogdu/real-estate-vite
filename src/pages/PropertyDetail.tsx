import { getProperty } from "@/api/api";
import { useQuery } from "@tanstack/react-query";
import millify from "millify";
import { useParams } from "react-router-dom";

const PropertyDetail = () => {
	const { id } = useParams();

	const { data: property, isLoading } = useQuery({
		queryKey: ["getProperties", id],
		queryFn: () => getProperty(id!),
	});

	console.log("property", property);
	console.log("image", property?.images[0].original);

	return (
		<div className="flex-auto w-full container px-8 py-2">
			<div className="flex h-96 w-full gap-2 flex-auto">
				<div className="flex w-1/2 bg-center bg-cover h-96 overflow-hidden rounded-xl">
					<img
						className="w-full h-96 object-cover"
						src={property?.images[4]["645x430"]}
						alt="image of house"
					/>
				</div>
				<div className="flex bg-slate-300 w-1/2">
					<p>£{millify(+property.price)}</p>
					<p className="mt-2 font-semibold text-primary">{property.title}</p>
				</div>
			</div>
		</div>
	);
};

export default PropertyDetail;
