var LinkedList = function() {
  this._length = 0;
  this._head = null;
};

LinkedList.prototype.reverse = function () {
  if (this._head == null || this._length === 1) {
    return null;
  }
  
  var current = this._head,
      prev = null,
      next;
 
  while(current.next){
    next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  current.next = prev;
  this._head = current;  
};

LinkedList.prototype.print = function (index) {
  if (this._head == null) {
    return null;
  }
  var current = this._head;
  console.log('Printing entire list');
  console.log(current.data);
  while(current.next){
    current = current.next;
    console.log(current.data);    
  }
};


LinkedList.prototype.remove = function (index) {
  //check for out-of-bounds values
  if (index > -1 && index < this._length){
    var current = this._head,
        previous,
        i = 0;
    if (index === 0) {
      this._head = current.next;
    } else {
      while (i++ < index)  {
        prev = current;
        current = current.next;
      }
      prev.next = current.next;
    }
    //decrement the length
    this._length--;
    //return the value
    return current.data;      
  } else {
    return null;
  }
};

LinkedList.prototype.item = function (index) {
  var i = 0;
  if (index > -1 && index < this._length) {
    var current = this._head;
    while (i < index) {
      current = current.next;
      i++;
    }
    return current.data;
  } else {
    return null;
  }
  
};

LinkedList.prototype.add = function (data) {
  var node = {
    data: data,
    next: null
  };
  
  var current;
  
  if (this._head === null) {
    this._head = node;
  } else {
    current = this._head;
    
    while (current.next) {
      current = current.next;
    }
    current.next = node;
  }
  
  this._length++;
};

var list = new LinkedList();
list.add('A');
list.add('B');
list.add('C');
list.add('D');
list.add('E');
list.add('F');
list.print();
list.reverse();
list.print();
console.log("Element at 2nd location is - " + list.item(1));
console.log(list.item(1));
list.remove(1);
list.print();
