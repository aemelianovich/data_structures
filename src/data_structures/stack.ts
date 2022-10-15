import type { default as StackInterface } from './interfaces/stack';

export default class Stack<T> implements StackInterface<T> {
  #store: T[];
  #top: number;
  constructor(size: number) {
    this.#store = new Array(size);
    this.#top = -1;
  }
  push(data: T): void {
    if (this.isFull()) {
      throw new Error('StackOverflowError');
    }

    this.#store[++this.#top] = data;
  }
  pop(): T {
    if (this.isEmpty()) {
      throw new Error('StackIsEmptyError');
    }
    return this.#store[this.#top--];
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error('StackIsEmptyError');
    }
    return this.#store[this.#top];
  }

  isEmpty(): boolean {
    return this.#top === -1;
  }
  isFull(): boolean {
    return this.#top === this.#store.length - 1;
  }
}
