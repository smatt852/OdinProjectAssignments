class Node {
  constructor(d) {
    this.data = d;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array2) {
    this.node = buildTree(prep(array2), 0, prep(array2).length - 1);
  }

  insert(value) {
    return insertRec(this.node, value);
  }
  delete(value) {
    return deleteNode(this.node, value);
  }
  find(value) {
    return findRec(this.node, value);
  }
  levelOrder(func = treeArray) {
    return breadthLevelOrder(this.node, (func = treeArray));
  }
  preorder(func = saveTree) {
    let arrayY = [];
    return depthPreorder(arrayY, this.node, (func = saveTree));
  }
  inorder(func = saveTree) {
    let arrayY = [];
    return depthInorder(arrayY, this.node, (func = saveTree));
  }
  postorder(func = saveTree) {
    let arrayY = [];
    return depthPostorder(arrayY, this.node, (func = saveTree));
  }
  height(value) {
    return heightFunc(this.node, value);
  }
  depth(value) {
    return depthFunc(this.node, value);
  }
  isBalanced() {
    return balancedFunc(this.node);
  }
  rebalance() {
    return rebalanceFunc(this.node);
  }
}

class unbalancedTree {
  constructor(array) {
    this.node = buildUnbalancedTree(prep(array), 0, prep(array).length - 1);
  }
  isBalanced() {
    return balancedFunc(this.node);
  }
  rebalance() {
    return rebalanceFunc(this.node);
  }
}

// traverses the tree and makes an array of objects,
// each containing a nodes and its level
function levels(node) {
  let arr = [];
  let q = [];
  let r = [];
  let i = 0;
  q[0] = node;
  r[0] = 0;
  arr[0] = { item: node, level: 0, value: node.data };
  if (node === null) {
    return;
  }
  while (q.length !== 0) {
    temp = q[0];
    if (temp.left !== null || temp.right !== null) {
      if (temp.left !== null) {
        r.push(r[0] + 1);
        arr.push({
          item: temp.left,
          level: r[0] + 1,
          value: temp.left.data,
        });
        q.push(temp.left);
      }
      if (temp.right !== null) {
        r.push(r[0] + 1);
        arr.push({
          item: temp.right,
          level: r[0] + 1,
          value: temp.right.data,
        });
        q.push(temp.right);
      }
    }

    r.shift();
    q.shift();
  }
  return arr;
}

function rebalanceFunc(treeRoot) {
  let arr = levels(treeRoot);
  let data = [];
  for (key in arr) {
    data.push(arr[key].value);
  }
  return new Tree(data);
}

// determines if tree is balanced (left is less than 2 levels deeper/shallower than right)
function balancedFunc(treeRoot) {
  let arr = levels(treeRoot);
  let left = [];
  let right = [];
  for (key in arr) {
    if (arr[key].value < treeRoot.data) {
      left.push(arr[key].level);
    } else {
      right.push(arr[key].level);
    }
  }
  if (
    Math.abs(largest(left, left.length, 0) - largest(right, right.length, 0)) <
    2
  ) {
    return "Tree is balanced.";
  } else {
    return "Tree is unbalanced.";
  }
}

// finds the depth from the root node to a given node
function depthFunc(treeRoot, nodeData) {
  let arr = levels(treeRoot);
  let x = arr.find((thing) => thing.value === nodeData);
  if (x === "undefined") {
    console.log("Value not in tree.");
    return;
  }
  return x.level;
}

// finds the number of levels from a given node of a given tree to the deepest leaf node
function heightFunc(treeRoot, nodeData) {
  let arr = levels(treeRoot);
  let x = arr.find((thing) => thing.value === nodeData);
  if (x === "undefined") {
    console.log("Value not in tree.");
    return;
  }
  if (treeRoot.data !== nodeData) {
    boundaryLevel = arr.find((thing2) => thing2.level === x.level - 1);
  }
  result = [];
  if (treeRoot.data === nodeData) {
    for (key in arr) {
      result.push(arr[key].level);
    }
  } else if (x.value < boundaryLevel.value) {
    for (key in arr) {
      if (arr[key].value < boundaryLevel.value) result.push(arr[key].level);
    }
  } else if (x.value > boundaryLevel.value) {
    for (key in arr) {
      if (arr[key].value > boundaryLevel.value) result.push(arr[key].level);
    }
  }
  let height = largest(result, result.length, 0) - x.level;
  return height;
}

