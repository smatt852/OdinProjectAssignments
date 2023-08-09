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
}

function levelOrder(func, node) {
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

function func(arr) {
  let arrayZ = [];
  while (arr.length !== 0) {
    arrayZ.push(arr[0].data);
    arr.shift();
  }
  return arrayZ;
}

// A recursive function to insert a new value in BST
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

// inorder traversal of BST
function inorder(root) {
  if (root !== null) {
    inorder(root.left);
    console.log(root.key);
    inorder(root.right);
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

// A recursive function to insert a new value in BST
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

const arrayX = [1, 2, 0, 4, 5, 5, 2, 3, -11];

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
const newTree = new Tree(arrayX);
prettyPrint(newTree.node);
newTree.insert(1);
prettyPrint(newTree.node);
newTree.delete(2);
prettyPrint(newTree.node);
prettyPrint(newTree.find(0));
prettyPrint(newTree.find(3));
prettyPrint(newTree.find(5));
console.log(levelOrder(func, newTree.node));
