export default interface Queue<T> {
  push(data: T): void;
  shift(): T;
  head(): T;
  isEmpty(): boolean;
  showQueue(): void;
}
