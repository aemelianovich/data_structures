import { Queue } from '../src/index';

describe('test Queue<number>', () => {
  const queue = new Queue<number>();

  test('Queue basic operations', () => {
    expect(queue.isEmpty()).toBeTruthy();
    queue.push(1);
    expect(queue.isEmpty()).toBeFalsy();

    queue.push(2);
    queue.push(3);

    expect(queue.head()).toBe(1);
    expect(queue.pop()).toBe(1);
    expect(queue.head()).toBe(2);
    expect(queue.pop()).toBe(2);
    expect(queue.pop()).toBe(3);

    expect(queue.isEmpty()).toBeTruthy();
  });

  test('Queue errors', () => {
    expect(() => queue.head()).toThrow('QueueIsEmptyError');
    expect(() => queue.pop()).toThrow('QueueIsEmptyError');
  });
});
