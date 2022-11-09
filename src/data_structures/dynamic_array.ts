import type { Link } from './interfaces/doubly_linked_list';
import DoublyLinkedList from './doubly_linked_list';
import StructRandomInsertError from './errors/struct_random_insert_error';
import StructIsEmptyError from './errors/struct_empty_error';

export default class DynamicArray<T = unknown> {
  static isIndex(index: string): boolean {
    const indx = Number(index);
    // Check that it is index - positive number and not a float
    return !isNaN(indx) && indx >= 0 && indx % 1 === 0 && indx < 2 ** 32;
  }

  #list: DoublyLinkedList<T[]>;
  #capacity: number;
  #listLength = 0;
  [key: number]: T;
  length = 0;

  constructor(capacity: number) {
    this.#capacity = capacity;
    this.#list = new DoublyLinkedList();
    // Create first initial array
    const arr = new Array(this.#capacity);
    this.#list.insertLast(arr);
    this.#listLength++;

    return new Proxy(this, {
      get(target, p, receiver) {
        if (typeof p === 'string') {
          // Process access by index
          if (DynamicArray.isIndex(p)) {
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
          if (DynamicArray.isIndex(p)) {
            target.set(Number(p), value);
          }
        }
        return Reflect.set(target, p, value, receiver);
      },
    });
  }

  #getListIndex(index: number): number {
    // Starting from 0
    return Math.floor(index / this.#capacity);
  }

  #getLocalIndex(index: number): number {
    return index % this.#capacity;
  }

  #isForwardIter(index: number): boolean {
    // Get forward Iterable list if target list index in the first half
    // Otherwise backward Iterable list
    if (this.#getListIndex(index) < Math.trunc(this.#listLength / 2)) {
      return true;
    }
    return false;
  }

