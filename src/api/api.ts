import { IProperty } from "@/types";
import axios from "axios";

const baseURL = "https://property-api-35.onrender.com/listings";
export interface IQueryProps {
	county: string | null;
	listing_status: string | null;
	_limit: number | null;
}

export const getProperties = async (
	props: IQueryProps
): Promise<IProperty[]> => {
	const params = {
		county: props.county,
		listing_status: props.listing_status,
		_limit: props._limit,
	};
	const res = await axios({
		method: "GET",
		url: baseURL,
		params,
	});

	return res.data;
};

export const getProperty = async (id: string): Promise<IProperty> => {
	const res = await axios.get(`${baseURL}/${id}`);
	return res.data;
};

export const getPropertiesById = async (
	savedIds: string[]
): Promise<IProperty[]> => {
	const idQuery = savedIds.map((id) => `id=${id}`).join("&");
	const url = `${baseURL}?${idQuery}`;
	const res = await axios(url);
	return res.data;
};

// export const fetchNoLocation = async (props) => {
// 	const params = {
// 		listing_status: props.listing_status,
// 	};

// 	const { data } = await axios({
// 		method: "GET",
// 		url: baseURL,
// 		params,
// 	});
// 	return data;
// };
