export function createRadioBlock({classNameRadioBlock, classNameInput, inputType, inputId, nameInput, classLabelBlock, classLabelSubtitle, labelSubtitleText, classLabelInfo, labelInfoText}) {
    const radioBlock = document.createElement('div');
    radioBlock.classList.add(classNameRadioBlock);
    const input = document.createElement('input');
    input.classList.add(classNameInput);
    input.type = inputType;
    input.id = inputId;
    const label = document.createElement('label');
    label.setAttribute('for', inputId);
    input.setAttribute('name', nameInput);
    const labelBlock = document.createElement('div');
    labelBlock.classList.add(classLabelBlock);
    const labelSubtitle = document.createElement('h3');
    labelSubtitle.classList.add(classLabelSubtitle);
    labelSubtitle.innerText = labelSubtitleText;
    const labelInfo = document.createElement('p');
    labelInfo.classList.add(classLabelInfo);
    labelInfo.innerText = labelInfoText;
    radioBlock.append(input);
    radioBlock.append(label);
    label.append(labelBlock);
    labelBlock.append(labelSubtitle);
    labelBlock.append(labelInfo);
    return radioBlock;
}