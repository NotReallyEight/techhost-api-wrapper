import { Rest } from ".";
import { Cat } from "./structures/Cat";
import { Dog } from "./structures/Dog";
import { Fact } from "./structures/Fact";

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
		const cat: string | null = await this.rest.request("/cat", "GET");
		return cat != null ? new Cat(cat) : null;
	}

	/**
	 * Get a url of a dog image
	 * @returns - The Dog class
	 */
	async dog(): Promise<Dog | null> {
		const dog: string | null = await this.rest.request("/dog", "GET");
		return dog != null ? new Dog(dog) : null;
	}

	/**
	 * Get a random fact
	 * @returns - The Fact class
	 */
	async fact(): Promise<Fact | null> {
		const fact: string | null = await this.rest.request("/fact", "GET");
		return fact != null ? new Fact(fact) : null;
	}
}
