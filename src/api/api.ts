import { IProperty } from "@/types";
import { supabase } from "../utils/supabase";

export interface IQueryProps {
	county: string | null | undefined;
	listing_status: string | null | undefined;
	limit: number | null | undefined;
	sort: boolean;
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
	const { data, error } = await supabase.from("featured").select();

	if (error) {
		console.error("Error fetching random listings:", error.message);
		return [];
	}

	return data || [];
};

export const getProperty = async (id: string): Promise<any> => {
	const { data: listingData, error: listingError } = await supabase
		.from("listings")
		.select()
		.eq("id", id)
		.single();

	if (listingError) {
		console.error("Error fetching listing:", listingError.message);
		return { listing: null, photos: [] };
	}

	const { data: photosData, error: imagesError } = await supabase
		.from("images")
		.select()
		.eq("listingId", id);
	if (imagesError) {
		console.error("Error fetching photos:", imagesError.message);
	}

	return {
		listing: listingData,
		images: photosData || [],
	};
};

export const getPropertiesById = async (savedIds: string[]): Promise<any[]> => {
	if (savedIds.length === 0) {
		return [];
	}

	const { data, error } = await supabase
		.from("listings")
		.select()
		.in("id", savedIds);

	if (error) {
		console.error("Error fetching listings:", error.message);
		return [];
	}

	return data || [];
};
