// A node in the vanilla BST tree
class BSTNode<T> {
  key: T;
  parent: BSTNode<T> | null;
  left: BSTNode<T> | null;
  right: BSTNode<T> | null;

  constructor(key: T, parent?: BSTNode<T>) {
    // Creates a node.

    this.key = key;
    this.parent = parent || null;
    this.left = null;
    this.right = null;
  }

  // Finds and returns the node with key from the subtree rooted at this node.
  find(key: T): BSTNode<T> | undefined {
    if (key == this.key) {
      return this;
    } else if (key < this.key) {
      if (this.left === null) {
        return undefined;
      }

      return this.left.find(key);
    } else {
      if (this.right === null) {
        return undefined;
      }
      return this.right.find(key);
    }
  }

  // Finds the node with the minimum key in the subtree rooted at this node.
  findMin(): BSTNode<T> {
    let current = <BSTNode<T>>this;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  // Returns the node with the next larger key (the successor) in the BST.
  nextLarger(): BSTNode<T> | undefined {
    if (this.right !== null) {
      return this.right.findMin();
    }

    let current = <BSTNode<T>>this;
    while (current.parent !== null && current === current.parent.right) {
      current = current.parent;
    }

    return current.parent || undefined;
  }

  // Inserts a node into the subtree rooted at this node.
  insert(node: BSTNode<T>): void {
    if (node.key < this.key) {
      if (this.left === null) {
        node.parent = this;
        this.left = node;
      } else {
        this.left.insert(node);
      }
    } else {
      if (this.right === null) {
        node.parent = this;
        this.right = node;
      } else {
        this.right.insert(node);
      }
    }
  }

  // Deletes and returns this node from the BST.
  delete(): BSTNode<T> {
    if (this.left === null || this.right === null) {
      if (this === this.parent?.left) {
        this.parent.left = this.left || this.right;
        if (this.parent.left !== null) {
          this.parent.left.parent = this.parent;
        }
      } else if (this === this.parent?.right) {
        this.parent.right = this.left || this.right;
        if (this.parent.right !== null) {
          this.parent.right.parent = this.parent;
        }
      }
      return this;
    } else {
      const n = <BSTNode<T>>this.nextLarger();
      [this.key, n.key] = [n.key, this.key];
      return n.delete();
    }
  }

  // Checks the BST representation invariant around this node.
  // Raises an exception if the RI is violated.
  checkRI(): void {
    if (this.left !== null) {
      if (this.left.key > this.key) {
        throw new Error('BST RI violated by a left node key');
      }
      if (this.left.parent !== this) {
        throw new Error('BST RI violated by a left node parent pointer');
      }
      this.left.checkRI();
    }
    if (this.right !== null) {
      if (this.right.key < this.key) {
        throw new Error('BST RI violated by a right node key');
      }
      if (this.right.parent !== this) {
        throw new Error('BST RI violated by a right node parent pointer');
      }
      this.right.checkRI();
    }
  }

  // Inorder by default (starting from the most left node)
  *[Symbol.iterator](): IterableIterator<T> {
    if (this.left !== null) {
      yield* this.left;
    }

    yield this.key;

    if (this.right !== null) {
      yield* this.right;
    }
  }

  // PreOrder (starting from the root and go to left nodes and then right nodes)
  *preOrder(): IterableIterator<T> {
    yield this.key;

    if (this.left !== null) {
      yield* this.left.preOrder();
    }

    if (this.right !== null) {
      yield* this.right.preOrder();
    }
  }

  // PostOrder (starting from the bootom left node, go to bottom right node and go to the parent)
  *postOrder(): IterableIterator<T> {
    if (this.left !== null) {
      yield* this.left.postOrder();
    }

    if (this.right !== null) {
      yield* this.right.postOrder();
    }

    yield this.key;
  }
}

// Binary Search Tree
export default class BST<T> {
  root: BSTNode<T> | null;
  constructor(root?: BSTNode<T>) {
    // Creates an empty BST.

    this.root = root || null;
  }

