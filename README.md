[![Maintainability](https://api.codeclimate.com/v1/badges/35c5d87bcc295b25ea5f/maintainability)](https://codeclimate.com/github/aemelianovich/data_structures/maintainability)
[![Node CI](https://github.com/aemelianovich/data_structures/actions/workflows/nodejs.yml/badge.svg)](https://github.com/aemelianovich/data_structures/actions/workflows/nodejs.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/35c5d87bcc295b25ea5f/test_coverage)](https://codeclimate.com/github/aemelianovich/data_structures/test_coverage)

# data_structures

Implementation of different data structures, e.g.

- Structure(Based on Array)
- Stack(Based on Array)
- DoublyLinkedList
- Queue(Based on linked list)
- Deque(Based on linked list)

## Structure API:

    import Structure from './src';

    // Create new structure with keys
    const structure = new Structure<string | number>(['name', 'lastName', 'age']);

    // Assign values to the predefined keys
    structure.name = 'Jack';
    structure.lastName = 'Black';
    structure.age = 53;

    // Update value by key
    structure.age = 30;

    // Get values by key
    console.log(structure.name);
    console.log(structure.lastName);
    console.log(structure.age);

## Stack API:

    import Stack from './src';

    // Create new stack with fixed size
    const stack = new Stack<number>(3);

    // Add new value
    stack.push(1);

    // Get the top stack element without extracting
    stack.peek();

    // Get the top stack element and extract it from the stack
    stack.pop();

    // Check is stack empty or not
    stack.isEmpty();

    // Check is stack full or not
    stack.isFull();

    // Predefiend Errors:
    // The 'StackOverflowError' error will be thrown if you tried to add element into a full stack
    // The 'StackIsEmptyError' error will be thrown if you tried to get element from an empty stack

## Doubly Linked List API:

    import DoublyLinkedList from './src';

    // Create new list
    const list = new DoublyLinkedList<number | string>();

    // Add new value in the beginning of the list
    list.insertFirst(1);

    // Add new value in the end of the list
    list.insertLast(2);

    // Add new value after passed key. Returned true if key was founded and value was inserted otherwise false.
    list.insertAfter(1);

    // Get the first element of the list
    const firstLink = list.first;
    list.first?.next?.next?.value;

    // Get the last element of the list
    const lastLink = list.last;
    list.last?.prev?.next?.value;

    // Delete the first element from the list and return it
    const deletedFirstLink = list.deleteFirst();

    // Delete the last element from the list and return it
    const deletedLastLink = list.deleteLast();

    // Delete element by key and return it (or null if element was not founded)
    const deletedLink = list.delete(2);

    // Find element by key and return it (or null if element was not founded)
    const matchedLink = list.find(1);

    // Check is list empty or not
    list.isEmpty();

    // Print into console all list elements from the first till the last
    list.showList();

    // Print into console all list elements from the last till the first
    list.showList();

    // Iterate through the list from the first till the last element
    for (const link of this) {
      link.showLink();
    }

    // Iterate through the list from the last till the first element
    for (const link of this.reverse()) {
      link.showLink();
    }

## Queue API:

    import Queue from './src';

    // Create new queue
    const queue = new Queue<number>();

    // Add new value in the end of the queue
    queue.push(1);

    // Get the first queue element without extracting
    queue.head();

    // Get the first queue element and extract it from the queue
    queue.pop();

    // Check is queue empty or not
    queue.isEmpty();

    // Print into console all queue elements
    queue.showQueue();

    // Predefiend Errors:
    // The 'QueueIsEmptyError' error will be thrown if you tried to get element from an empty queue
