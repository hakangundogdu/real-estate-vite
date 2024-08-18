import {
	AdvancedMarker,
	APIProvider,
	ControlPosition,
	Map,
	MapControl,
} from "@vis.gl/react-google-maps";

type MapWidePropTypes = {
	longitude: number;
	latitude: number;
};

const MapWide = ({ latitude, longitude }: MapWidePropTypes) => {
	const position = { lat: latitude, lng: longitude };

	return (
		<APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
			<Map
				style={{ width: "100%", height: "100%" }}
				defaultCenter={position}
				defaultZoom={12}
				disableDefaultUI={true}
				mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
				zoomControl={true}
				gestureHandling={"greedy"}
			>
				<MapControl position={ControlPosition.TOP_LEFT}>
					<AdvancedMarker position={position}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="#eb475a"
							className="w-8 h-8"
						>
							<path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
							<path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
						</svg>
					</AdvancedMarker>
				</MapControl>
			</Map>
		</APIProvider>
	);
};

export default MapWide;