  // Finds and returns the node with key from the subtree rooted at this node.
  find(key: T): BSTNode<T> | undefined {
    if (this.root !== null) {
      return this.root.find(key);
    }
    return undefined;
  }

  // Returns the minimum node of this BST.
  findMin(): BSTNode<T> | undefined {
    if (this.root !== null) {
      return this.root.findMin();
    }

    return undefined;
  }

  // Inserts a node with key k into the subtree rooted at this node.
  insert(key: T): BSTNode<T> {
    const node = new BSTNode<T>(key);
    if (this.root === null) {
      this.root = node;
    } else {
      this.root.insert(node);
    }

    return node;
  }

  // Deletes and returns a node with key k if it exists from the BST.
  delete(key: T): BSTNode<T> | undefined {
    const node = this.find(key);
    if (node === undefined) {
      return undefined;
    }

    if (node === this.root) {
      // The key of fake root is not important it will be deleted anyway
      const fakeRoot = new BSTNode(key);
      fakeRoot.left = this.root;
      this.root.parent = fakeRoot;
      const deleted = this.root.delete();
      this.root = fakeRoot.left;
      if (this.root !== null) {
        this.root.parent = null;
      }
      return deleted;
    } else {
      return node.delete();
    }
  }

  // Returns the node that contains the next larger (the successor) key
  // in the BST in relation to the node with key k.
  nextLarger(key: T): BSTNode<T> | undefined {
    const node = this.find(key);

    if (node !== undefined) {
      return node.nextLarger();
    }

    return undefined;
  }

  // Checks the BST representation invariant.
  checkRI(): void {
    if (this.root !== null) {
      if (this.root.parent !== null) {
        throw new Error("BST RI violated by the root node's parent pointer.");
      }

      this.root.checkRI();
    }
  }

  // InOrder tree traversal
  inOrder(): IterableIterator<T> {
    let iter = <IterableIterator<T> | null>null;
    if (this.root !== null) {
      iter = this.root[Symbol.iterator]();
    }

    return {
      [Symbol.iterator]() {
        return this;
      },
      next: () => {
        if (iter === null) {
          return { value: undefined, done: true };
        }
        const res = iter.next();
        return { value: res.value, done: res.done };
      },
    };
  }

  // PreOrder tree traversal
  preOrder(): IterableIterator<T> {
    let iter = <IterableIterator<T> | null>null;
    if (this.root !== null) {
      iter = this.root.preOrder();
    }

    return {
      [Symbol.iterator]() {
        return this;
      },
      next: () => {
        if (iter === null) {
          return { value: undefined, done: true };
        }
        const res = iter.next();
        return { value: res.value, done: res.done };
      },
    };
  }

  // PostOrder tree traversal
  postOrder(): IterableIterator<T> {
    let iter = <IterableIterator<T> | null>null;
    if (this.root !== null) {
      iter = this.root.postOrder();
    }

    return {
      [Symbol.iterator]() {
        return this;
      },
      next: () => {
        if (iter === null) {
          return { value: undefined, done: true };
        }
        const res = iter.next();
        return { value: res.value, done: res.done };
      },
    };
  }

  // breadth first tree traversal
  breadthFirst(): IterableIterator<T> {
    let currLevel: BSTNode<T>[] = [];
    if (this.root !== null) {
      currLevel.push(this.root);
    }

    let nextLevel: BSTNode<T>[] = [];

    return {
      [Symbol.iterator]() {
        return this;
      },
      next: () => {
        if (currLevel.length === 0 && nextLevel.length === 0) {
          return { value: undefined, done: true };
        } else if (currLevel.length === 0 && nextLevel.length > 0) {
          currLevel = nextLevel;
          nextLevel = [];
        }

        const node = <BSTNode<T>>currLevel.shift();

        if (node.left !== null) {
          nextLevel.push(node.left);
        }

        if (node.right !== null) {
          nextLevel.push(node.right);
        }

        return { value: node.key, done: false };
      },
    };
  }
}
