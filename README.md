[![Maintainability](https://api.codeclimate.com/v1/badges/35c5d87bcc295b25ea5f/maintainability)](https://codeclimate.com/github/aemelianovich/data_structures/maintainability)
[![Node CI](https://github.com/aemelianovich/data_structures/actions/workflows/nodejs.yml/badge.svg)](https://github.com/aemelianovich/data_structures/actions/workflows/nodejs.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/35c5d87bcc295b25ea5f/test_coverage)](https://codeclimate.com/github/aemelianovich/data_structures/test_coverage)

# data_structures

Implementation of different data structures, e.g.

- Structure(Based on Array)
- Stack(Based on Array)
- DoublyLinkedList
- Queue(Based on linked list)
- Dequeue(Based on linked list)
- DynamicArray(Based on fixed array and linked list)
- HashTable(Resolving collisions method - chaining based on Linked List)

## Structure API:

    ```js
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
    ```

## Stack API:

    ```js
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
    // The 'StructOverflowError' error will be thrown if you tried to add element into a full stack
    // The 'StructIsEmptyError' error will be thrown if you tried to get element from an empty stack
    ```

## Doubly Linked List API:

    ```js
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
    ```

## Queue API:

    ```js
    import Queue from './src';

    // Create new queue
    const queue = new Queue<number>();

    // Add new value in the end of the queue
    queue.push(1);

    // Get the first queue element without extracting
    queue.head();

    // Get the first queue element and extract it from the queue
    queue.shift();

    // Check is queue empty or not
    queue.isEmpty();

    // Print into console all queue elements
    queue.showQueue();

    // Predefiend Errors:
    // The 'StructIsEmptyError' error will be thrown if you tried to get element from an empty queue
    ```

## Dequeue API:

    ```js
    import Dequeue from './src';

    // Create new dequeue
    const dequeue = new Dequeue<number>();

    // Add new value in the end of the queue
    dequeue.push(1);

    // Add new value in the beginning of the queue
    dequeue.unshift(2);

    // Get the first queue element without extracting
    dequeue.head();

    // Get the last queue element without extracting
    dequeue.tail();

    // Get the first queue element and extract it from the queue
    dequeue.shift();

    // Get the last queue element and extract it from the queue
    dequeue.pop();

    // Check is queue empty or not
    dequeue.isEmpty();

    // Print into console all queue elements in forward order
    dequeue.showDequeue();

    // Print into console all queue elements in backward order
    dequeue.showBackwardDequeue();

    // Predefiend Errors:
    // The 'StructIsEmptyError' error will be thrown if you tried to get element from an empty queue
    ```

## Dynamic Array API:

    ```js
    // Dynamic array based on linked list (unlimeted capacity)
    import DynamicArray from './src';
    // Dynamic array based on vector (limited capacity by number type)
    import DynamicArrayVector from './src';

    // Create new array based on linked list
    // Pass capacity of the fixed array that will be stored in the one link of linked list
    const arr = new DynamicArray<number>(3);

    // or

    // Create new array based on vector
    // Pass capacity of the fixed array that will be initially created for vector
    // const arr = new DynamicArrayVector<number>(3);


    // Add new value in the end of the array
    arr.push(1);

    // Add new value in the beginning of the array
    arr.unshift(2);

    // Get the first arrat element and extract it from the array
    arr.shift();

    // Get the last array element and extract it from the array
    arr.pop();

    // Check the length of the array
    arr.length;

    // Update/Insert element using bracket notation
    // Element can be inserted right after the last element (random insert is not available)
    arr[0] = 1;

    // Get element using bracket notation
    console.log(arr[0]);

    // DynamicArrayVector method only:

    // Return object:
    // leftBound - points to the index before the seeking key, min -1
    // rightBound - points to the index after the seeking key, max arr.length
    // sortedArray - new sorted array which was created based on DynamicArrayVector

    // FYI:
    // if rightBound - leftBound = 1, it means that number was not founded.
    // number of founded keys = rightBound - leftBound - 1;
    arr.binarySearch(2);

    // Predefiend Errors:
    // The 'StructIsEmptyError' error will be thrown if you tried to get element from an empty array
    // The 'StructRandomInsertError' error will be thrown if you tried to insert element into random place
    ```

## HashTable API:

    ```js
    // HashTable (Resolving collisions method - chaining based on Linked List)
    import HashTable from './src';

    // Create new hash table
    // Pass capacity of the fixed array that will be used to store key values
    const hashTable = new HashTable<number | string>(33);


    // Add new value in the hash table - pass key and value
    hashTable.set('foo', 'bla');
    hashTable.set(10, 20);

    // Update existing value
    hashTable.set(10, '10foo');

    // Get value by key
    console.log(hashTable.get('foo')); // 'bla'
    console.log(hashTable.get(10)); // '10foo'

    // Get keys iterator in random order
    console.log([...hashTable.keys()]); // ['foo', 10]

    ```
