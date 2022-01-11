import { request } from "node:http";
import type { OutgoingHttpHeaders } from "node:http";
import { URLSearchParams } from "node:url";
import { RequestStatus, BaseURL } from "../types";
import type {
	Json,
	Path,
	RequestMethod,
	RequestOptions,
	Response,
} from "../types";
import type Rest from "./Rest";
import type FormData from "form-data";

/**
 * A class representing a request to the API
 */
export class APIRequest {
	/**
	 * The base url of this request
	 */
	baseUrl: string;

	/**
	 * The JSON body to send
	 */
	body?: Json;

	/**
	 * Headers to be sent in the request
	 */
	headers: OutgoingHttpHeaders;

	/**
	 * Method used for this request
	 */
	method: RequestMethod;

	/**
	 * The path of this request
	 */
	path: Path;

	/**
	 * Query applied to the request
	 */
	query: URLSearchParams;

	/**
	 * The rest manager client that instantiated this
	 */
	rest: Rest;

	/**
	 * The status of this request
	 */
	status = RequestStatus.Pending;

	/**
	 * @param rest - The rest manager client that instantiated this
	 * @param path - The path of this request
	 * @param method - Method used for this request
	 * @param options - Options for this request
	 */
	constructor(
		rest: Rest,
		path: Path,
		method: RequestMethod,
		options: RequestOptions = {}
	) {
		const {
			url = BaseURL,
			query = new URLSearchParams(),
			headers,
			body,
		} = options;

		this.method = method;
		this.path = path;
		this.rest = rest;
		this.baseUrl = url;
		this.body = body;
		this.query = query;
		this.headers = {
			...headers,
		};
	}

	/**
	 * The full URL of this request
	 */
	get url(): string {
		const url = `${this.baseUrl}${this.path}`;
		return url;
	}

	/**
	 * Edit headers for this request
	 * @param headers - Headers to add/remove
	 * @returns {this} - The new request
	 */
	public editHeaders(headers: RequestOptions["headers"]): this {
		this.headers = { ...this.headers, ...headers };
		return this;
	}

	/**
	 * Send the request to the api.
	 * @returns {Promise<Response>} - A promise with the data received from the API or null if there is no data
	 */
	public send(): Promise<Response> {
		let chunk: FormData | string;
		if (this.method === "GET" && this.body !== undefined)
			throw new TypeError(
				`Cannot send JSON data to ${this.path} path with method GET`
			);
		// eslint-disable-next-line prefer-const
		chunk = JSON.stringify(this.body);
		this.headers = {
			...this.headers,
			"Content-Type": "application/json",
		};

		return new Promise<Response>((resolve, reject) => {
			this.status = RequestStatus.InProgress;
			this.make(resolve, reject, chunk);
		});
	}

	/**
	 * Make the request to the API.
	 * @param resolve - A function to resolve the promise
	 * @param reject - A function to reject the promise
	 * @param chunk - The chunk to send
	 */
	private make(
		resolve: (value: PromiseLike<Response> | Response) => void,
		reject: (reason?: any) => void,
		chunk?: FormData | string
	): void {
		// This is the data we'll receive
		let data = "";
		const timeout = setTimeout(() => {
			// Abort the request if it takes more than 5 sec
			// eslint-disable-next-line @typescript-eslint/no-use-before-define
			req.destroy(
				new Error(
					`Request to path ${this.path} took more than 5 seconds and was aborted before ending.`
				)
			);
		}, 5_000).unref();
		const req = request(
			this.url,
			{
				headers: this.headers,
				method: this.method,
			},
			(res) => {
				// Handle a possible redirect
				if (
					[301, 302].includes(res.statusCode!) &&
					res.headers.location != null
				) {
					this.make(resolve, reject, chunk);
					return;
				}

				// Handle the data received
				res.on("data", (d) => {
					data += d;
				});
				res.once("end", () => {
					if (!res.complete)
						throw new Error(
							`Request to path ${this.path} ended before all data was transferred.`
						);
					clearTimeout(timeout);
					resolve({
						data: data || null,
						statusCode: res.statusCode!,
						headers: res.headers,
						status: res.statusMessage!,
						request: this,
					});
					this.status = RequestStatus.Finished;
				});
			}
		);

		req.once("error", (error) => {
			reject(
				new Error(`Request to ${this.url} failed with reason: ${error.message}`)
			);
			this.status = RequestStatus.Failed;
		});
		// Send the data, if present
		if (chunk != null) req.write(chunk);
		req.end();
	}
}

export default APIRequest;
