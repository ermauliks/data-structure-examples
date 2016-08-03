var A = [1,2,3,4,5,6,6,6,7,8,9];

console.log(BinarySearch(A, 2));
console.log(BinarySearchRecursive(A, 0, A.length, 6));
console.log(BinarySearchFirstLast(A, 6, 'last'));
console.log(BinaryCountOccurances(A, 6));

function BinarySearch(A, item) {
  var start = 0;
  var end = A.length-1;
  var mid;
  
  while (start <= end) {
    mid = Math.floor((start+end)/2);
    
    if(item == A[mid]) {
      return mid;
    } else if (item <= A[mid]) {
      end = mid-1;
    } else {
      start = mid + 1;
    }
  }
  
  return false;
}

function BinarySearchRecursive(A, start, end, item) {
  var mid = Math.floor((start+end)/2);

  if(item == A[mid]) {
    return mid;
  } else if (item <= A[mid]) {
    return BinarySearchRecursive(A, start, mid-1, item);
  } else {
    return BinarySearchRecursive(A, mid+1, end, item);
  }

  return false;
}

function BinarySearchFirstLast(A, item, firstOrLast) {
  var start = 0;
  var end = A.length-1;
  var mid;
  var result = -1;
  
  while (start <= end) {
    mid = Math.floor((start+end)/2);
    
    if(item == A[mid]) {
      result = mid;
      if (firstOrLast === 'first')
        end = mid - 1;
      else if (firstOrLast === 'last')
        start = mid + 1;        
    } else if (item < A[mid]) {
      end = mid-1;
    } else {
      start = mid + 1;
    }
  }

  return result;
}

function BinaryCountOccurances(A, item) {
  var firstIndex = BinarySearchFirstLast(A, item, "first");
  var lastIndex;
  var result;
  
  if(firstIndex === -1) {
    return 0;
  }
  
  lastIndex = BinarySearchFirstLast(A, item, "last");
  
  if(lastIndex === -1){
    return -1;
  }
  
  return lastIndex - firstIndex +1;
}
