console.log('([][]){({}})}');
console.log(isBalanced('([][]){({}})}'));

console.log('([][])({}})}');
console.log(isBalanced('([][])({}})}'));

console.log('([][]{})');
console.log(isBalanced('([][]{})'));

function isBalanced (str) {
  var stack = [];
  for (var i=0; i<str.length; i++) {
    if (str[i] === "{" || str[i] === "(" || str[i] === "[") {
      stack.push(str[i]);
    } else {
      if (i !== 0){
        var element = stack[stack.length-1];
        if ((str[i] === ")" && element === '(')|| 
            (str[i] === "]" && element === '[')|| 
            (str[i] === "}" && element === '{')) {
            stack.pop();
        } else {
          return false;
        }
      }
    } 
  }
  if (stack.length === 0) {
    return true;
  } else {
    return false;
  }
}