  #getStartLinkEndLink(
    startIndex: number,
    endIndex: number,
  ): { startLink: Link<T[]> | null; endLink: Link<T[]> | null } {
    if (startIndex > endIndex) {
      throw new Error(
        `startIndex should be less or equal to the endIndex, startIndex: ${startIndex}, endIndex: ${endIndex} .`,
      );
    }

    if (startIndex > this.length - 1 || endIndex > this.length - 1) {
      throw new Error(
        `startIndex and endIndex should be less or equal to the lastIndex, startIndex: ${startIndex}, endIndex: ${endIndex}, lastIndex: ${
          this.length - 1
        } .`,
      );
    }

    if (startIndex < 0 || endIndex < 0) {
      throw new Error(
        `startIndex and endIndex should be positive number: ${startIndex}, endIndex: ${endIndex} .`,
      );
    }

    // Go through the list to find a startLink and endLink
    let currListIndex = 0;
    let startLinkIndex = this.#getListIndex(startIndex);
    let endLinkIndex = this.#getListIndex(endIndex);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let startLink = <Link<T[]>>(<any>null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let endLink = <Link<T[]>>(<any>null);

    let iterList = <Iterable<Link<T[]>>>this.#list;

    if (!this.#isForwardIter(startIndex)) {
      // reversed values, because
      // we need to calc startLink and endLink in the forward direction
      [endLinkIndex, startLinkIndex] = [
        this.#listLength - startLinkIndex - 1,
        this.#listLength - endLinkIndex - 1,
      ];
      iterList = this.#list.reverse();
    }

    for (const link of iterList) {
      if (currListIndex === startLinkIndex) {
        startLink = link;
      }

      if (currListIndex === endLinkIndex) {
        endLink = link;
        break;
      }
      currListIndex++;
    }

    return { startLink, endLink };
  }

  // Remove elements from the Dynamic Array
  // startIndex and endIndex included
  #removeElements(startIndex: number, endIndex: number): void {
    if (this.length === 0) {
      throw new StructIsEmptyError('DynamicArray');
    }

    // Number of elements for deletion
    const delCount = endIndex - startIndex + 1;

    const { startLink, endLink } = this.#getStartLinkEndLink(
      startIndex,
      endIndex,
    );

    // Move values to the new position instead of removed elements

    // source - element that should be moved to the new position
    let sourceIndex = endIndex + 1;
    let sourceLink =
      this.#getLocalIndex(endIndex) === this.#capacity - 1
        ? endLink?.next
        : endLink;

    // target - element where we should move source element
    let targetLink = startLink;
    let targetIndex = startIndex;

    // Move all source elements to the new positions
    while (sourceIndex < this.length) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      targetLink!.value[this.#getLocalIndex(targetIndex)] =
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        sourceLink!.value[this.#getLocalIndex(sourceIndex)];

      // Swith sources to the next element
      sourceLink =
        this.#getLocalIndex(sourceIndex) === this.#capacity - 1
          ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            sourceLink!.next
          : sourceLink;
      sourceIndex++;

      // Switch target to the next element
      targetLink =
        this.#getLocalIndex(targetIndex) === this.#capacity - 1
          ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            <Link<T[]>>targetLink!.next
          : targetLink;
      targetIndex++;
    }

    // Calc new list length and adjsut exisitng length accordingly
    const targetListLength = this.#getListIndex(targetIndex - 1) + 1;

    while (this.#listLength > targetListLength) {
      this.#list.deleteLast();
      this.#listLength--;
    }

    // Adjsut arr length accordingly
    this.length -= delCount;
  }

  get(index: number): T | undefined {
    if (index > this.length - 1) {
      return undefined;
    }

    // Go through the list to find a proper link
    const link = this.#getStartLinkEndLink(index, index).startLink;

    if (link !== null) {
      return link.value[this.#getLocalIndex(index)];
    }
    return undefined;
  }

  set(index: number, value: T): void {
    // Using index notation we can update existing values in the array
    // Or add new value which should be equal to the next empty index
    // Insertion into a random place does not allowed
    // We should use push to add new values in the end of array
    if (index > this.length) {
      throw new StructRandomInsertError('DynamicArray');
    }
    // Process push method
    else if (index === this.length) {
      this.push(value);
    }
    // Update element(Go through the list to find a proper element in the array)
    else {
      // Go through the list to find a proper element in the array
      const link = this.#getStartLinkEndLink(index, index).startLink;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      link!.value[this.#getLocalIndex(index)] = value;
    }
  }

  push(value: T): void {
    // If there is no empty place in the last fixed array then insert new link
    // length > 0 first array was inserted in the constructor
    if (this.length % this.#capacity === 0 && this.length > 0) {
      // Create new fixed array
      const arr = new Array(this.#capacity);
      arr[0] = value;
      this.#list.insertLast(arr);
      this.#listLength++;
      // Otherwise we have empty slot in the existing array
    } else {
      const localIndex = this.#getLocalIndex(this.length);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.#list.last!.value[localIndex] = value;
    }
    this.length++;
  }

  pop(): T {
    if (this.length === 0) {
      throw new StructIsEmptyError('DynamicArray');
    }

    const value = <T>this.get(this.length - 1);
    this.#removeElements(this.length - 1, this.length - 1);

    return value;
  }

  shift(): T {
    if (this.length === 0) {
      throw new StructIsEmptyError('DynamicArray');
    }

    const value = this.get(0);
    this.#removeElements(0, 0);

    return <T>value;
  }

  unshift(value: T): void {
    const arr = new Array(this.#capacity);
    arr[0] = value;
    this.#list.insertFirst(arr);
    this.#listLength++;
    this.length += this.#capacity;

    if (this.#capacity > 1) {
      this.#removeElements(1, this.#capacity - 1);
    }
  }

  [Symbol.iterator](): IterableIterator<unknown> {
    function* iter(this: DynamicArray) {
      if (this.length === 0) {
        return;
      }
      let indx = 0;
      for (const link of this.#list) {
        for (const item of link.value) {
          yield item;
          indx++;
          if (indx === this.length) {
            return;
          }
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
