import { ICacheStore } from "../../src/";

export class StubStore<K, T> implements ICacheStore<K, T> {
	private readonly store: Map<K, T> = new Map<K, T>();

	public get(key: K): T | undefined {
		return this.store.get(key);
	}

	public getMany(keys: K[]): Array<T | undefined> {
		return [...keys].map((key: K) => this.store.get(key));
	}

	public put(key: K, value: T): boolean {
		this.store.set(key, value);

		return this.store.has(key);
	}

	public putMany(values: Record<string | number | symbol, T>): boolean[] {
		// @ts-ignore
		return Object.keys(values).map(key => this.put(key, values[key]));
	}

	public has(key: K): boolean {
		return this.store.has(key);
	}

	public hasMany(keys: K[]): boolean[] {
		return [...keys].map((key: K) => this.store.has(key));
	}

	public missing(key: K): boolean {
		return !this.has(key);
	}

	public missingMany(keys: K[]): boolean[] {
		return [...keys].map((key: K) => this.missing(key));
	}

	public forever(key: K, value: T): boolean {
		this.store.set(key, value);

		return this.store.has(key);
	}

	public foreverMany(values: Record<string | number | symbol, T>): boolean[] {
		// @ts-ignore
		return Object.keys(values).map(key => this.forever(key, values[key]));
	}

	public forget(key: K): boolean {
		return this.store.delete(key);
	}

	public forgetMany(keys: K[]): boolean[] {
		return [...keys].map((key: K) => this.forget(key));
	}

	public flush(): boolean {
		this.store.clear();

		return this.count() === 0;
	}

	public count(): number {
		return this.store.size;
	}

	public getPrefix(): string {
		return "prefix";
	}
}