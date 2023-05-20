import './index.scss';
import { createElement } from './scripts/createElement';
import * as vars from './scripts/vars';
import { createArrBoard } from './scripts/createArrBoard';
import { nameButtons } from './scripts/nameButtons';
import { createGameBoard } from './scripts/createGameBoard';
import { openEmptyUnits } from './scripts/openEmptyUnits';
import { controlWin } from './scripts/controlWin';
import { createRadioBlock } from './scripts/createRadioBlock';

vars.body.classList.add('page');
createElement('header', vars.body, '', 'page__header-page', 'header-page');
createElement('main', vars.body, '', 'main__main-page', 'main-page');
createElement('footer', vars.body, '', 'footer__footer-page', 'footer-page');

const header = document.querySelector('.header-page');

createElement('h1', header, '', 'header-page__title');

const headerTitle = document.querySelector('.header-page__title');
headerTitle.innerText = 'MINESWEEPER';

const mainPage = document.querySelector('.main-page');
createElement('div', mainPage, '', 'main-page__options-window', 'options');

/*--------options-window---------*/

const optionsBlock = document.querySelector('.options');
createElement('div', optionsBlock, '', 'options__container');

const optionsContainer = document.querySelector('.options__container');
createElement('div', optionsContainer, '', 'options__title-block');
createElement('div', optionsContainer, '', 'options__info-blocks-container');
const optionsTitleBlock = document.querySelector('.options__title-block');
createElement('h3', optionsTitleBlock, '', 'options__title');
const optionsTitle = document.querySelector('.options__title');
optionsTitle.innerText = 'Easy 10x10';

const optionsInfoBlocks = document.querySelector('.options__info-blocks-container');
createElement('div', optionsInfoBlocks, '', 'info-block');
createElement('div', optionsInfoBlocks, '', 'info-block');
createElement('div', optionsInfoBlocks, '', 'info-block');
const infoBlocks = document.querySelectorAll('.info-block');

infoBlocks.forEach(el => {
    const createdElSubtitle = document.createElement('h2');
    createdElSubtitle.classList.add('info-block__subtitle', 'subtitle')
    el.append(createdElSubtitle);
    const createdElCounter = document.createElement('div');
    createdElCounter.classList.add('info-block__counter', 'counter');
    el.append(createdElCounter);
})
const infoBlockSubtitles = document.querySelectorAll('.info-block__subtitle');
infoBlockSubtitles.forEach((el, i) => {
  el.innerText = vars.infoBlocksSubtitles[i];
})

const infoBlockCounters = document.querySelectorAll('.info-block__counter');
infoBlockCounters.forEach((el, i) => {
  const arr = ['counterClicks', 'counterMines', 'time'];
  el.id = arr[i];
})

createElement('button', optionsInfoBlocks, 'gameModeBtn', 'options__button', 'options__button_green', 'button');
createElement('button', optionsInfoBlocks, 'settingsBtn','options__button', 'options__button_yellow', 'button');
createElement('button', optionsInfoBlocks, 'scoreBtn', 'options__button', 'options__button_purple', 'button');
createElement('button', optionsInfoBlocks, 'scoreBtn', 'options__button', 'options__button_rose', 'button');
createElement('button', optionsInfoBlocks, 'scoreBtn', 'options__button', 'options__button_blue', 'button');
nameButtons(['Game Mode', 'Settings', 'Score', 'Save Game', 'New Game'], '.options__button')

/*----game-board-----*/

createElement('div', mainPage, '', 'main-page__game-board', 'game-board');
const  gameBoard = document.querySelector('.game-board');

let board = createArrBoard(10, 10, 10);
createGameBoard(board, gameBoard);

let clicksCounter = 0;

