import type { EndpointResponse } from "..";

/**
 * A class representing the response from the cat endpoint
 */
export class Dog {
	/**
	 * The status of the request
	 */
	status: number | string;

	/**
	 * The result of the request
	 */
	result: string;

	/**
	 * @param data - The data received in the request
	 */
	constructor(data: string) {
		const parsed: EndpointResponse = JSON.parse(data) as EndpointResponse;
		this.status = parsed.status;
		this.result = parsed.url;
	}
}
