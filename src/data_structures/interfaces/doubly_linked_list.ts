export interface Link<T> {
  value: T;
  next: Link<T> | null;
  prev: Link<T> | null;
  showLink(): void;
}

export default interface DoublyLinkedList<T> {
  get first(): Link<T> | null;
  get last(): Link<T> | null;
  insertFirst(value: T): void;
  insertLast(value: T): void;
  insertAfter(key: T, value: T): boolean;
  deleteFirst(): Link<T> | null;
  deleteLast(): Link<T> | null;
  delete(key: T): Link<T> | null;
  find(key: T): Link<T> | null;
  isEmpty(): boolean;
  showList(): void;
}
