export function nameButtons(arrNames, className) {
  const buttons = document.querySelectorAll(className);
  buttons.forEach((el, i) => {
    const elem = el;
    elem.innerText = arrNames[i];
  });
}
