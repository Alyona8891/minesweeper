export function nameButtons(arrNames, className) {
  const buttons = document.querySelectorAll(className);
  buttons.forEach((el, i) => {
    el.innerText = arrNames[i];
  })
}