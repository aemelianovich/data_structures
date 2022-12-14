import { DynamicArrayVector } from '../src/index';
import StructIsEmptyError from '../src/data_structures/errors/struct_empty_error';
import StructRandomInsertError from '../src/data_structures/errors/struct_random_insert_error';

describe('DynamicArrayVector<number>', () => {
  test('Insert element into the end of dynamic array', () => {
    const arr = new DynamicArrayVector<number>(3);

    expect(arr.length).toBe(0);

    arr.push(1);
    arr.push(2);
    arr.push(3);
    arr.push(4);

    let num = 1;
    for (const item of arr) {
      expect(item).toBe(num);
      num++;
    }

    expect(arr.length).toBe(4);
  });

  test('Insert element in the beginning of the dynamic array', () => {
    const arr = new DynamicArrayVector<number>(3);

    expect(arr.length).toBe(0);

    arr.unshift(1);
    arr.unshift(2);
    arr.unshift(3);
    arr.unshift(4);

    let num = 4;
    for (const item of arr) {
      expect(item).toBe(num);
      num--;
    }

    expect(arr.length).toBe(4);
  });

  test('Extract element from the beginning of the dynamic array', () => {
    const arr = new DynamicArrayVector<number>(3);

    expect(() => arr.shift()).toThrow(StructIsEmptyError);

    arr.push(1);
    arr.push(2);
    arr.push(3);
    arr.push(4);
    arr.push(5);

    expect(arr.shift()).toBe(1);
    expect(arr.length).toBe(4);

    expect(arr.shift()).toBe(2);
    expect(arr.length).toBe(3);

    expect(arr.shift()).toBe(3);
    expect(arr.length).toBe(2);

    expect(arr.shift()).toBe(4);
    expect(arr.length).toBe(1);

    expect(arr.shift()).toBe(5);
    expect(arr.length).toBe(0);
  });

  test('Extract element from the end of dynamic array', () => {
    const arr = new DynamicArrayVector<number>(3);

    expect(() => arr.pop()).toThrow(StructIsEmptyError);

    arr.push(1);
    arr.push(2);
    arr.push(3);
    arr.push(4);
    arr.push(5);

    expect(arr.pop()).toBe(5);
    expect(arr.length).toBe(4);

    expect(arr.pop()).toBe(4);
    expect(arr.length).toBe(3);

    expect(arr.pop()).toBe(3);
    expect(arr.length).toBe(2);

    expect(arr.pop()).toBe(2);
    expect(arr.length).toBe(1);

    expect(arr.pop()).toBe(1);
    expect(arr.length).toBe(0);
  });

  test('Test bracket insert/update and access of the dynamic array elements', () => {
    const arr = new DynamicArrayVector<number>(3);
    expect(() => (arr[30] = 1)).toThrow(StructRandomInsertError);

    expect(arr.length).toBe(0);

    arr[0] = 1;
    arr[1] = 2;
    arr[2] = 3;
    arr[3] = 4;

    let num = 1;
    for (let i = 0; i < 4; i++) {
      expect(arr[i]).toBe(num);
      num++;
    }

    arr[2] = 10;
    expect(arr[2]).toBe(10);

    expect(arr.length).toBe(4);
  });

  test('Test binary search', () => {
    const arr = new DynamicArrayVector<number>(8);

    arr[0] = 1;
    arr[1] = 2;
    arr[2] = 3;
    arr[3] = 4;
    arr[4] = 4;
    arr[5] = 4;
    arr[6] = 6;
    arr[7] = 7;

    // Key in the middle of array
    let res = arr.binarySearch(4);
    expect(res.leftBound).toBe(2);
    expect(res.rightBound).toBe(6);

    // Key in the beginning of array
    res = arr.binarySearch(1);
    expect(res.leftBound).toBe(-1);
    expect(res.rightBound).toBe(1);

    // Key in the end of array
    res = arr.binarySearch(7);
    expect(res.leftBound).toBe(6);
    expect(res.rightBound).toBe(8);

    // Key not in the array
    res = arr.binarySearch(5);
    expect(res.leftBound).toBe(5);
    expect(res.rightBound).toBe(6);
  });
});
