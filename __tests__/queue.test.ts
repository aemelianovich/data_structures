import { Queue } from '../src/index';
import StructIsEmptyError from '../src/data_structures/errors/struct_empty_error';

describe('Queue<number>', () => {
  test('Check queue is empty or not', () => {
    const queue = new Queue<number>();
    expect(queue.isEmpty()).toBeTruthy();
    queue.push(1);
    expect(queue.isEmpty()).toBeFalsy();
  });

  test('Insert element into the end of queue', () => {
    const queue = new Queue<number>();

    queue.push(1);
    queue.push(2);
    queue.push(3);

    let num = 1;
    for (const item of queue) {
      expect(item).toBe(num);
      num++;
    }
  });

  test('Extract element from the beginning of the queue', () => {
    const queue = new Queue<number>();

    expect(() => queue.shift()).toThrow(StructIsEmptyError);

    queue.push(1);
    queue.push(2);
    queue.push(3);

    expect(queue.shift()).toBe(1);
    expect(queue.shift()).toBe(2);
    expect(queue.shift()).toBe(3);

    expect(queue.isEmpty()).toBeTruthy();
  });

  test('Get first element of the queue without extracting', () => {
    const queue = new Queue<number>();
    expect(() => queue.head()).toThrow(StructIsEmptyError);

    queue.push(1);
    queue.push(2);
    queue.push(3);

    expect(queue.head()).toBe(1);

    queue.shift();

    expect(queue.head()).toBe(2);
  });
});
