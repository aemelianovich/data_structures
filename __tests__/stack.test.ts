import { Stack } from '../src/index';
import StructIsEmptyError from '../src/data_structures/errors/struct_empty_error';
import StructOverflowError from '../src/data_structures/errors/struct_overflow_error';

describe('Stack<number>', () => {
  test('Check stack is empty or not', () => {
    const stack = new Stack<number>(3);
    expect(stack.isEmpty()).toBeTruthy();
    stack.push(1);
    expect(stack.isEmpty()).toBeFalsy();
  });

  test('Check stack is full or not', () => {
    const stack = new Stack<number>(2);
    expect(stack.isFull()).toBeFalsy();
    stack.push(1);
    expect(stack.isFull()).toBeFalsy();
    stack.push(2);
    expect(stack.isFull()).toBeTruthy();
  });

  test('Insert element into the end of the stack', () => {
    const stack = new Stack<number>(3);

    stack.push(1);
    expect(stack.peek()).toBe(1);
    stack.push(2);
    expect(stack.peek()).toBe(2);
    stack.push(3);
    expect(stack.peek()).toBe(3);
    expect(() => stack.push(1)).toThrow(StructOverflowError);
  });

  test('Extract element from the end of stack', () => {
    const stack = new Stack<number>(3);

    expect(() => stack.pop()).toThrow(StructIsEmptyError);

    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);

    expect(stack.isEmpty()).toBeTruthy();
  });

  test('Get the last element of the stack without extracting', () => {
    const stack = new Stack<number>(3);

    stack.push(1);
    stack.push(2);
    stack.push(3);

    expect(stack.peek()).toBe(3);

    stack.pop();

    expect(stack.peek()).toBe(2);
  });
});
