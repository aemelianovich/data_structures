export default interface Stack<T> {
  push(data: T): void;
  pop(): T;
  peek(): T;
  isFull(): boolean;
  isEmpty(): boolean;
}
