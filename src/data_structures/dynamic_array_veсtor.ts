import StructRandomInsertError from './errors/struct_random_insert_error';
import StructIsEmptyError from './errors/struct_empty_error';

class DynamicArrayVector<T = unknown> {
  static isIndex(index: string): boolean {
    const indx = Number(index);
    // Check that it is index - positive number and not a float
    return !isNaN(indx) && indx >= 0 && indx % 1 === 0;
  }

  #vector: T[];
  #capacity: number;
  [key: number]: T;
  length = 0;

  constructor(capacity: number) {
    this.#capacity = capacity;
    this.#vector = new Array(capacity);
  }

  #extendVector() {
    const newCapacity = this.#capacity * 2;
    const newVector = new Array(newCapacity);
    let idx = 0;
    while (idx < this.length) {
      newVector[idx] = this.#vector[idx];
      idx++;
    }

    this.#vector = newVector;
    this.#capacity = newCapacity;
  }

  get(index: number): T | undefined {
    if (index > this.length - 1) {
      return undefined;
    }

    return this.#vector[index];
  }

  set(index: number, value: T): void {
    // Using index notation we can update existing values in the array
    // Or add new value which should be equal to the next empty index
    // Insertion into a random place does not allowed
    // We should use push to add new values in the end of array
    if (index > this.length) {
      throw new StructRandomInsertError('DynamicArrayVector');
    }
    // Process push method
    else if (index === this.length) {
      this.push(value);
    }
    // Update element
    else {
      this.#vector[index] = value;
    }
  }

  push(value: T): void {
    // If there is no empty place, then extend vector
    if (this.length === this.#capacity) {
      this.#extendVector();
    }

    this.#vector[this.length] = value;
    this.length++;
  }

  pop(): T {
    if (this.length === 0) {
      throw new StructIsEmptyError('DynamicArrayVector');
    }

    const value = <T>this.get(this.length - 1);
    this.length--;

    return value;
  }

  shift(): T {
    if (this.length === 0) {
      throw new StructIsEmptyError('DynamicArrayVector');
    }

    const value = this.get(0);
    let idx = 1;
    while (idx < this.length) {
      this.#vector[idx - 1] = this.#vector[idx];
      idx++;
    }

    this.length--;

    return <T>value;
  }

  unshift(value: T): void {
    // If there is no empty place, then extend vector
    if (this.length === this.#capacity) {
      this.#extendVector();
    }

    let idx = this.length - 1;
    while (idx >= 0) {
      this.#vector[idx + 1] = this.#vector[idx];
      idx--;
    }

    this.#vector[0] = value;
    this.length++;
  }

  [Symbol.iterator](): IterableIterator<unknown> {
    function* iter(this: DynamicArrayVector) {
      if (this.length === 0) {
        return;
      }
      let indx = 0;
      for (const item of this.#vector) {
        yield item;
        indx++;
        if (indx === this.length) {
          return;
        }
      }
    }

    const i = iter.call(this);

    return {
      [Symbol.iterator]() {
        return this;
      },
      next: () => i.next(),
    };
  }
}

const proxy = new Proxy(DynamicArrayVector, {
  construct(target, [capacity]) {
    const arr = <DynamicArrayVector>new target(capacity);

    return new Proxy(arr, {
      get(target, p, receiver) {
        if (typeof p === 'string') {
          // Process access by index
          if (DynamicArrayVector.isIndex(p)) {
            return target.get(Number(p));
          }
        }

        const val = Reflect.get(target, p, receiver);

        if (typeof val === 'function') {
          return val.bind(target);
        }

        return val;
      },

      set(target, p, value, receiver) {
        if (typeof p === 'string') {
          // Process set by index
          if (DynamicArrayVector.isIndex(p)) {
            target.set(Number(p), value);
          }
        }
        return Reflect.set(target, p, value, receiver);
      },
    });
  },
});

export default proxy;
