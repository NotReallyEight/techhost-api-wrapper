import type { MemeEndpointResponse } from "..";

/**
 * A class representing the response from the cat endpoint
 */
export class Meme {
	/**
	 * The status of the request
	 */
	status: number | string;

	/**
	 * The post of the meme
	 */
	post: string;

	/**
	 * The title of the meme
	 */
	title: string;

	/**
	 * The image or the url of the meme
	 */
	result: string;

	/**
	 * @param data - The data received in the request
	 */
	constructor(data: MemeEndpointResponse) {
		this.status = data.status;
		this.post = data.url;
		this.title = data.title;
		this.result = data.image;
	}
}
