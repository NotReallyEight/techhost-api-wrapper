import type { Client } from "../Client";
import { AsyncQueue } from "@sapphire/async-queue";
import APIRequest from "./APIRequest";
import type { Json, Path, RequestMethod, RequestOptions } from "../types";

/**
 * A rest manager for the client
 */
export class Rest {
	/**
	 * The client that instantiated this class
	 */
	client: Client;

	/**
	 * A queue for the requests
	 */
	queue = new AsyncQueue();

	/**
	 * All requests that have been made so far
	 */
	requests: APIRequest[] = [];

	/**
	 * Number of requests done in the last second
	 */
	requestsPerSecond = 0;

	/**
	 * When the requests per second were last reset
	 */
	requestsPerSecondResetAt = Date.now();

	/**
	 * @param client - The client that instantiated this class
	 */
	constructor(client: Client) {
		this.client = client;

		/**
		 * Reset the requests per second every second
		 */
		setInterval(() => {
			this.requestsPerSecond = 0;
			this.requestsPerSecondResetAt = Date.now();
		}, 1_000).unref();
	}

	/**
	 * Make a GET request to the API.
	 * @param path - The path to request
	 * @param options - Other options for this request
	 * @param retry - If the request should be retried in case of a 5xx response
	 * @template T - The return type that should be used by the function
	 * @returns - The JSON data received from the API or null if no data was received
	 */
	public get<T = Json | null>(
		path: Path,
		options?: Omit<RequestOptions, "body">,
		retry?: boolean
	): Promise<T> {
		return this.request(path, "GET", options, retry);
	}

	/**
	 * Make a request to the API.
	 * @param path - The path to request
	 * @param method - The method of the request
	 * @param options - Other options for this request
	 * @param retry - If the request should be retried in case of a 5xx response
	 * @template T The return type that should be used by the function
	 * @returns The JSON data received from the API or null if no data was received
	 */
	request<T = Json | null>(
		path: Path,
		method: "GET",
		options?: Omit<RequestOptions, "body">,
		retry?: boolean
	): Promise<T>;
	request<T = Json | null>(
		path: Path,
		method: Exclude<RequestMethod, "GET">,
		options?: RequestOptions,
		retry?: boolean
	): Promise<T>;
	public async request(
		path: Path,
		method: RequestMethod,
		options: RequestOptions,
		retry = true
	) {
		await this.queue.wait();

		const request = new APIRequest(this, path, method, options);

		this.requests.push(request);

		this.requestsPerSecond++;

		let data;
		const res = await request.send();

		if (res.statusCode >= 200 && res.statusCode < 300)
			// If the request is ok parse the data received
			data =
				res.headers["content-type"] === "application/json"
					? (JSON.parse(res.data!) as unknown)
					: res.data;
		else if (res.statusCode >= 300 && res.statusCode < 400)
			// In this case we have no data
			data = null;
		else if (res.statusCode >= 500 && retry) {
			// If there's a server error retry just one time
			this.queue.shift();
			return this.request(path, method as "DELETE", options, false);
		}

		this.queue.shift();
		if (data !== undefined) return data;

		throw new Error(`${res.statusCode} ${res.status}`);
	}
}

export default Rest;
