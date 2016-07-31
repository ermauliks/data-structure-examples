var str = '([{}][{)}])';
var stack = [];

console.log(str);
console.log(isBalanced(str));

function isBalanced (str) {
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
        }
      }
    } 
  }
  if (stack.length < 1) {
    return true;
  } else {
    return false;
  }
}
