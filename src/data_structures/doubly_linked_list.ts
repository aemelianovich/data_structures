import type {
  default as DoublyLinkedListInterface,
  Link as LinkInterface,
} from './interfaces/doubly_linked_list';

class Link<T> implements LinkInterface<T> {
  value: T;
  next: LinkInterface<T> | null = null;
  prev: LinkInterface<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
  showLink(): void {
    console.log(this.value);
  }
}

export default class DoublyLinkedList<T = unknown>
  implements DoublyLinkedListInterface<T>, Iterable<Link<T>>
{
  #first: Link<T> | null;
  #last: Link<T> | null;

  get first(): Link<T> | null {
    return this.#first;
  }
  get last(): Link<T> | null {
    return this.#last;
  }

  constructor() {
    this.#first = null;
    this.#last = null;
  }

  insertFirst(value: T): void {
    const newLink = new Link(value);
    if (this.isEmpty()) {
      this.#last = newLink;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.#first!.prev = newLink;
    }

    newLink.next = this.#first;
    this.#first = newLink;
  }

  insertLast(value: T): void {
    const newLink = new Link(value);
    if (this.isEmpty()) {
      this.#first = newLink;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.#last!.next = newLink;
      newLink.prev = this.#last;
    }

    this.#last = newLink;
  }

  insertAfter(key: T, value: T): boolean {
    let matchedLink = null;

    // Find link with matched key
    for (const link of this) {
      if (link.value === key) {
        matchedLink = link;
        break;
      }
    }

    // Remove matched link from the list
    if (matchedLink !== null) {
      const newLink = new Link(value);

      // Last link
      if (matchedLink.next === null) {
        this.#last = newLink;
        // Not a last link
      } else {
        newLink.next = matchedLink.next;
        matchedLink.next.prev = newLink;
      }

      newLink.prev = matchedLink;
      matchedLink.next = newLink;
      return true;
    } else {
      return false;
    }
  }

  deleteFirst(): Link<T> | null {
    if (this.#first === null) {
      return null;
    }

    const deletedLink = this.#first;

    if (this.#first.next === null) {
      this.#last = null;
    } else {
      this.#first.next.prev = null;
    }

    this.#first = this.#first.next;

    return deletedLink;
  }

  deleteLast(): Link<T> | null {
    if (this.#last === null) {
      return null;
    }

    const deletedLink = this.#last;

    if (this.#last.prev === null) {
      this.#first = null;
    } else {
      this.#last.prev.next = null;
    }

    this.#last = this.#last.prev;

    return deletedLink;
  }

  find(key: T): Link<T> | null {
    for (const link of this) {
      if (link.value === key) {
        return link;
      }
    }

    return null;
  }

  delete(key: T): Link<T> | null {
    let matchedLink = null;

    // Find link with matched key
    for (const link of this) {
      if (link.value === key) {
        matchedLink = link;
        break;
      }
    }

    // Remove matched link from the list
    if (matchedLink !== null) {
      // first link
      if (matchedLink.prev === null) {
        this.#first = matchedLink.next;
      } else {
        matchedLink.prev.next = matchedLink.next;
      }

      // if matchedLink is the last element
      if (matchedLink.next === null) {
        this.#last = matchedLink.prev;
      } else {
        matchedLink.next.prev = matchedLink.prev;
      }
    }

    return matchedLink;
  }

  isEmpty(): boolean {
    return this.#first === null;
  }

  *[Symbol.iterator](): Iterator<Link<T>> {
    let current = this.#first;

    while (current) {
      yield current;
      current = current.next;
    }
  }

  reverse(): Iterable<Link<T>> {
    let current = this.#last;
    return {
      *[Symbol.iterator](): Iterator<Link<T>> {
        while (current) {
          yield current;
          current = current.prev;
        }
      },
    };
  }

  showList(): void {
    for (const link of this) {
      link.showLink();
    }
  }

  showBackwardList(): void {
    for (const link of this.reverse()) {
      link.showLink();
    }
  }
}
