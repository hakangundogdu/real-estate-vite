import { useParams } from "react-router-dom";

const PropertyDetail = () => {
	const { id } = useParams();

	return (
		<div className="flex-auto w-full container px-8 py-2">
			<div>PropertyDetail {id}</div>
		</div>
	);
};

export default PropertyDetail;
