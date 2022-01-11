import type {
	EndpointResponse,
	HttpCodeEndpointResponse,
	MemeEndpointResponse,
	RedditEndpointResponse,
} from ".";
import { Rest } from ".";
import { Cat } from "./structures/Cat";
import { Dog } from "./structures/Dog";
import { Fact } from "./structures/Fact";
import { HttpCode } from "./structures/HttpCode";
import { Meme } from "./structures/Meme";
import { Reddit } from "./structures/Reddit";
import { Screenshot } from "./structures/Screenshot";

/**
 * The client class
 */
export class Client {
	/**
	 * The rest manager for the client
	 */
	rest: Rest;

	constructor() {
		this.rest = new Rest(this);
	}

	/**
	 * Get a url of a cat image
	 * @returns - The Cat class
	 */
	async cat(): Promise<Cat | null> {
		const cat: EndpointResponse | null = await this.rest.get("/cat");
		return cat != null ? new Cat(cat) : null;
	}

	/**
	 * Get a url of a dog image
	 * @returns - The Dog class
	 */
	async dog(): Promise<Dog | null> {
		const dog: EndpointResponse | null = await this.rest.get("/dog");
		return dog != null ? new Dog(dog) : null;
	}

	/**
	 * Get a random fact
	 * @returns - The Fact class
	 */
	async fact(): Promise<Fact | null> {
		const fact: EndpointResponse | null = await this.rest.get("/fact");
		return fact != null ? new Fact(fact) : null;
	}

	/**
	 * Get a random meme
	 * @returns - The Meme class
	 */
	async meme(): Promise<Meme | null> {
		const meme: MemeEndpointResponse | null = await this.rest.get("/meme");
		return meme != null ? new Meme(meme) : null;
	}

	/**
	 * Get information about an http code
	 * @param code - The http code
	 * @returns - The HttpCode class
	 */
	async httpCode(code: number): Promise<HttpCode | null> {
		const httpCode: HttpCodeEndpointResponse | null = await this.rest.get(
			`/http?code=${code}`
		);
		return httpCode != null ? new HttpCode(httpCode) : null;
	}

	/**
	 * Get a random post from a subreddit
	 * @param subreddit - The subreddit
	 * @returns - The Reddit class
	 */
	async reddit(subreddit: string): Promise<Reddit | null> {
		const post: RedditEndpointResponse | null = await this.rest.get(
			`/reddit?sub=${subreddit}`
		);
		return post != null ? new Reddit(post) : null;
	}

	/**
	 * Get a url from a screenshot
	 * @param url - The url
	 * @returns - The Screenshot class
	 */
	async screenshot(url: string): Promise<Screenshot | null> {
		const screenshot: EndpointResponse | null = await this.rest.get(
			`/screenshot?url=${url}`
		);
		return screenshot != null ? new Screenshot(screenshot) : null;
	}
}