// finds the largest value in an array
function largest(arr, n, i) {
  if (i == n - 1) {
    return arr[i];
  }
  let recMax = largest(arr, n, i + 1);
  return Math.max(recMax, arr[i]);
}

// traverses the tree depth-first preorder and send the nodes one at a time to a specified funtion for use
function depthPreorder(arrayY, node, func = saveTree) {
  if (node === null) return;
  func(node, arrayY);
  depthPreorder(arrayY, node.left);
  depthPreorder(arrayY, node.right);
  return arrayY;
}

// traverses the tree depth-first inorder and send the nodes one at a time to a specified funtion for use
function depthInorder(arrayY, node, func = saveTree) {
  if (node === null) return;
  depthInorder(arrayY, node.left);
  func(node, arrayY);
  depthInorder(arrayY, node.right);
  return arrayY;
}

// traverses the tree depth-first postorder and send the nodes one at a time to a specified funtion for use
function depthPostorder(arrayY, node, func = saveTree) {
  if (node === null) return;
  depthPostorder(arrayY, node.left);
  depthPostorder(arrayY, node.right);
  func(node, arrayY);
  return arrayY;
}

// takes nodes one at a time from the depth traveral functions and prints data
function saveTree(node, arrayY) {
  let x = node.data;
  arrayY.push(x);
}

// traverses tree in breadth-first level order,
// saves nodes to an array which is then passed to a function for use
function breadthLevelOrder(node, func = treeArray) {
  let arr = [];
  let q = [];
  if (node === null) {
    return;
  }
  q[0] = node;
  while (q.length !== 0) {
    temp = q[0];
    arr.push(temp);
    if (temp.left !== null) {
      q.push(temp.left);
    }
    if (temp.right !== null) {
      q.push(temp.right);
    }
    q.shift();
  }
  return func(arr);
}

// takes the level order array of nodes from breadthLevelOrder() and prints the data
function treeArray(arr) {
  let arrayZ = [];
  while (arr.length !== 0) {
    arrayZ.push(arr[0].data);
    arr.shift();
  }
  return arrayZ;
}

// A recursive function to find a value
function findRec(root, value) {
  // If the tree is empty, return
  if (root == null || root.data === value) {
    return root;
  }
  // Otherwise, recur down the tree
  if (value < root.data) {
    return findRec(root.left, value);
  } else if (value > root.data) {
    return findRec(root.right, value);
  }
}

// deletes the key and returns the new root */
function deleteNode(root, k) {
  // Base case
  if (root === null) {
    return root;
  }
  // Recursive calls for ancestors of node to be deleted
  if (root.data > k) {
    root.left = deleteNode(root.left, k);
    return root;
  } else if (root.data < k) {
    root.right = deleteNode(root.right, k);
    return root;
  }

  // We reach here when root is the node to be deleted.

  // If one of the children is empty
  if (root.left === null) {
    let temp = root.right;
    delete root;
    return temp;
  } else if (root.right === null) {
    let temp = root.left;
    delete root;
    return temp;
  }

  // If both children exist
  else {
    let succParent = root;

    // Find successor
    let succ = root.right;
    while (succ.left !== null) {
      succParent = succ;
      succ = succ.left;
    }

    // Delete successor. Since successor
    // is always left child of its parent
    // we can safely make successor's right
    // right child as left of its parent.
    // If there is no succ, then assign
    // succ.right to succParent.right
    if (succParent !== root) {
      succParent.left = succ.right;
    } else {
      succParent.right = succ.right;
    }

    // Copy Successor Data to root
    root.data = succ.data;

    // Delete Successor and return root
    delete succ;
    return root;
  }
}

