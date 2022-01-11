import type { EndpointResponse } from "..";

/**
 * A class representing the response from the fact endpoint
 */
export class Fact {
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
	constructor(data: EndpointResponse) {
		this.status = data.status;
		this.result = data.url;
	}
}
