import { coordinates } from "@/lib/coordinates";
import { IProperty } from "@/types";

import {
	AdvancedMarker,
	APIProvider,
	ControlPosition,
	Map,
	MapControl,
} from "@vis.gl/react-google-maps";
import PropertyCard from "./PropertyCard";
import { useState } from "react";

const MapMain = ({ properties }: { properties: IProperty[] }) => {
	const [selectedProperty, setSelectedProperty] = useState<IProperty>(
		properties[0]
	);

	const center = coordinates[properties[0].city.toLowerCase()];

	return (
		<div className=" grid grid-auto-flow gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-8">
			<div className="rounded-xl h-[400px] overflow-hidden col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-3">
				<APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
					<Map
						style={{ width: "100%", height: "100%" }}
						defaultCenter={center}
						defaultZoom={12}
						disableDefaultUI={true}
						mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
						zoomControl={true}
						gestureHandling={"greedy"}
					>
						<MapControl position={ControlPosition.TOP_LEFT}>
							{properties.map((property) => (
								<AdvancedMarker
									position={{ lat: property.latitude, lng: property.longitude }}
									key={property.id}
									onClick={() => setSelectedProperty(property)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill={
											property.id === selectedProperty.id
												? "#text-primary"
												: "#ef707f"
										}
										className="w-8 h-8"
									>
										<path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
										<path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
									</svg>
								</AdvancedMarker>
							))}
						</MapControl>
					</Map>
				</APIProvider>
			</div>
			<PropertyCard property={selectedProperty} />
		</div>
	);
};

export default MapMain;