// A recursive function to insert a new value
function insertRec(root, value) {
  // If the tree is empty, return a new node
  if (root == null) {
    root = new Node(value);
    return root;
  }
  // Otherwise, recur down the tree
  if (value < root.data) {
    root.left = insertRec(root.left, value);
  } else if (value > root.data) {
    root.right = insertRec(root.right, value);
  }
  // Return the (unchanged) node pointer
  return root;
}

// remove duplicates and sort the array before building tree
function prep(arr) {
  //   remove duplicates
  arr = arr.filter((c, index) => {
    return arr.indexOf(c) === index;
  });
  // sort
  arr = arr.sort(function (a, b) {
    return a - b;
  });
  return arr;
}

// build a balanced tree
function buildTree(array1, start, end) {
  if (start > end) {
    return null;
  }
  /* Get the middle element and make it root */
  const mid = parseInt((start + end) / 2);
  const node = new Node(array1[mid]);
  /* Recursively construct the left subtree and make it
     left child of root */
  node.left = buildTree(array1, start, mid - 1);
  /* Recursively construct the right subtree and make it
     right child of root */
  node.right = buildTree(array1, mid + 1, end);
  return node;
}

// build an unbalanced tree to check isBalanced function
function buildUnbalancedTree(array1, start, end) {
  if (start > end) {
    return null;
  }
  /* Get the middle element and make it root */
  const point = parseInt((start + end) / 4);
  const node = new Node(array1[point]);
  /* Recursively construct the left subtree and make it
     left child of root */
  node.left = buildTree(array1, start, point - 1);
  /* Recursively construct the right subtree and make it
     right child of root */
  node.right = buildTree(array1, point + 1, end);
  return node;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const arrayX = [1, 2, 0, 4, 5, 5, 2, 3, -11];
const newTree = new Tree(arrayX);
prettyPrint(newTree.node);
newTree.insert(1);
prettyPrint(newTree.node);
newTree.delete(2);
prettyPrint(newTree.node);
prettyPrint(newTree.find(0));
prettyPrint(newTree.find(3));
prettyPrint(newTree.find(5));
console.log(`levelorder ${newTree.levelOrder()}`);
console.log(`preorder ${newTree.preorder()}`);
console.log(`inorder ${newTree.inorder()}`);
console.log(`postorder ${newTree.postorder()}`);
console.log(newTree.height(3));
console.log(newTree.height(0));
console.log(newTree.height(-11));
console.log(newTree.depth(4));
console.log(newTree.depth(3));
console.log(newTree.depth(5));
console.log(newTree.isBalanced());
let arrayW = [-21, 0, 3, 5, 5.4, 100];
const secondTree = new unbalancedTree(arrayW);
console.log(secondTree.isBalanced());
prettyPrint(secondTree.node);
console.log(secondTree.rebalance());
let thirdTree = secondTree.rebalance();
prettyPrint(thirdTree.node);

let randomArr = [];
for (let i = 0; i < 10; i++) {
  randomArr.push(Math.floor(Math.random() * 100) + 1);
}
console.log(randomArr);
const testTree = new Tree(randomArr);
console.log(testTree.isBalanced());
console.log(`levelorder ${testTree.levelOrder()}`);
console.log(`preorder ${testTree.preorder()}`);
console.log(`inorder ${testTree.inorder()}`);
console.log(`postorder ${testTree.postorder()}`);
testTree.insert(103);
testTree.insert(150);
testTree.insert(165);
testTree.insert(200);
testTree.insert(233);
console.log(testTree.isBalanced());
let testTree2 = testTree.rebalance();
console.log(testTree2.isBalanced());
console.log(`levelorder ${testTree2.levelOrder()}`);
console.log(`preorder ${testTree2.preorder()}`);
console.log(`inorder ${testTree2.inorder()}`);
console.log(`postorder ${testTree2.postorder()}`);
prettyPrint(testTree2.node);
