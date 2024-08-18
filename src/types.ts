export interface IProperty {
	city: string;
	description: string;
	displayable_address: string;
	id: string;
	image_354_255_url: string;
	image_645_430_url: string;
	images: Images[];
	latitude: number;
	status: string;
	longitude: number;
	num_bathrooms: string;
	num_bedrooms: string;
	price: string;
	thumbnail_url: string;
	title: string;
}

interface Images {
	"50x38": string;
	"80x60": string;
	"150x113": string;
	"240x180": string;
	"354x255": string;
	"480x360": string;
	"645x430": string;
	"768x576": string;
	"1024x768": string;
	caption: string;
	original: string;
}
