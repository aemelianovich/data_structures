import { Dequeue } from '../src/index';
import StructIsEmptyError from '../src/data_structures/errors/struct_empty_error';

describe('Dequeue<number>', () => {
  test('Check dequeue is empty or not', () => {
    const dequeue = new Dequeue<number>();
    expect(dequeue.isEmpty()).toBeTruthy();
    dequeue.push(1);
    expect(dequeue.isEmpty()).toBeFalsy();
  });

  test('Insert element into the end of dequeue', () => {
    const dequeue = new Dequeue<number>();

    dequeue.push(1);
    dequeue.push(2);
    dequeue.push(3);

    let num = 1;
    for (const item of dequeue) {
      expect(item).toBe(num);
      num++;
    }
  });

  test('Insert element in the beginning of the dequeue', () => {
    const dequeue = new Dequeue<number>();

    dequeue.unshift(1);
    dequeue.unshift(2);
    dequeue.unshift(3);

    let num = 3;
    for (const item of dequeue) {
      expect(item).toBe(num);
      num--;
    }
  });

  test('Extract element from the beginning of the dequeue', () => {
    const dequeue = new Dequeue<number>();

    expect(() => dequeue.shift()).toThrow(StructIsEmptyError);

    dequeue.push(1);
    dequeue.push(2);
    dequeue.push(3);

    expect(dequeue.shift()).toBe(1);
    expect(dequeue.shift()).toBe(2);
    expect(dequeue.shift()).toBe(3);

    expect(dequeue.isEmpty()).toBeTruthy();
  });

  test('Extract element from the end of dequeue', () => {
    const dequeue = new Dequeue<number>();

    expect(() => dequeue.pop()).toThrow(StructIsEmptyError);

    dequeue.push(1);
    dequeue.push(2);
    dequeue.push(3);

    expect(dequeue.pop()).toBe(3);
    expect(dequeue.pop()).toBe(2);
    expect(dequeue.pop()).toBe(1);

    expect(dequeue.isEmpty()).toBeTruthy();
  });

  test('Get first element of the dequeue without extracting', () => {
    const dequeue = new Dequeue<number>();
    expect(() => dequeue.head()).toThrow(StructIsEmptyError);

    dequeue.push(1);
    dequeue.push(2);
    dequeue.push(3);

    expect(dequeue.head()).toBe(1);

    dequeue.shift();

    expect(dequeue.head()).toBe(2);
  });

  test('Get the last element of the dequeue without extracting', () => {
    const dequeue = new Dequeue<number>();
    expect(() => dequeue.tail()).toThrow(StructIsEmptyError);

    dequeue.push(1);
    dequeue.push(2);
    dequeue.push(3);

    expect(dequeue.tail()).toBe(3);

    dequeue.pop();

    expect(dequeue.tail()).toBe(2);
  });
});
