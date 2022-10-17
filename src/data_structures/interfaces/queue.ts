export default interface Queue<T> {
  push(data: T): void;
  pop(): T;
  head(): T;
  isEmpty(): boolean;
  showQueue(): void;
}
