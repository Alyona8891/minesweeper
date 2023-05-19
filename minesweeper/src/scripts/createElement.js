export function createElement(tagName, parentElem, idName, ...classNames) {
  const createdElement = document.createElement(tagName);
  if(idName) {
    createdElement.id = idName;
  }
  const arrClassNames  = classNames;
  for (const className of arrClassNames) {
    createdElement.classList.add(className);
  }
  parentElem.append(createdElement);
}