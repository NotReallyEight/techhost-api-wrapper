import type { Json } from ".";
import { Rest } from ".";

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

	async cat(): Promise<Json | null> {
		const cat = await this.rest.request("/cat", "GET");
		return cat;
	}
}
