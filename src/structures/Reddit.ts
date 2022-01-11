import type { RedditEndpointResponse } from "..";

/**
 * A class representing the response from the reddit endpoint
 */
export class Reddit {
	/**
	 * The status of the request
	 */
	status: number | string;

	/**
	 * The result of the request
	 */
	result: string;

	/**
	 * The image of the post
	 */
	image: string;

	/**
	 * The title of the post
	 */
	title: string;

	/**
	 * @param data - The data received in the request
	 */
	constructor(data: RedditEndpointResponse) {
		this.status = data.status;
		this.result = data.url;
		this.image = data.image;
		this.title = data.title;
	}
}
