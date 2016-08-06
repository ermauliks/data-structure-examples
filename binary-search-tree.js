var BinaryTree = function() {
  this._root = null;
};

BinaryTree.prototype.isBinarySearchTree = function(root) {
  return this.isBST(root, "A", "Z");
};

BinaryTree.prototype.isBST = function(root, min, max) {
  if(root === null) return true;
  if(root.data >= min && 
     root.data < max && 
     this.isBST(root.left, min, root.data) && 
     this.isBST(root.right, root.data, max)
    )
    return true;
  else {
    return false;
  }
};

BinaryTree.prototype.findHeight = function() {
  function findHeight(root) {
    function max(left, right) {
      if (left < right) return right+1;
      else return left+1;
    }    
    if (root === null) return 0;
    return max(findHeight(root.left), findHeight(root.right));
  }
  return findHeight(this._root);
};
  
BinaryTree.prototype.traverseLevel = function() {
  var result = [];
  if (this._root === null) return;
  var q = [this._root];
  while(q.length) {
    var current = q[0];
    result.push(current.data);
    if(current.left)
      q.push(current.left);
    if(current.right)
      q.push(current.right);
    for (var i=0; i<q.length; i++){q[i]=q[i+1];}q.pop();
  }
  return result;
};
  
BinaryTree.prototype.traverseInorder = function() {
  var result = [];
  function printData(n) {
    result.push(n);
    return;
  }
  function inOrder(node) {
    if (node) {
      if (node.left !== null) {
        inOrder(node.left);
      }
      printData(node.data);
      if (node.right !== null) {
        inOrder(node.right);
      }
    }
  }
  inOrder(this._root);
  return result;
};

BinaryTree.prototype.findMax = function() {
  var current = this._root;  
  while (current.right) {
    current = current.right;
  }
  return current.data;
};

BinaryTree.prototype.findMin = function() {
  var current = this._root;  
  while (current.left) {
    current = current.left;
  }
  return current.data;
};

BinaryTree.prototype.insert = function(data) {
  var node = {
    data: data,
    left: null,
    right: null
  }, current;
  
  if(this._root === null) {
    this._root = node;
    return true;
  } else {
    current = this._root;
    while (true) {
      if (data <= current.data) {
        if (current.left === null) {
          current.left = node;
          break;
        } else {
          current = current.left
        }
      } else if (data > current.data){
        if (current.right === null) {
          current.right = node;
          break;
        } else {
          current = current.right
        }  
      }
    }
  }
  return false;
};

var binaryTree = new BinaryTree();

binaryTree.insert("F");
binaryTree.insert("D");
binaryTree.insert("J");
binaryTree.insert("B");
binaryTree.insert("E");
binaryTree.insert("G");
binaryTree.insert("K");
binaryTree.insert("A");
binaryTree.insert("C");
binaryTree.insert("I");
binaryTree.insert("H");

console.log("In-order");
console.log(binaryTree.traverseInorder());

console.log("Level-order");
console.log(binaryTree.traverseLevel());

console.log("Is BST?");
console.log(binaryTree.isBinarySearchTree(binaryTree._root));

console.log('Min ' + binaryTree.findMin());

console.log('Max ' + binaryTree.findMax());

console.log('Height ' + binaryTree.findHeight());
