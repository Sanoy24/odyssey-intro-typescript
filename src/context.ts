import { ListingAPI } from "./datasources/listing-api";

export type DataSourceContext = {
	dataSource: {
		listingAPI: ListingAPI;
	};
};
