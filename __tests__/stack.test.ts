import { Stack } from '../src/index';
import StructIsEmptyError from '../src/data_structures/errors/struct_empty_error';
import StructOverflowError from '../src/data_structures/errors/struct_overflow_error';

describe('test Stack<number>', () => {
  const stack = new Stack<number>(3);

  test('Stack basic operations', () => {
    expect(stack.isEmpty()).toBeTruthy();
    stack.push(1);
    expect(stack.isFull()).toBeFalsy();

    stack.push(2);
    stack.push(3);

    expect(stack.isFull()).toBeTruthy();
    expect(stack.isEmpty()).toBeFalsy();

    expect(stack.peek()).toBe(3);
    expect(stack.pop()).toBe(3);
    expect(stack.peek()).toBe(2);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);

    expect(stack.isEmpty()).toBeTruthy();
  });

  test('Stack errors', () => {
    expect(() => stack.peek()).toThrow(StructIsEmptyError);
    expect(() => stack.pop()).toThrow(StructIsEmptyError);
    stack.push(1);
    stack.push(1);
    stack.push(1);
    expect(() => stack.push(1)).toThrow(StructOverflowError);
  });
});
