import { Rest } from ".";
import { Cat } from "./structures/Cat";

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

	async cat(): Promise<Cat | null> {
		const cat: string | null = await this.rest.request("/cat", "GET");
		return cat != null ? new Cat(cat) : null;
	}
}
