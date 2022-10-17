export default interface Dequeue<T> {
  push(data: T): void;
  unshift(data: T): void;
  pop(): T;
  shift(): T;
  head(): T;
  tail(): T;
  isEmpty(): boolean;
  showDequeue(): void;
  showBackwardDequeue(): void;
}
