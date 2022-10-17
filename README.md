[![Maintainability](https://api.codeclimate.com/v1/badges/35c5d87bcc295b25ea5f/maintainability)](https://codeclimate.com/github/aemelianovich/data_structures/maintainability)
[![Node CI](https://github.com/aemelianovich/data_structures/actions/workflows/nodejs.yml/badge.svg)](https://github.com/aemelianovich/data_structures/actions/workflows/nodejs.yml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/35c5d87bcc295b25ea5f/test_coverage)](https://codeclimate.com/github/aemelianovich/data_structures/test_coverage)

# data_structures

Implementation of different data structures, e.g. DoublyLinkedList, Stack, Structure, Deque etc.

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

    // Check is stack empty
    stack.isEmpty();

    // Check is stack full
    stack.isFull();

    // Predefiend Errors:
    // The 'StackOverflowError' error will be thrown if you tried to add element into a full stack
    // The 'StackIsEmptyError' error will be thrown if you tried to get element from an empty stack
