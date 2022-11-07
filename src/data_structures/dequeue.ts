import type { default as DequeueInterface } from './interfaces/dequeue';
import { default as DoublyLinkedList } from './doubly_linked_list';
import StructIsEmptyError from './errors/struct_empty_error';

export default class Dequeue<T> implements DequeueInterface<T> {
  #list: DoublyLinkedList<T>;

  constructor() {
    this.#list = new DoublyLinkedList<T>();
  }

  push(value: T): void {
    this.#list.insertLast(value);
  }

  unshift(value: T): void {
    this.#list.insertFirst(value);
  }

  shift(): T {
    if (this.isEmpty()) {
      throw new StructIsEmptyError('Dequeue');
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.#list.deleteFirst()!.value;
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new StructIsEmptyError('Dequeue');
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.#list.deleteLast()!.value;
  }

  head(): T {
    if (this.isEmpty()) {
      throw new StructIsEmptyError('Dequeue');
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.#list.first!.value;
  }

  tail(): T {
    if (this.isEmpty()) {
      throw new StructIsEmptyError('Dequeue');
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.#list.last!.value;
  }

  isEmpty(): boolean {
    return this.#list.isEmpty();
  }

  showDequeue(): void {
    this.#list.showList();
  }

  showBackwardDequeue(): void {
    this.#list.showBackwardList();
  }

  [Symbol.iterator](): IterableIterator<T> {
    function* iter(this: Dequeue<T>) {
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
