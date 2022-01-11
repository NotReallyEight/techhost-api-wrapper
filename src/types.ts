import type { IncomingHttpHeaders, OutgoingHttpHeaders } from "node:http";
import type { URLSearchParams } from "node:url";
import type APIRequest from "./rest/APIRequest";

/**
 * The base URL of the API
 */
export const BaseURL = "http://api.techhost.live/v1";

export interface EndpointResponse {
	status: number | string;
	url: string;
}

export interface HttpCodeEndpointResponse
	extends Omit<EndpointResponse, "url"> {
	code: number;
	name: string;
	description: string;
}

/**
 * Any JSON data
 */
export type Json =
	| Json[]
	| boolean
	| number
	| string
	| { [property: string]: Json };

export interface MemeEndpointResponse extends EndpointResponse {
	title: string;
	image: string;
}

/**
 * The path for a request to the API
 */
export type Path = `/${string}`;

/**
 * The method of a request to the API
 */
export type RequestMethod = "DELETE" | "GET" | "PATCH" | "POST" | "PUT";

/**
 * The options for this request
 */
export interface RequestOptions {
	/**
	 * The base url for this request
	 */
	url?: string;
	/**
	 * The query of this request
	 */
	query?: URLSearchParams;
	/**
	 * Headers to be sent for this request
	 */
	headers?: OutgoingHttpHeaders;
	/**
	 * The JSON body of this request
	 */
	body?: Json;
}

/**
 * The status of a request to the API
 */
export enum RequestStatus {
	Pending,
	InProgress,
	Finished,
	Failed,
}

/**
 * A response received from the API
 */
export interface Response {
	/**
	 * The received data
	 */
	data: string | null;
	/**
	 * The status code received for this request
	 */
	statusCode: number;
	/**
	 * Headers received from the API
	 */
	headers: IncomingHttpHeaders;
	/**
	 * The status message received for this request
	 */
	status: string;
	/**
	 * The APIRequest object that instantiated this
	 */
	request: APIRequest;
}
