import { validateFullAmenities } from "./helpers";
import { Resolvers } from "./types";

export const resolvers: Resolvers = {
	Query: {
		featuredListings: (_, __, { dataSource }) => {
			return dataSource.listingAPI.getFeaturedListings();
		},
		listing: (_, { id }, { dataSource }) => {
			return dataSource.listingAPI.getListing(id);
		},
	},

	Mutation: {
		createListing: async (_, { input }, { dataSource }) => {
			try {
				const response = await dataSource.listingAPI.createListing(input);
				// console.log(response);
				return {
					code: 200,
					success: true,
					message: "Listing successfully created",
					listing: response,
				};
			} catch (error) {
				return {
					code: 500,
					success: false,
					message: `Something went wrong: ${error.extensions.response.body}`,
					listing: null,
				};
			}
		},
	},

	Listing: {
		amenities: ({ id, amenities }, _, { dataSource }) => {
			return validateFullAmenities(amenities)
				? amenities
				: dataSource.listingAPI.getAmenities(id);
		},
	},
};