let units = document.querySelectorAll('.game-board__unit');
function createListenersUnits() {
  for (let i = 0; i < units.length; i++) {
    const counterClicksEl = document.querySelector('#counterClicks');
    counterClicksEl.innerText =  clicksCounter;
    units[i].addEventListener('click', function() {
      let row = parseInt(this.dataset.row);
      let col = parseInt(this.dataset.col);
      if(clicksCounter === 0 && board[row][col].isBomb) {
        board = createArrBoard(10, 10, 10);
        clicksCounter = 0;
      } 
      if (board[row][col].isBomb && clicksCounter !== 0) {
        this.classList.add('game-board__unit_over');
        clicksCounter += 1;
        counterClicksEl.innerText =  clicksCounter;
        alert('Вы проиграли!');
      } else {
        this.classList.add('game-board__unit_opened');
        this.innerText = board[row][col].bombsAround;
        if(board[row][col].bombsAround === 0) {
          this.classList.add('game-board__unit_opened-null');
        }
        if(board[row][col].bombsAround === 1) {
          this.classList.add('game-board__unit_opened-one');
        }
        if(board[row][col].bombsAround === 2) {
          this.classList.add('game-board__unit_opened-two');
        }
        if(board[row][col].bombsAround === 3) {
          this.classList.add('game-board__unit_opened-three');
        }
        if(board[row][col].bombsAround === 4) {
          this.classList.add('game-board__unit_opened-four');
        }
        if(board[row][col].bombsAround === 5) {
          this.classList.add('game-board__unit_opened-five');
        }
        if(board[row][col].bombsAround === 6) {
          this.classList.add('game-board__unit_opened-six');
        }
        if(board[row][col].bombsAround === 7) {
          this.classList.add('game-board__unit_opened-seven');
        }
        if(board[row][col].bombsAround === 8) {
          this.classList.add('game-board__unit_opened-eight');
        }
        clicksCounter += 1;
        counterClicksEl.innerText =  clicksCounter;
        openEmptyUnits(board, row, col);
        if (controlWin(board)) {
          alert('Вы выиграли!');
        }
      }
    });
    units[i].addEventListener('contextmenu', function(event) {
      event.preventDefault();
      let row = parseInt(this.dataset.row);
      let col = parseInt(this.dataset.col);
      if (!board[row][col].isOpened) {
        board[row][col].isFlagged = !board[row][col].isFlagged;
        if(+(counterMines.innerText) > 0) {
          counterMines.innerText = +(counterMines.innerText) - 1;
        } 
        if (+(counterMines.innerText) === 0) {
          if (controlWin(board)) {
            alert('Вы выиграли!');
          } else {
            alert('Вы проиграли!')
          }
        }
        
        this.classList.toggle('game-board__unit_flagged');
      }

    });
  }

}
createListenersUnits();
/*---------game-mode-window---------*/
createElement('div', mainPage, 'gameModeWindow', 'main-page__game-mode-window', 'window-block_closed');
const gameModeWindow = document.querySelector('#gameModeWindow');
createElement('h2', gameModeWindow, '', 'window-block__subtitle');
nameButtons(['Game Mode'], '.window-block__subtitle');

createElement('div', gameModeWindow, 'gameModeClose', 'window-block__close-btn');
nameButtons(['+'], '.window-block__close-btn');

createElement('div', gameModeWindow, '', 'window-block__inner-container');

const innerContainer = document.querySelector('.window-block__inner-container');
innerContainer.append(createRadioBlock({classNameRadioBlock: 'input-block', classNameInput:'input-block__marker' , inputType: 'radio', inputId: 'easy', nameInput: 'level', classLabelBlock: 'input-block__label', classLabelSubtitle: 'input-block__subtitle', labelSubtitleText: 'Easy', classLabelInfo: 'input-block__info', labelInfoText: '10x10'}));
innerContainer.append(createRadioBlock({classNameRadioBlock: 'input-block', classNameInput:'input-block__marker' , inputType: 'radio', inputId: 'medium', nameInput: 'level', classLabelBlock: 'input-block__label', classLabelSubtitle: 'input-block__subtitle', labelSubtitleText: 'Medium', classLabelInfo: 'input-block__info', labelInfoText: '16x16'}));
innerContainer.append(createRadioBlock({classNameRadioBlock: 'input-block', classNameInput:'input-block__marker' , inputType: 'radio', inputId: 'hard', nameInput: 'level', classLabelBlock: 'input-block__label', classLabelSubtitle: 'input-block__subtitle', labelSubtitleText: 'Hard', classLabelInfo: 'input-block__info', labelInfoText: '25x25'}));
const errorBlock = document.createElement('div');
errorBlock.classList.add('window-block__error-block');
const inputTextBlock = document.createElement('div');
inputTextBlock.classList.add('window-block__input-text-block', 'input-text-block');
innerContainer.append(inputTextBlock);
innerContainer.append(errorBlock);
const inputMines = document.createElement('input');
inputMines.type = 'text';
inputMines.id = 'inputMines';
const labelInputMines = document.createElement('label');
labelInputMines.classList.add('input-text-block__label');
labelInputMines.innerText = 'Mines';
labelInputMines.setAttribute('for', 'inputMines');
inputTextBlock.append(inputMines);
inputTextBlock.append(labelInputMines);

