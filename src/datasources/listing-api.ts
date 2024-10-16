import { RESTDataSource } from "@apollo/datasource-rest";
import { Listing, Amenity, CreateListingInput } from "../types";

export class ListingAPI extends RESTDataSource {
	baseURL = "https://rt-airlock-services-listing.herokuapp.com/";
	getFeaturedListings() {
		const listings = this.get<Listing[]>("featured-listings");
		return listings;
	}

	getListing(listingId: string) {
		return this.get<Listing>(`listings/${listingId}`);
	}
	getAmenities(listingId: string): Promise<Amenity[]> {
		console.log("Making a follow-up call for amenities with ", listingId);
		return this.get<Amenity[]>(`listings/${listingId}/amenities`);
	}

	createListing(listing: CreateListingInput): Promise<Listing> {
		return this.post<Listing>("listings", {
			body: { listing },
		});
	}
}
