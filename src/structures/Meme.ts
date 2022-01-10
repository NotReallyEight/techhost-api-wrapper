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
	constructor(data: string) {
		const parsed: MemeEndpointResponse = JSON.parse(
			data
		) as MemeEndpointResponse;
		this.status = parsed.status;
		this.post = parsed.url;
		this.title = parsed.title;
		this.result = parsed.image;
	}
}
