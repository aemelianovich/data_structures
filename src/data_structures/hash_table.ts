import DoublyLinkedList from './doubly_linked_list';

type Key = {
  toString(): string;
};

// HashTable that resolves collisions by chaining method based on Linked List
export default class HashTable<T> {
  #store: Array<DoublyLinkedList<[K: string, V: T]>>;
  #capacity: number;

  constructor(capacity: number) {
    if (capacity < 2) {
      throw new Error('Capacity should be more or equal to 2');
    }
    this.#capacity = this.#findPrime(capacity);
    this.#store = new Array(this.#capacity);
  }

  //find closest prime to given number using sieve of Eratosthenes
  #findPrime(n: number): number {
    const arr = new Array(n + 1).fill(true);
    for (let i = 2; i < Math.ceil(Math.sqrt(n)); i++) {
      if (arr[i]) {
        // All numbers that equal to i*i, i*i + x*i are not prime
        let j = i * i;
        while (j <= n) {
          arr[j] = false;
          j = j + i;
        }
      }
    }

    for (let i = arr.length - 1; i > 0; i--) {
      if (arr[i]) {
        return i;
      }
    }
    return 1;
  }

  #getHash(key: string): number {
    let sum = 0;
    for (const char of key) {
      sum += char.codePointAt(0) ?? 1;
    }
    return sum % this.#capacity;
  }

  set(key: Key, value: T): void {
    const sKey = key.toString();
    const hashKey = this.#getHash(sKey);

    if (this.#store[hashKey] === undefined) {
      this.#store[hashKey] = new DoublyLinkedList<[K: string, V: T]>();
    }

    // Update value and return
    for (const link of this.#store[hashKey]) {
      if (link.value[0] === sKey) {
        link.value = [sKey, value];
        return;
      }
    }

    // Add as a new value if not exists
    this.#store[hashKey].insertLast([sKey, value]);
  }

  get(key: Key): T | undefined {
    const sKey = key.toString();
    const hashKey = this.#getHash(sKey);

    if (this.#store[hashKey] === undefined) {
      return undefined;
    }

    for (const link of this.#store[hashKey]) {
      if (link.value[0] === sKey) {
        return link.value[1];
      }
    }

    return undefined;
  }

  keys(): IterableIterator<string | undefined> {
    function* iter(this: Array<DoublyLinkedList<[K: string, V: T]>>) {
      for (const list of this) {
        if (list === undefined) {
          continue;
        }
        for (const link of list) {
          yield link.value[0];
        }
      }
    }

    const i = iter.call(this.#store);
    return {
      [Symbol.iterator]() {
        return this;
      },
      next: () => {
        const res = i.next();
        return { value: res?.value || undefined, done: res.done };
      },
    };
  }
}
