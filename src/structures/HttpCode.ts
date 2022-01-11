import type { HttpCodeEndpointResponse } from "..";

/**
 * A class representing the response from the cat endpoint
 */
export class HttpCode {
	/**
	 * The status of the request
	 */
	status: number | string;

	/**
	 * The status code
	 */
	code: number;

	/**
	 * The name of the status code
	 */
	name: string;

	/**
	 * The description of the status code
	 */
	description: string;

	/**
	 * @param data - The data received in the request
	 */
	constructor(data: HttpCodeEndpointResponse) {
		this.status = data.status;
		this.code = data.code;
		this.name = data.name;
		this.description = data.description;
	}
}
