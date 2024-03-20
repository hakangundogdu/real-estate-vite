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
					<AdvancedMarker position={position} />
				</MapControl>
			</Map>
		</APIProvider>
	);
};

export default MapWide;
