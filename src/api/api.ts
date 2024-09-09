import { IProperty } from "@/types";
import { supabase } from "../utils/supabase";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export interface IQueryProps {
	county: string | null | undefined;
	listing_status: string | null | undefined;
	limit: number | null | undefined;
	sort: boolean;
}
export interface ISavedProperty {
	uid: string | null | undefined;
	id: string | null | undefined;
}

export const getProperties = async (
	props: IQueryProps
): Promise<IProperty[]> => {
	const params = {
		county: props.county,
		listing_status: props.listing_status,
		limit: props.county ? null : 12,
		sort: props.sort,
	};

	let query = supabase
		.from("listings")
		.select("*")
		.ilike("city", params.county || "london")
		.eq("status", props.listing_status)
		.order("price", { ascending: props.sort });

	if (!params.county) {
		query = query.limit(12);
	}

	const { data } = await query;
	return data!;
};
export const getFeatured = async (): Promise<IProperty[]> => {
	try {
		const { data } = await axios.get(`${API_BASE_URL}/properties`);

		// Transform the data to convert $numberDecimal to regular numbers and _id to id
		const transformedData = data.map((property: any) => {
			const { _id, ...rest } = property;
			return {
				id: _id,
				...rest,
				longitude: property.longitude?.$numberDecimal
					? Number(property.longitude.$numberDecimal)
					: property.longitude,
				latitude: property.latitude?.$numberDecimal
					? Number(property.latitude.$numberDecimal)
					: property.latitude,
				price: property.price?.$numberDecimal
					? Number(property.price.$numberDecimal)
					: property.price,
			};
		});

		return transformedData;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(`Failed to fetch properties: ${error.message}`);
		}
		throw error;
	}
};

export const getProperty = async (id: string): Promise<any> => {
	try {
		const { data } = await axios.get(`${API_BASE_URL}/properties/${id}`);
		const { _id, ...rest } = data;
		return { id: _id, ...rest };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(`Failed to fetch property: ${error.message}`);
		}
		throw error;
	}
};

export const saveProperty = async (
	saved: ISavedProperty
): Promise<ISavedProperty> => {
	try {
		const { data } = await axios.post(`${API_BASE_URL}/users/saved`, saved);
		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(`Failed to save property: ${error.message}`);
		}
		throw error;
	}
};

export const deleteSavedProperty = async (
	saved: ISavedProperty
): Promise<void> => {
	try {
		const { data: res } = await axios.delete(`${API_BASE_URL}/users/saved`, {
			data: saved,
		});
		return res;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(`Failed to remove saved property: ${error.message}`);
		}
		throw error;
	}
};

export const getSavedProperties = async (id: string): Promise<IProperty[]> => {
	try {
		const { data } = await axios.get(`${API_BASE_URL}/users/saved/${id}`);
		const transformedData = data.map((property: any) => {
			const { _id, ...rest } = property;
			return {
				id: _id,
				...rest,
			};
		});

		return transformedData;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new Error(`Failed to fetch saved properties: ${error.message}`);
		}
		throw error;
	}
};
