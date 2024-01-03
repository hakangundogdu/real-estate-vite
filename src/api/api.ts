import { IProperty } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseURL = "https://adventurous-hem-tuna.cyclic.app/listings";

export interface IQueryProps {
	county: string;
	listing_status: string;
	_limit: number;
}

export const getProperties = ({ _limit }: { _limit: IQueryProps["_limit"] }) =>
	useQuery({
		queryKey: ["getProperties", _limit],
		queryFn: async (): Promise<IProperty[]> => {
			const res = await axios({
				method: "GET",
				url: baseURL,
				params: { _limit },
			});

			return res.data;
		},
	});

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

// export const fetchSingleProperty = async (props) => {
// 	const response = await axios(`${baseURL}/${props.id}`);
// 	return response;
// };

// export const fetchMultipleProperty = async ({ savedIds }) => {
// 	const idQuery = savedIds.map((id) => `id=${id}`).join("&");
// 	const url = `${baseURL}?${idQuery}`;
// 	const response = await axios(url);
// 	return response;
// };
