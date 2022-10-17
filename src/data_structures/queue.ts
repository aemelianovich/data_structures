import type { default as QueueInterface } from './interfaces/queue';
import { default as DoublyLinkedList } from './doubly_linked_list';

export default class Queue<T> implements QueueInterface<T> {
  #list: DoublyLinkedList<T>;

  constructor() {
    this.#list = new DoublyLinkedList<T>();
  }

  push(value: T): void {
    this.#list.insertLast(value);
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new Error('QueueIsEmptyError');
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.#list.deleteFirst()!.value;
  }

  head(): T {
    if (this.isEmpty()) {
      throw new Error('QueueIsEmptyError');
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
}