createElement('button', innerContainer, 'startGameBtn', 'options__button', 'button', 'options__button', 'options__button_purple');
const startGameBtn = document.querySelector('#startGameBtn');
startGameBtn.innerText = 'Start Game';

const markerEasy = document.querySelector('#easy');
markerEasy.checked = 'true';
inputMines.value = 10;
/*------button-game-mode----*/
const gameModeBtn = document.querySelector('#gameModeBtn');
const backdrop = document.createElement('div');
backdrop.classList.add('backdrop');
gameModeBtn.addEventListener('click', (e) => {
  vars.body.append(backdrop);
  gameModeWindow.classList.toggle('window-block_opened');
  gameModeWindow.classList.toggle('window-block_closed');
});
gameModeWindow.addEventListener('click', (e) => {
  e.stopPropagation();
});

const markerMedium = document.querySelector('#medium');
const markerHard = document.querySelector('#hard');

markerMedium.addEventListener('input', () => {
 
  markerEasy.checked = false;
  markerHard.checked = false;
  markerMedium.checked = true;
  inputMines.value = 25;
  checkInputValue();
})

markerEasy.addEventListener('input', () => {
  markerMedium.checked = false;
  markerHard.checked = false;
  markerEasy.checked = true;
  inputMines.value = 10;
  checkInputValue();
})

markerHard.addEventListener('input', () => {
  markerEasy.checked = false;
  markerMedium.checked = false;
  markerHard.checked = true;
  inputMines.value = 80;
  checkInputValue();
})

const closeBtns = document.querySelector('#gameModeClose');

closeBtns.addEventListener('click', () => {
  errorBlock.innerHTML = '';
  if(markerEasy.checked) {
    inputMines.value = 10;
  } else if(markerMedium.checked) {
    inputMines.value = 25;
  } else if(markerHard.checked) {
    inputMines.value = 30;
  }
  gameModeWindow.classList.toggle('window-block_opened');
  gameModeWindow.classList.toggle('window-block_closed');
  vars.body.removeChild(backdrop);
})

inputMines.addEventListener('input', checkInputValue);

function checkInputValue() {
  if(inputMines.value < 10 || inputMines.value > 99 || !(+(inputMines.value))) {
    errorBlock.innerText = 'Error! The number of mines can be from 10 to 99!';
    startGameBtn.disabled = true;
  } else if (inputMines.value >= 10 && inputMines.value <= 99) {
    errorBlock.innerHTML = '';
    startGameBtn.disabled = false;
  }
}
let counterMines = document.querySelector('#counterMines');
counterMines.innerText = 10;
startGameBtn.addEventListener('click', () => {
  gameModeWindow.classList.toggle('window-block_opened');
  gameModeWindow.classList.toggle('window-block_closed');

  vars.body.removeChild(backdrop);
  if(markerEasy.checked) {
    board = createArrBoard(10, 10, inputMines.value);
    gameBoard.innerHTML = "";
    createGameBoard(board, gameBoard);
    clicksCounter = 0;
    units = document.querySelectorAll('.game-board__unit');
    createListenersUnits();
    optionsTitle.innerText = 'Easy 10x10';
  } else if(markerMedium.checked) {
    board = createArrBoard(16, 16, inputMines.value);
    gameBoard.innerHTML = "";
    createGameBoard(board, gameBoard);
    units = document.querySelectorAll('.game-board__unit');
    clicksCounter = 0;
    createListenersUnits();
    optionsTitle.innerText = 'Medium 16x16';
  } else if(markerHard.checked) {
    board = createArrBoard(25, 25, inputMines.value);
    gameBoard.innerHTML = "";
    createGameBoard(board, gameBoard);
    units = document.querySelectorAll('.game-board__unit');
    clicksCounter = 0;
    createListenersUnits();
    optionsTitle.innerText = 'Hard 25x25';
  }
  counterMines.innerText = inputMines.value;
})
