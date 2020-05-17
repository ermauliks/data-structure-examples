const walk = (node, fn) => {
  node.children.forEach(child => {
    if (child.children.length)
      walk(child, fn);
    fn(child);
  })
}

const getElementById = id => {
  let element = null;
  walk(document.body, node => {
    if (node.getAttribute && node.getAttribute('id') === id)
        element = node;
  });
  return element;
}

const getElementsByClassName = name => {
  let elements = [];
  walk(document.body, node => {
      if (node.classList && Array.from(node.classList).includes(name)
        elements.push(node);
  });
  return elements;
}

const getElementsByAttribute = (attr, val) => {
  let elements = [];
  walk(document.body, node => {
if (node.getAttributeNode && node.getAttributeNode(attr).value === val)
elements.push(node);
  });
  return elements;
}

console.log(getElementById('abc').textContent);
console.log(getElementsByClassName('abc')[0].textContent);
console.log(getElementsByAttribute('class', 'abc')[0].textContent);
