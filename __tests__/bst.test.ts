import { BST } from '../src/index';

// class BSTTest(unittest.TestCase):
//     def testNextLarger(self):
//

//     def testFindMin(self):
//

//                     23
//             8             42
//         4      16
//             15
//
const createBST = (): BST<number> => {
  const bst = new BST<number>();
  bst.insert(23);
  bst.insert(8);
  bst.insert(4);
  bst.insert(16);
  bst.insert(15);
  bst.insert(42);
  return bst;
};

describe('BST<number>', () => {
  it('create BST', () => {
    const bst = new BST();
    expect(bst).toBeInstanceOf(BST);
  });

  it('Test insert value', () => {
    const tree = new BST<number>();
    tree.insert(5);
    tree.checkRI();
    expect(tree.find(5)?.key).toBe(5);
    tree.insert(3);
    tree.checkRI();
    expect(tree.find(3)?.key).toBe(3);
    tree.insert(4);
    tree.checkRI();
    expect(tree.find(4)?.key).toBe(4);
    tree.insert(4);
    tree.checkRI();
    expect(tree.find(4)?.key).toBe(4);
  });

  it('Test find', () => {
    const tree = new BST<number>();
    expect(tree.find(4)?.key).toBe(undefined);
    tree.insert(4);
    expect(tree.find(4)?.key).toBe(4);
  });

  it('Delete node wihtout children', () => {
    const tree = createBST();
    const deletedNode = tree.delete(15);
    tree.checkRI();
    expect(deletedNode?.key).toBe(15);
    expect(tree.find(15)?.key).toBe(undefined);
  });

  it('Delete node with one children', () => {
    const tree = createBST();
    const deletedNode = tree.delete(16);
    tree.checkRI();
    expect(deletedNode?.key).toBe(16);
    expect(tree.find(16)?.key).toBe(undefined);
  });

  it('Delete node with two children', () => {
    const tree = createBST();
    const deletedNode = tree.delete(8);
    tree.checkRI();
    expect(deletedNode?.key).toBe(8);
    expect(tree.find(8)?.key).toBe(undefined);
  });

  it('Delete root node', () => {
    const tree = createBST();
    const deletedNode = tree.delete(23);
    tree.checkRI();
    expect(deletedNode?.key).toBe(23);
    expect(tree.find(23)?.key).toBe(undefined);
    expect(tree.find(42)?.key).toBe(42);
  });

  it('Delete last node', () => {
    const tree = new BST<number>();
    tree.insert(1);
    const deletedNode = tree.delete(1);
    expect(deletedNode?.key).toBe(1);
    tree.checkRI();
    tree.insert(2);
    tree.checkRI();
  });

  it('Test next larger', () => {
    const tree = createBST();
    expect(tree.nextLarger(8)?.key).toBe(15);
    expect(tree.nextLarger(16)?.key).toBe(23);
  });

  it('Test find min', () => {
    const tree2 = createBST();
    const tree = new BST<number>();
    expect(tree.findMin()).toBe(undefined);
    tree.insert(5);
    expect(tree.find(5)?.key).toBe(5);
    expect(tree.findMin()?.key).toBe(5);
    expect(tree2.findMin()?.key).toBe(4);
  });

  //                    23
  //             8             42
  //         4      16     34      52
  //             15
  it('Test inOrder iterator', () => {
    const tree = new BST<number>();
    tree.insert(23);
    tree.insert(8);
    tree.insert(4);
    tree.insert(16);
    tree.insert(15);
    tree.insert(42);
    tree.insert(34);
    tree.insert(52);

    const inOrder = tree.inOrder();

    let res = inOrder.next();
    expect(res.value).toBe(4);
    expect(res.done).toBe(false);

    res = inOrder.next();
    expect(res.value).toBe(8);
    expect(res.done).toBe(false);

    res = inOrder.next();
    expect(res.value).toBe(15);
    expect(res.done).toBe(false);

    res = inOrder.next();
    expect(res.value).toBe(16);
    expect(res.done).toBe(false);

    res = inOrder.next();
    expect(res.value).toBe(23);
    expect(res.done).toBe(false);

    res = inOrder.next();
    expect(res.value).toBe(34);
    expect(res.done).toBe(false);

    res = inOrder.next();
    expect(res.value).toBe(42);
    expect(res.done).toBe(false);

    res = inOrder.next();
    expect(res.value).toBe(52);
    expect(res.done).toBe(false);

    res = inOrder.next();
    expect(res.value).toBe(undefined);
    expect(res.done).toBe(true);
  });

  //                    23
  //             8             42
  //         4      16     34      52
  //             15
  it('Test PreOrder iterator', () => {
    const tree = new BST<number>();
    tree.insert(23);
    tree.insert(8);
    tree.insert(4);
    tree.insert(16);
    tree.insert(15);
    tree.insert(42);
    tree.insert(34);
    tree.insert(52);

    const preOrder = tree.preOrder();

    let res = preOrder.next();
    expect(res.value).toBe(23);
    expect(res.done).toBe(false);

    res = preOrder.next();
    expect(res.value).toBe(8);
    expect(res.done).toBe(false);

    res = preOrder.next();
    expect(res.value).toBe(4);
    expect(res.done).toBe(false);

    res = preOrder.next();
    expect(res.value).toBe(16);
    expect(res.done).toBe(false);

    res = preOrder.next();
    expect(res.value).toBe(15);
    expect(res.done).toBe(false);

    res = preOrder.next();
    expect(res.value).toBe(42);
    expect(res.done).toBe(false);

    res = preOrder.next();
    expect(res.value).toBe(34);
    expect(res.done).toBe(false);

    res = preOrder.next();
    expect(res.value).toBe(52);
    expect(res.done).toBe(false);

    res = preOrder.next();
    expect(res.value).toBe(undefined);
    expect(res.done).toBe(true);
  });

  //                    23
  //             8             42
  //         4      16     34      52
  //             15
  it('Test PostOrder iterator', () => {
    const tree = new BST<number>();
    tree.insert(23);
    tree.insert(8);
    tree.insert(4);
    tree.insert(16);
    tree.insert(15);
    tree.insert(42);
    tree.insert(34);
    tree.insert(52);

    const postOrder = tree.postOrder();

    let res = postOrder.next();
    expect(res.value).toBe(4);
    expect(res.done).toBe(false);

    res = postOrder.next();
    expect(res.value).toBe(15);
    expect(res.done).toBe(false);

    res = postOrder.next();
    expect(res.value).toBe(16);
    expect(res.done).toBe(false);

    res = postOrder.next();
    expect(res.value).toBe(8);
    expect(res.done).toBe(false);

    res = postOrder.next();
    expect(res.value).toBe(34);
    expect(res.done).toBe(false);

    res = postOrder.next();
    expect(res.value).toBe(52);
    expect(res.done).toBe(false);

    res = postOrder.next();
    expect(res.value).toBe(42);
    expect(res.done).toBe(false);

    res = postOrder.next();
    expect(res.value).toBe(23);
    expect(res.done).toBe(false);

    res = postOrder.next();
    expect(res.value).toBe(undefined);
    expect(res.done).toBe(true);
  });

  //                    23
  //             8             42
  //         4      16     34      52
  //             15
  it('Test breadthFirst iterator', () => {
    const tree = new BST<number>();
    tree.insert(23);
    tree.insert(8);
    tree.insert(4);
    tree.insert(16);
    tree.insert(15);
    tree.insert(42);
    tree.insert(34);
    tree.insert(52);

    const breadthFirst = tree.breadthFirst();

    let res = breadthFirst.next();
    expect(res.value).toBe(23);
    expect(res.done).toBe(false);

    res = breadthFirst.next();
    expect(res.value).toBe(8);
    expect(res.done).toBe(false);

    res = breadthFirst.next();
    expect(res.value).toBe(42);
    expect(res.done).toBe(false);

    res = breadthFirst.next();
    expect(res.value).toBe(4);
    expect(res.done).toBe(false);

    res = breadthFirst.next();
    expect(res.value).toBe(16);
    expect(res.done).toBe(false);

    res = breadthFirst.next();
    expect(res.value).toBe(34);
    expect(res.done).toBe(false);

    res = breadthFirst.next();
    expect(res.value).toBe(52);
    expect(res.done).toBe(false);

    res = breadthFirst.next();
    expect(res.value).toBe(15);
    expect(res.done).toBe(false);

    res = breadthFirst.next();
    expect(res.value).toBe(undefined);
    expect(res.done).toBe(true);
  });
});
