import type { default as QueueInterface } from './interfaces/queue';
import { default as DoublyLinkedList } from './doubly_linked_list';
import StructIsEmptyError from './errors/struct_empty_error';

export default class Queue<T> implements QueueInterface<T> {
  #list: DoublyLinkedList<T>;

  constructor() {
    this.#list = new DoublyLinkedList<T>();
  }

  push(value: T): void {
    this.#list.insertLast(value);
  }

  shift(): T {
    if (this.isEmpty()) {
      throw new StructIsEmptyError('Queue');
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.#list.deleteFirst()!.value;
  }

  head(): T {
    if (this.isEmpty()) {
      throw new StructIsEmptyError('Queue');
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.#list.first!.value;
  }

  isEmpty(): boolean {
    return this.#list.isEmpty();
  }

  showQueue(): void {
    this.#list.showList();
  }

  [Symbol.iterator](): IterableIterator<T> {
    function* iter(this: Queue<T>) {
      for (const link of this.#list) {
        yield link.value;
      }
    }

    const i = iter.call(this);

    return {
      [Symbol.iterator]() {
        return this;
      },
      next: () => i.next(),
    };
  }
}
