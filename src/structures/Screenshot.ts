import type { EndpointResponse } from "..";

/**
 * A class representing the response from the screenshot endpoint
 */
export class Screenshot {
	/**
	 * The status of the request
	 */
	status: number | string;

	/**
	 * The url of the screenshot
	 */
	url: string;

	/**
	 * @param data - The data received in the request
	 */
	constructor(data: EndpointResponse) {
		this.status = data.status;
		this.url = data.url;
	}
}
