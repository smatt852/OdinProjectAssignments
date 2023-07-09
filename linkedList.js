#!/usr/bin/node

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  prepend(v) {
    const temp = this.head;
    this.head = new Node(v);
    this.head.next = temp;
  }

  append(v) {
    const newNode = new Node(v);
    if (this.head === null) {
      this.head = newNode;
    } else {
      let temp = this.head;
      while (temp.next !== null) {
        temp = temp.next;
      }
      temp.next = newNode;
    }
  }

  size() {
    let i = 0;
    if (this.head.next === null) {
      return i;
    } else {
      let temp = this.head;
      while (temp.next !== null) {
        i++;
        temp = temp.next;
      }
      i++;
      return i;
    }
  }

  findHead() {
    return this.head.value;
  }

  tail() {
    if (this.head === null) {
      return this.head.value;
    } else {
      let temp = this.head;
      while (temp.next !== null) {
        temp = temp.next;
      }
      return temp.value;
    }
  }

  atIndex(index) {
    let i = 0;
    let temp = this.head;
    if (index === 0) {
      return temp.value;
    }
    while (i !== index && temp.next !== null) {
      i++;
      temp = temp.next;
    }
    if (i !== index && temp.next === null) {
      return "Item not found.";
    } else {
      return temp.value;
    }
  }

  pop() {
    let temp = this.head;
    let newTail = temp;
    while (temp.next !== null) {
      newTail = temp;
      temp = temp.next;
    }
    newTail.next = null;
  }

  contains(v) {
    let temp = this.head;
    if (temp.value === v) {
      return true;
    }
    while (temp.next !== null) {
      if (temp.value === v) {
        return true;
      }
      temp = temp.next;
    }
    if (temp.value === v) {
      return true;
    }
    return false;
  }

  find(v) {
    let i = 0;
    let temp = this.head;
    if (temp.value === v) {
      return i;
    }
    while (temp.next !== null) {
      i++;
      temp = temp.next;
      if (temp.value === v) {
        return i;
      }
    }
    if (temp.next === null) {
      if (temp.value === v) {
        return i;
      } else {
        return "Item not found.";
      }
    }
  }

  toString() {
    let strin = "";
    let temp = this.head;
    while (temp.next !== null) {
      strin = strin + `(${temp.value}) -> `;
      temp = temp.next;
    }
    strin = strin + `(${temp.value}) -> (null)`;
    return strin;
  }

  insertAt(v, index) {
    if (index > this.size()) {
      console.log(`The list is ${this.size()} nodes long.`);
    } else {
      const newNode = new Node(v);
      let i = 0;
      let temp = this.head;
      if (index === 0) {
        this.prepend(v);
      } else {
        while (i !== index - 1 && temp.next !== null) {
          i++;
          temp = temp.next;
        }
        const afterNode = temp.next;
        newNode.next = afterNode;
        temp.next = newNode;
      }
    }
  }

  remove(index) {
    if (index < this.size() - 1) {
      let j = 0;
      let temp = this.head;
      if (index === 0) {
        this.head = temp.next;
      } else {
        while (j !== index - 1 && temp.next !== null) {
          j++;
          temp = temp.next;
        }
        const before = temp;
        temp = temp.next;
        temp = temp.next;
        const after = temp;
        before.next = after;
      }
    } else {
      console.log(`The list is ${this.size()} nodes long.`);
    }
  }
}

// create and populate the list
const list1 = new LinkedList();
list1.append(6);
list1.append(16);
list1.append(4);
list1.append(3);
list1.prepend(9);

// print the list and try the methods
console.log(list1.toString());
console.log(`size: ${list1.size()}`);
console.log(`head: ${list1.findHead()}`);
console.log(`tail: ${list1.tail()}`);
console.log(`at index 3: ${list1.atIndex(3)}`);
console.log(`at index 0: ${list1.atIndex(0)}`);
list1.pop();
console.log(`after pop: ${list1.toString()}`);
console.log(`contains 8: ${list1.contains(8)}`);
console.log(`contains 16: ${list1.contains(16)}`);
console.log(`find 16: ${list1.find(16)}`);
console.log(list1.toString());
list1.insertAt(7, 0);
list1.insertAt(7, 100);
list1.insertAt(7, 3);
console.log(list1.toString());
list1.remove(100);
list1.remove(3);
console.log(list1.toString());
