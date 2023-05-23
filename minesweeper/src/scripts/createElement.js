export function createElement(tagName, parentElem, idName, ...classNames) {
  const createdElement = document.createElement(tagName);
  if (idName) {
    createdElement.id = idName;
  }
  const arrClassNames = classNames;
  arrClassNames.forEach((el) => {
    createdElement.classList.add(el);
  });
  parentElem.append(createdElement);
}
