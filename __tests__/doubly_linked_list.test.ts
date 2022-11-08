import { DoublyLinkedList } from '../src/index';

describe('DoublyLinkedList<number | string>', () => {
  test('Check list is empty or not', () => {
    const list = new DoublyLinkedList<number | string>();
    expect(list.isEmpty()).toBeTruthy();
    list.insertFirst(1);
    expect(list.isEmpty()).toBeFalsy();
  });

  test('Insert element into the beginning of the list. Forward Direction.', () => {
    const list = new DoublyLinkedList<number | string>();

    list.insertFirst(1);
    list.insertFirst(2);
    list.insertFirst(3);
    list.insertFirst(4);

    // Forward direction
    expect(list.first?.value).toBe(4);
    expect(list.first?.next?.value).toBe(3);
    expect(list.first?.next?.next?.value).toBe(2);
    expect(list.first?.next?.next?.next?.value).toBe(1);
    expect(list.first?.next?.next?.next?.next).toBe(null);
    expect(list.last?.value).toBe(1);
  });

  test('Insert element into the beginning of the list. Backward Direction.', () => {
    const list = new DoublyLinkedList<number | string>();

    list.insertFirst(1);
    list.insertFirst(2);
    list.insertFirst(3);
    list.insertFirst(4);

    // Backward direction
    expect(list.last?.value).toBe(1);
    expect(list.last?.prev?.value).toBe(2);
    expect(list.last?.prev?.prev?.value).toBe(3);
    expect(list.last?.prev?.prev?.prev?.value).toBe(4);
    expect(list.last?.prev?.prev?.prev?.prev).toBe(null);
    expect(list.first?.value).toBe(4);
  });

  test('Delete element from the beginning of the list. Forward Direction.', () => {
    const list = new DoublyLinkedList<number | string>();

    list.insertFirst(1);
    list.insertFirst(2);
    list.insertFirst(3);
    list.insertFirst(4);

    // Forward direction
    expect(list.first?.value).toBe(4);
    expect(list.first?.next?.value).toBe(3);
    expect(list.first?.next?.next?.value).toBe(2);
    expect(list.first?.next?.next?.next?.value).toBe(1);
    expect(list.first?.next?.next?.next?.next).toBe(null);
    expect(list.last?.value).toBe(1);

    expect(list.deleteFirst()?.value).toBe(4);
    // Forward direction
    expect(list.first?.value).toBe(3);
    expect(list.first?.next?.value).toBe(2);
    expect(list.first?.next?.next?.value).toBe(1);
    expect(list.first?.next?.next?.next).toBe(null);
    expect(list.last?.value).toBe(1);

    expect(list.deleteFirst()?.value).toBe(3);
    // Forward direction
    expect(list.first?.value).toBe(2);
    expect(list.first?.next?.value).toBe(1);
    expect(list.first?.next?.next).toBe(null);
    expect(list.last?.value).toBe(1);

    expect(list.deleteFirst()?.value).toBe(2);
    // Forward direction
    expect(list.first?.value).toBe(1);
    expect(list.first?.next).toBe(null);
    expect(list.last?.value).toBe(1);

    expect(list.deleteFirst()?.value).toBe(1);
    expect(list.first).toBe(null);
    expect(list.last).toBe(null);
  });

  test('Delete element from the beginning of the list. Backward Direction.', () => {
    const list = new DoublyLinkedList<number | string>();

    list.insertFirst(1);
    list.insertFirst(2);
    list.insertFirst(3);
    list.insertFirst(4);

    // Backward direction
    expect(list.last?.value).toBe(1);
    expect(list.last?.prev?.value).toBe(2);
    expect(list.last?.prev?.prev?.value).toBe(3);
    expect(list.last?.prev?.prev?.prev?.value).toBe(4);
    expect(list.last?.prev?.prev?.prev?.prev).toBe(null);
    expect(list.first?.value).toBe(4);

    expect(list.deleteFirst()?.value).toBe(4);
    // Backward direction
    expect(list.last?.value).toBe(1);
    expect(list.last?.prev?.value).toBe(2);
    expect(list.last?.prev?.prev?.value).toBe(3);
    expect(list.last?.prev?.prev?.prev).toBe(null);
    expect(list.first?.value).toBe(3);

    expect(list.deleteFirst()?.value).toBe(3);
    // Backward direction
    expect(list.last?.value).toBe(1);
    expect(list.last?.prev?.value).toBe(2);
    expect(list.last?.prev?.prev).toBe(null);
    expect(list.first?.value).toBe(2);

    expect(list.deleteFirst()?.value).toBe(2);
    // Backward direction
    expect(list.last?.value).toBe(1);
    expect(list.last?.prev).toBe(null);
    expect(list.first?.value).toBe(1);

    expect(list.deleteFirst()?.value).toBe(1);
    expect(list.first).toBe(null);
    expect(list.last).toBe(null);
  });

  test('Insert element into the end of the list. Forward Direction.', () => {
    const list = new DoublyLinkedList<number | string>();

    list.insertLast('last 1');
    expect(list.last?.value).toBe('last 1');

    list.insertFirst(1);
    list.insertFirst(2);
    list.insertFirst(3);

    list.insertLast('last 2');
    expect(list.last?.value).toBe('last 2');

    // Forward Direction
    expect(list.first?.value).toBe(3);
    expect(list.first?.next?.value).toBe(2);
    expect(list.first?.next?.next?.value).toBe(1);
    expect(list.first?.next?.next?.next?.value).toBe('last 1');
    expect(list.first?.next?.next?.next?.next?.value).toBe('last 2');
    expect(list.first?.next?.next?.next?.next?.next).toBe(null);
    expect(list.last?.value).toBe('last 2');
  });

  test('Insert element into the end of the list. Backward Direction.', () => {
    const list = new DoublyLinkedList<number | string>();

    list.insertLast('last 1');
    expect(list.last?.value).toBe('last 1');

    list.insertFirst(1);
    list.insertFirst(2);
    list.insertFirst(3);

    list.insertLast('last 2');
    expect(list.last?.value).toBe('last 2');
    // Backward Direction
    expect(list.last?.value).toBe('last 2');
    expect(list.last?.prev?.value).toBe('last 1');
    expect(list.last?.prev?.prev?.value).toBe(1);
    expect(list.last?.prev?.prev?.prev?.value).toBe(2);
    expect(list.last?.prev?.prev?.prev?.prev?.value).toBe(3);
    expect(list.last?.prev?.prev?.prev?.prev?.prev).toBe(null);
    expect(list.first?.value).toBe(3);
  });

  test('Delete element from the end of the list. Forward Direction.', () => {
    const list = new DoublyLinkedList<number | string>();

    list.insertFirst('last 2');
    list.insertFirst('last 1');
    list.insertFirst(1);
    list.insertFirst(2);
    list.insertFirst(3);

    // Forward Direction
    expect(list.first?.value).toBe(3);
    expect(list.first?.next?.value).toBe(2);
    expect(list.first?.next?.next?.value).toBe(1);
    expect(list.first?.next?.next?.next?.value).toBe('last 1');
    expect(list.first?.next?.next?.next?.next?.value).toBe('last 2');
    expect(list.first?.next?.next?.next?.next?.next).toBe(null);
    expect(list.last?.value).toBe('last 2');

    expect(list.deleteLast()?.value).toBe('last 2');
    // Forward Direction
    expect(list.first?.value).toBe(3);
    expect(list.first?.next?.value).toBe(2);
    expect(list.first?.next?.next?.value).toBe(1);
    expect(list.first?.next?.next?.next?.value).toBe('last 1');
    expect(list.first?.next?.next?.next?.next).toBe(null);
    expect(list.last?.value).toBe('last 1');

    expect(list.deleteLast()?.value).toBe('last 1');
    // Forward Direction
    expect(list.first?.value).toBe(3);
    expect(list.first?.next?.value).toBe(2);
    expect(list.first?.next?.next?.value).toBe(1);
    expect(list.first?.next?.next?.next).toBe(null);
    expect(list.last?.value).toBe(1);

    expect(list.deleteLast()?.value).toBe(1);
    // Forward Direction
    expect(list.first?.value).toBe(3);
    expect(list.first?.next?.value).toBe(2);
    expect(list.first?.next?.next).toBe(null);
    expect(list.last?.value).toBe(2);

    expect(list.deleteLast()?.value).toBe(2);
    // Forward Direction
    expect(list.first?.value).toBe(3);
    expect(list.first?.next).toBe(null);
    expect(list.last?.value).toBe(3);

    expect(list.deleteLast()?.value).toBe(3);
    expect(list.first).toBe(null);
    expect(list.last).toBe(null);
  });

  test('Delete element from the end of the list. Backward Direction.', () => {
    const list = new DoublyLinkedList<number | string>();

    list.insertFirst('last 2');
    list.insertFirst('last 1');
    list.insertFirst(1);
    list.insertFirst(2);
    list.insertFirst(3);

    // Backward Direction
    expect(list.last?.value).toBe('last 2');
    expect(list.last?.prev?.value).toBe('last 1');
    expect(list.last?.prev?.prev?.value).toBe(1);
    expect(list.last?.prev?.prev?.prev?.value).toBe(2);
    expect(list.last?.prev?.prev?.prev?.prev?.value).toBe(3);
    expect(list.last?.prev?.prev?.prev?.prev?.prev).toBe(null);
    expect(list.first?.value).toBe(3);

    expect(list.deleteLast()?.value).toBe('last 2');
    // Backward Direction
    expect(list.last?.value).toBe('last 1');
    expect(list.last?.prev?.value).toBe(1);
    expect(list.last?.prev?.prev?.value).toBe(2);
    expect(list.last?.prev?.prev?.prev?.value).toBe(3);
    expect(list.last?.prev?.prev?.prev?.prev).toBe(null);
    expect(list.first?.value).toBe(3);

    expect(list.deleteLast()?.value).toBe('last 1');
    // Backward Direction
    expect(list.last?.value).toBe(1);
    expect(list.last?.prev?.value).toBe(2);
    expect(list.last?.prev?.prev?.value).toBe(3);
    expect(list.last?.prev?.prev?.prev).toBe(null);
    expect(list.first?.value).toBe(3);

    expect(list.deleteLast()?.value).toBe(1);
    // Backward Direction
    expect(list.last?.value).toBe(2);
    expect(list.last?.prev?.value).toBe(3);
    expect(list.last?.prev?.prev).toBe(null);
    expect(list.first?.value).toBe(3);

    expect(list.deleteLast()?.value).toBe(2);
    // Backward Direction
    expect(list.last?.value).toBe(3);
    expect(list.last?.prev).toBe(null);
    expect(list.first?.value).toBe(3);

    expect(list.deleteLast()?.value).toBe(3);
    expect(list.first).toBe(null);
    expect(list.last).toBe(null);
  });

  test('Find element by key', () => {
    const list = new DoublyLinkedList<number | string>();

    list.insertFirst(1);
    list.insertFirst(2);
    list.insertFirst(3);
    list.insertFirst(4);

    expect(list.find(3)?.value).toBe(3);
    const nullLink = list.find('Not in the list');
    expect(nullLink).toBe(null);
  });

  test('Delete element by key. Forward Direction.', () => {
    const list = new DoublyLinkedList<number | string>();

    list.insertFirst(1);
    list.insertFirst(2);
    list.insertFirst(3);
    list.insertFirst(4);

    // Forward direction
    expect(list.first?.value).toBe(4);
    expect(list.first?.next?.value).toBe(3);
    expect(list.first?.next?.next?.value).toBe(2);
    expect(list.first?.next?.next?.next?.value).toBe(1);
    expect(list.first?.next?.next?.next?.next).toBe(null);
    expect(list.last?.value).toBe(1);

    // Remove from the middle of the list
    expect(list.delete(3)?.value).toBe(3);
    // Forward direction
    expect(list.first?.value).toBe(4);
    expect(list.first?.next?.value).toBe(2);
    expect(list.first?.next?.next?.value).toBe(1);
    expect(list.first?.next?.next?.next).toBe(null);
    expect(list.last?.value).toBe(1);

    // Remove the first element from the list
    expect(list.delete(4)?.value).toBe(4);

    // Forward direction
    expect(list.first?.value).toBe(2);
    expect(list.first?.next?.value).toBe(1);
    expect(list.first?.next?.next).toBe(null);
    expect(list.last?.value).toBe(1);

    // Remove the last element from the list
    expect(list.delete(1)?.value).toBe(1);
    // Forward direction
    expect(list.first?.value).toBe(2);
    expect(list.first?.next).toBe(null);
    expect(list.last?.value).toBe(2);

    // Remove not exists element from the list
    expect(list.delete(10)).toBe(null);
    expect(list.first?.value).toBe(2);
    expect(list.first?.next).toBe(null);
    expect(list.last?.value).toBe(2);

    // Remove all elements from the list
    expect(list.delete(2)?.value).toBe(2);
    expect(list.first).toBe(null);
    expect(list.last).toBe(null);
  });

  test('Delete element by key. Backward Direction.', () => {
    const list = new DoublyLinkedList<number | string>();

    list.insertFirst(1);
    list.insertFirst(2);
    list.insertFirst(3);
    list.insertFirst(4);

    // Backward direction
    expect(list.last?.value).toBe(1);
    expect(list.last?.prev?.value).toBe(2);
    expect(list.last?.prev?.prev?.value).toBe(3);
    expect(list.last?.prev?.prev?.prev?.value).toBe(4);
    expect(list.last?.prev?.prev?.prev?.prev).toBe(null);
    expect(list.first?.value).toBe(4);

    // Remove from the middle of the list
    expect(list.delete(3)?.value).toBe(3);
    // Backward direction
    expect(list.last?.value).toBe(1);
    expect(list.last?.prev?.value).toBe(2);
    expect(list.last?.prev?.prev?.value).toBe(4);
    expect(list.last?.prev?.prev?.prev).toBe(null);
    expect(list.first?.value).toBe(4);

    // Remove the first element from the list
    expect(list.delete(4)?.value).toBe(4);
    // Backward direction
    expect(list.last?.value).toBe(1);
    expect(list.last?.prev?.value).toBe(2);
    expect(list.last?.prev?.prev).toBe(null);
    expect(list.first?.value).toBe(2);

    // Remove the last element from the list
    expect(list.delete(1)?.value).toBe(1);
    // Backward direction
    expect(list.last?.value).toBe(2);
    expect(list.last?.prev).toBe(null);
    expect(list.first?.value).toBe(2);

    // Remove not exists element from the list
    expect(list.delete(10)).toBe(null);
    expect(list.first?.value).toBe(2);
    expect(list.first?.next).toBe(null);
    expect(list.last?.value).toBe(2);

    // Remove all elements from the list
    expect(list.delete(2)?.value).toBe(2);
    expect(list.first).toBe(null);
    expect(list.last).toBe(null);
  });

  test('Insert element after the element with passed key. Forward Direction.', () => {
    const list = new DoublyLinkedList<number | string>();

    list.insertFirst(1);
    list.insertFirst(2);

    // InsertAfter failed
    expect(list.insertAfter(3, 4)).toBeFalsy();
    // Forward direction
    expect(list.first?.value).toBe(2);
    expect(list.first?.next?.value).toBe(1);
    expect(list.first?.next?.next).toBe(null);
    expect(list.last?.value).toBe(1);

    // InsertAfter in the middle
    expect(list.insertAfter(2, 4)).toBeTruthy();
    // Forward direction
    expect(list.first?.value).toBe(2);
    expect(list.first?.next?.value).toBe(4);
    expect(list.first?.next?.next?.value).toBe(1);
    expect(list.first?.next?.next?.next).toBe(null);
    expect(list.last?.value).toBe(1);

    // InsertAfter after the last
    expect(list.insertAfter(1, 5)).toBeTruthy();
    // Forward direction
    expect(list.first?.value).toBe(2);
    expect(list.first?.next?.value).toBe(4);
    expect(list.first?.next?.next?.value).toBe(1);
    expect(list.first?.next?.next?.next?.value).toBe(5);
    expect(list.first?.next?.next?.next?.next).toBe(null);
    expect(list.last?.value).toBe(5);
  });

  test('Insert element after the element with passed key. Backward Direction.', () => {
    const list = new DoublyLinkedList<number | string>();

    list.insertFirst(1);
    list.insertFirst(2);

    // InsertAfter failed
    expect(list.insertAfter(3, 4)).toBeFalsy();
    // Backward direction
    expect(list.last?.value).toBe(1);
    expect(list.last?.prev?.value).toBe(2);
    expect(list.last?.prev?.prev).toBe(null);
    expect(list.first?.value).toBe(2);

    // InsertAfter in the middle
    expect(list.insertAfter(2, 4)).toBeTruthy();
    // Backward direction
    expect(list.last?.value).toBe(1);
    expect(list.last?.prev?.value).toBe(4);
    expect(list.last?.prev?.prev?.value).toBe(2);
    expect(list.last?.prev?.prev?.prev).toBe(null);
    expect(list.first?.value).toBe(2);

    // InsertAfter after the last
    expect(list.insertAfter(1, 5)).toBeTruthy();
    // Backward direction
    expect(list.last?.value).toBe(5);
    expect(list.last?.prev?.value).toBe(1);
    expect(list.last?.prev?.prev?.value).toBe(4);
    expect(list.last?.prev?.prev?.prev?.value).toBe(2);
    expect(list.last?.prev?.prev?.prev?.prev).toBe(null);
    expect(list.first?.value).toBe(2);
  });

  test('Iterate through the list', () => {
    const list = new DoublyLinkedList<number | string>();
    list.insertFirst(1);
    list.insertFirst(2);
    list.insertFirst(3);
    list.insertFirst(4);

    // Forward iterator
    let num = 4;
    for (const link of list) {
      link.value = num;
      num--;
    }

    // Backward iterator
    let numReversed = 1;
    for (const link of list.reverse()) {
      link.value = numReversed;
      numReversed++;
    }
  });
});
