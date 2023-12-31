import './index.scss';
import { createElement } from './scripts/createElement';
import * as vars from './scripts/vars';
import { createArrBoard } from './scripts/createArrBoard';
import { nameButtons } from './scripts/nameButtons';
import { createGameBoard } from './scripts/createGameBoard';
import { openEmptyUnits } from './scripts/openEmptyUnits';
import { controlWin } from './scripts/controlWin';
import { createRadioBlock } from './scripts/createRadioBlock';
import { unitClickSound } from './scripts/soundClickUnit';
import { unitFlagSound } from './scripts/soundContextUnit';
import { winnerSound } from './scripts/soundWinner';
import { overSound } from './scripts/soundGameOver';

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
/* --------options-window--------- */
const optionsBlock = document.querySelector('.options');
createElement('div', optionsBlock, '', 'options__container');
const optionsContainer = document.querySelector('.options__container');
createElement('div', optionsContainer, '', 'options__title-block');
createElement('div', optionsContainer, '', 'options__info-blocks-container');
const optionsTitleBlock = document.querySelector('.options__title-block');
createElement('h3', optionsTitleBlock, '', 'options__title');
const optionsTitle = document.querySelector('.options__title');
if (localStorage.alyonaOptionsTitle) {
  optionsTitle.innerText = localStorage.alyonaOptionsTitle;
} else {
  optionsTitle.innerText = 'Easy 10x10';
}

const optionsInfoBlocks = document.querySelector('.options__info-blocks-container');
createElement('div', optionsInfoBlocks, '', 'info-block');
createElement('div', optionsInfoBlocks, '', 'info-block');
createElement('div', optionsInfoBlocks, '', 'info-block');
const infoBlocks = document.querySelectorAll('.info-block');

infoBlocks.forEach((el) => {
  const createdElSubtitle = document.createElement('h2');
  createdElSubtitle.classList.add('info-block__subtitle', 'subtitle');
  el.append(createdElSubtitle);
  const createdElCounter = document.createElement('div');
  createdElCounter.classList.add('info-block__counter', 'counter');
  el.append(createdElCounter);
});

const infoBlockSubtitles = document.querySelectorAll('.info-block__subtitle');

infoBlockSubtitles.forEach((el, i) => {
  const element = el;
  element.innerText = vars.infoBlocksSubtitles[i];
});

const infoBlockCounters = document.querySelectorAll('.info-block__counter');
infoBlockCounters.forEach((el, i) => {
  const arr = ['counterClicks', 'counterMines', 'time'];
  const element = el;
  element.id = arr[i];
});

createElement('button', optionsInfoBlocks, 'gameModeBtn', 'options__button', 'options__button_green', 'button');
createElement('button', optionsInfoBlocks, 'settingsBtn', 'options__button', 'options__button_yellow', 'button');
createElement('button', optionsInfoBlocks, 'scoreBtn', 'options__button', 'options__button_purple', 'button');
createElement('button', optionsInfoBlocks, 'saveGameBtn', 'options__button', 'options__button_rose', 'button');
createElement('button', optionsInfoBlocks, 'startNewGameBtn', 'options__button', 'options__button_blue', 'button');
nameButtons(['Game Mode', 'Settings', 'Score', 'Save Game', 'New Game'], '.options__button');

const timerBlock = document.querySelector('#time');

if (localStorage.alyonaTimerBlock) {
  timerBlock.innerHTML = localStorage.alyonaTimerBlock;
} else {
  timerBlock.innerHTML = '0';
}
/* ----game-board----- */
createElement('div', mainPage, '', 'main-page__game-board', 'game-board');
const gameBoard = document.querySelector('.game-board');

let board;
let clicksCounter;
let units;

function createListenersUnits() {
  for (let i = 0; i < units.length; i += 1) {
    units[i].addEventListener('click', clickUnit);
    units[i].addEventListener('contextmenu', clickContextUnit);
  }
}

if (localStorage.arrBoard) {
  board = JSON.parse(localStorage.arrBoard);
  createGameBoard(board, gameBoard);
  const arrClassLists = JSON.parse(localStorage.arrClassLists);
  const arrInnerText = JSON.parse(localStorage.arrInnerText);
  units = document.querySelectorAll('.game-board__unit');
  for (let i = 0; i < units.length; i += 1) {
    units[i].classList.value = arrClassLists[i];
    units[i].innerText = arrInnerText[i];
  }
  createListenersUnits();
} else {
  board = createArrBoard(10, 10, 10);
  createGameBoard(board, gameBoard);
  units = document.querySelectorAll('.game-board__unit');
  createListenersUnits();
}
if (localStorage.alyonaClicksCounter) {
  clicksCounter = +(localStorage.alyonaClicksCounter);
} else {
  clicksCounter = 0;
}
let timer;
let seconds;
if (localStorage.alyonaSeconds) {
  seconds = +(localStorage.alyonaSeconds);
  startTimer();
} else {
  seconds = 0;
}

function startTimer() {
  seconds += 1;
  document.getElementById('time').innerHTML = seconds;
  timer = setTimeout(startTimer, 1000);
}

function clickUnit() {
  unitClickSound.play();
  const row = parseInt(this.dataset.row, 10);
  const col = parseInt(this.dataset.col, 10);
  if (board[row][col].isFlagged === true) {
    counterMines.innerText = +(counterMines.innerText) + 1;
    board[row][col].isFlagged = false;
  }
  if (clicksCounter === 0 && board[row][col].isBomb) {
    board = createArrBoard(10, 10, inputMines.value);
    clicksCounter = 0;
  }
  if (clicksCounter === 0) {
    startTimer();
  }
  if (board[row][col].isBomb && clicksCounter !== 0) {
    if (theme === 'light') {
      this.classList.add('game-board__unit_over');
    } else {
      this.classList.add('game-board__unit_over-dark');
    }
    clicksCounter += 1;
    counterClicksEl.innerText = clicksCounter;
    overSound.play();
    vars.body.append(backdrop);
    resultsWindow.classList.toggle('results-block_opened');
    resultsWindow.classList.toggle('results-block_closed');
    innerResultsContainer.innerText = 'Game over. Try again';
    clearTimer();
    units.forEach((i) => i.removeEventListener('click', clickUnit));
    units.forEach((i) => i.removeEventListener('contextmenu', clickContextUnit));
  } else {
    if (theme === 'light') {
      this.classList.remove('game-board__unit_flagged');
      this.classList.add('game-board__unit_opened');
    } else {
      this.classList.add('game-board__unit_opened-dark');
      this.classList.remove('game-board__unit_flagged-dark');
    }
    this.innerText = board[row][col].bombsAround;
    if (board[row][col].bombsAround === 0) {
      this.classList.add('game-board__unit_opened-null');
    }
    if (board[row][col].bombsAround === 1) {
      this.classList.add('game-board__unit_opened-one');
    }
    if (board[row][col].bombsAround === 2) {
      this.classList.add('game-board__unit_opened-two');
    }
    if (board[row][col].bombsAround === 3) {
      this.classList.add('game-board__unit_opened-three');
    }
    if (board[row][col].bombsAround === 4) {
      this.classList.add('game-board__unit_opened-four');
    }
    if (board[row][col].bombsAround === 5) {
      this.classList.add('game-board__unit_opened-five');
    }
    if (board[row][col].bombsAround === 6) {
      this.classList.add('game-board__unit_opened-six');
    }
    if (board[row][col].bombsAround === 7) {
      this.classList.add('game-board__unit_opened-seven');
    }
    if (board[row][col].bombsAround === 8) {
      this.classList.add('game-board__unit_opened-eight');
    }
    clicksCounter += 1;
    counterClicksEl.innerText = clicksCounter;
    openEmptyUnits(theme, board, row, col);
    if (controlWin(board)) {
      winnerSound.play();
      clearTimeout(timer);
      vars.body.append(backdrop);
      resultsWindow.classList.toggle('results-block_opened');
      resultsWindow.classList.toggle('results-block_closed');
      innerResultsContainer.innerText = `Hooray! You found all mines in ${timerBlock.innerText} seconds and ${counterClicksEl.innerText} moves!`;
      writeScoreArr();
      localStorage.alyonaScoreArr = JSON.stringify(scoreArr);
      units.forEach((i) => i.removeEventListener('click', clickUnit));
      units.forEach((i) => i.removeEventListener('contextmenu', clickContextUnit));
    }
  }
}

function clickContextUnit(event) {
  unitFlagSound.play();
  event.preventDefault();
  const row = parseInt(this.dataset.row, 10);
  const col = parseInt(this.dataset.col, 10);
  if (!board[row][col].isOpened) {
    board[row][col].isFlagged = !board[row][col].isFlagged;
    if (board[row][col].isFlagged === true) {
      counterMines.innerText = +(counterMines.innerText) - 1;
    } else if (board[row][col].isFlagged === false) {
      counterMines.innerText = +(counterMines.innerText) + 1;
    }
    if (theme === 'light') {
      this.classList.toggle('game-board__unit_flagged');
    } else {
      this.classList.toggle('game-board__unit_flagged-dark');
    }
  }
}

function clearTimer() {
  clearTimeout(timer);
}

const counterClicksEl = document.querySelector('#counterClicks');
counterClicksEl.innerText = clicksCounter;

/* ---------game-mode-window--------- */

createElement('div', mainPage, 'gameModeWindow', 'main-page__game-mode-window', 'window-block_closed');
const gameModeWindow = document.querySelector('#gameModeWindow');
createElement('h2', gameModeWindow, '', 'window-block__subtitle');
nameButtons(['Game Mode'], '.window-block__subtitle');
createElement('div', gameModeWindow, 'gameModeClose', 'window-block__close-btn');
nameButtons(['+'], '.window-block__close-btn');
createElement('div', gameModeWindow, '', 'window-block__inner-container');
const innerContainer = document.querySelector('.window-block__inner-container');
innerContainer.append(createRadioBlock({
  classNameRadioBlock: 'input-block', classNameInput: 'input-block__marker', inputType: 'radio', inputId: 'easy', nameInput: 'level', classLabelBlock: 'input-block__label', classLabelSubtitle: 'input-block__subtitle', labelSubtitleText: 'Easy', classLabelInfo: 'input-block__info', labelInfoText: '10x10',
}));
innerContainer.append(createRadioBlock({
  classNameRadioBlock: 'input-block', classNameInput: 'input-block__marker', inputType: 'radio', inputId: 'medium', nameInput: 'level', classLabelBlock: 'input-block__label', classLabelSubtitle: 'input-block__subtitle', labelSubtitleText: 'Medium', classLabelInfo: 'input-block__info', labelInfoText: '16x16',
}));
innerContainer.append(createRadioBlock({
  classNameRadioBlock: 'input-block', classNameInput: 'input-block__marker', inputType: 'radio', inputId: 'hard', nameInput: 'level', classLabelBlock: 'input-block__label', classLabelSubtitle: 'input-block__subtitle', labelSubtitleText: 'Hard', classLabelInfo: 'input-block__info', labelInfoText: '25x25',
}));
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
const markerMedium = document.querySelector('#medium');
const markerHard = document.querySelector('#hard');

if (localStorage.alyonaMarkerEasy
  || localStorage.alyonaMarkerMedium
  || localStorage.alyonaMarkerHard) {
  if (localStorage.alyonaMarkerEasy === 'true') {
    markerEasy.checked = true;
  } else {
    markerEasy.checked = false;
  }
  if (localStorage.alyonaMarkerMedium === 'true') {
    markerMedium.checked = true;
  } else {
    markerMedium.checked = false;
  }
  if (localStorage.alyonaMarkerHard === 'true') {
    markerHard.checked = true;
  } else {
    markerHard.checked = false;
  }
} else {
  markerEasy.checked = true;
  markerMedium.checked = false;
  markerHard.checked = false;
}

if (localStorage.alyonaInputMines) {
  inputMines.value = +(localStorage.alyonaInputMines);
} else {
  inputMines.value = 10;
}
/* ------button-game-mode---- */
const gameModeBtn = document.querySelector('#gameModeBtn');
const backdrop = document.createElement('div');
backdrop.classList.add('backdrop');
gameModeBtn.addEventListener('click', () => {
  vars.body.append(backdrop);
  gameModeWindow.classList.toggle('window-block_opened');
  gameModeWindow.classList.toggle('window-block_closed');
});
gameModeWindow.addEventListener('click', (e) => {
  e.stopPropagation();
});

markerMedium.addEventListener('input', () => {
  markerEasy.checked = false;
  markerHard.checked = false;
  markerMedium.checked = true;
  inputMines.value = 10;
  checkInputValue();
});

markerEasy.addEventListener('input', () => {
  markerMedium.checked = false;
  markerHard.checked = false;
  markerEasy.checked = true;
  inputMines.value = 10;
  checkInputValue();
});

markerHard.addEventListener('input', () => {
  markerEasy.checked = false;
  markerMedium.checked = false;
  markerHard.checked = true;
  inputMines.value = 10;
  checkInputValue();
});

const closeBtns = document.querySelector('#gameModeClose');

closeBtns.addEventListener('click', () => {
  errorBlock.innerHTML = '';
  if (markerEasy.checked) {
    inputMines.value = 10;
  } else if (markerMedium.checked) {
    inputMines.value = 25;
  } else if (markerHard.checked) {
    inputMines.value = 30;
  }
  gameModeWindow.classList.toggle('window-block_opened');
  gameModeWindow.classList.toggle('window-block_closed');
  vars.body.removeChild(backdrop);
});

inputMines.addEventListener('input', checkInputValue);

function checkInputValue() {
  if (inputMines.value < 10 || inputMines.value > 99 || !(+(inputMines.value))) {
    errorBlock.innerText = 'Error! The number of mines can be from 10 to 99!';
    startGameBtn.disabled = true;
  } else if (inputMines.value >= 10 && inputMines.value <= 99) {
    errorBlock.innerHTML = '';
    startGameBtn.disabled = false;
  }
}
let counterMines = document.querySelector('#counterMines');
if (localStorage.alyonaCounterMines) {
  counterMines.innerText = localStorage.alyonaCounterMines;
} else {
  counterMines.innerText = 10;
}

function restartGame() {
  if (markerEasy.checked) {
    board = createArrBoard(10, 10, inputMines.value);
    gameBoard.innerHTML = '';
    createGameBoard(board, gameBoard);
    clicksCounter = 0;
    units = document.querySelectorAll('.game-board__unit');
    createListenersUnits();
    correctTheme();
    optionsTitle.innerText = 'Easy 10x10';
  } else if (markerMedium.checked) {
    board = createArrBoard(16, 16, inputMines.value);
    gameBoard.innerHTML = '';
    createGameBoard(board, gameBoard);
    units = document.querySelectorAll('.game-board__unit');
    clicksCounter = 0;
    createListenersUnits();
    correctTheme();
    optionsTitle.innerText = 'Medium 16x16';
  } else if (markerHard.checked) {
    board = createArrBoard(25, 25, inputMines.value);
    gameBoard.innerHTML = '';
    createGameBoard(board, gameBoard);
    units = document.querySelectorAll('.game-board__unit');
    clicksCounter = 0;
    createListenersUnits();
    correctTheme();
    optionsTitle.innerText = 'Hard 25x25';
  }
  counterMines.innerText = inputMines.value;
  clearTimeout(timer);
  timerBlock.innerHTML = '0';
  seconds = 0;
  counterClicksEl.innerText = clicksCounter;
  saveGameBtn.disabled = false;
}
startGameBtn.addEventListener('click', () => {
  gameModeWindow.classList.toggle('window-block_opened');
  gameModeWindow.classList.toggle('window-block_closed');
  vars.body.removeChild(backdrop);
  restartGame();
});
/* -------setting----- */
createElement('div', mainPage, 'settingsWindow', 'main-page__settings-window', 'settings-block', 'settings-block_closed');
const settingsWindow = document.querySelector('#settingsWindow');
createElement('h2', settingsWindow, '', 'settings-block__subtitle');

createElement('div', settingsWindow, 'settingsClose', 'settings-block__close-btn');
nameButtons(['+'], '.settings-block__close-btn');
createElement('div', settingsWindow, '', 'settings-block__inner-container');
const innerSettingsContainer = document.querySelector('.settings-block__inner-container');
createElement('h2', innerSettingsContainer, '', 'settings-block__subtitle');
createElement('div', innerSettingsContainer, '', 'settings-block__themes-block', 'themes-block');
const themesBlock = document.querySelector('.themes-block');
createElement('button', themesBlock, 'lightTheme', 'themes-block__theme');
createElement('button', themesBlock, 'darkTheme', 'themes-block__theme');
const themesLightBtn = document.querySelector('#lightTheme');
createElement('div', themesLightBtn, '', 'themes-block__unit', 'themes-block__unit-light_closen');
createElement('div', themesLightBtn, '', 'themes-block__unit', 'themes-block__unit-light_opened');
document.querySelector('.themes-block__unit-light_opened').innerText = '?';

createElement('div', themesLightBtn, '', 'themes-block__unit', 'themes-block__unit-light_flagged');
createElement('div', themesLightBtn, '', 'themes-block__unit', 'themes-block__unit-light_over');
const themesDarkBtn = document.querySelector('#darkTheme');
createElement('div', themesDarkBtn, '', 'themes-block__unit', 'themes-block__unit-dark_closen');
createElement('div', themesDarkBtn, '', 'themes-block__unit', 'themes-block__unit-dark_opened');
document.querySelector('.themes-block__unit-dark_opened').innerText = '?';
createElement('div', themesDarkBtn, '', 'themes-block__unit', 'themes-block__unit-dark_flagged');
createElement('div', themesDarkBtn, '', 'themes-block__unit', 'themes-block__unit-dark_over');
createElement('h2', innerSettingsContainer, '', 'settings-block__subtitle');
innerSettingsContainer.append(createRadioBlock({
  classNameRadioBlock: 'sound-block', classNameInput: 'sound-block__marker', inputType: 'radio', inputId: 'soundOn', nameInput: 'sound', classLabelBlock: 'sound-block__label', classLabelSubtitle: 'sound-block__subtitle', labelSubtitleText: 'On', classLabelInfo: 'sound-block__info', labelInfoText: '',
}));
innerSettingsContainer.append(createRadioBlock({
  classNameRadioBlock: 'sound-block', classNameInput: 'sound-block__marker', inputType: 'radio', inputId: 'soundOff', nameInput: 'sound', classLabelBlock: 'sound-block__label', classLabelSubtitle: 'sound-block__subtitle', labelSubtitleText: 'Off', classLabelInfo: 'sound-block__info', labelInfoText: '',
}));
createElement('button', innerSettingsContainer, 'conformBtn', 'settings__button', 'button', 'options__button_purple');
const markerSoundOn = document.querySelector('#soundOn');
const markerSoundOff = document.querySelector('#soundOff');

if (localStorage.alyonaSoundOn || localStorage.alyonaSoundOff) {
  if (localStorage.alyonaSoundOn === 'true') {
    markerSoundOn.checked = true;
    unitClickSound.volume = 0.5;
    unitFlagSound.volume = 0.5;
    winnerSound.volume = 0.5;
    overSound.volume = 0.5;
  } else {
    markerSoundOn.checked = false;
  }
  if (localStorage.alyonaSoundOff === 'true') {
    markerSoundOff.checked = true;
    unitClickSound.volume = 0;
    unitFlagSound.volume = 0;
    winnerSound.volume = 0;
    overSound.volume = 0;
  } else {
    markerSoundOff.checked = false;
  }
} else {
  markerSoundOn.checked = true;
}

nameButtons(['Settings', 'Themes', 'Sound'], '.settings-block__subtitle');

const settingsBtn = document.querySelector('#settingsBtn');
settingsBtn.addEventListener('click', () => {
  vars.body.append(backdrop);
  settingsWindow.classList.toggle('settings-block_opened');
  settingsWindow.classList.toggle('settings-block_closed');
});

const settingsCloseBtns = document.querySelector('#settingsClose');

settingsCloseBtns.addEventListener('click', () => {
  settingsWindow.classList.toggle('settings-block_opened');
  settingsWindow.classList.toggle('settings-block_closed');
  vars.body.removeChild(backdrop);
});

const conformBtn = document.querySelector('#conformBtn');
conformBtn.innerText = 'Conform';

conformBtn.addEventListener('click', () => {
  settingsWindow.classList.toggle('settings-block_opened');
  settingsWindow.classList.toggle('settings-block_closed');
  vars.body.removeChild(backdrop);
  if (markerSoundOn.checked === true) {
    unitClickSound.volume = 0.5;
    unitFlagSound.volume = 0.5;
    winnerSound.volume = 0.5;
    overSound.volume = 0.5;
  } else {
    unitClickSound.volume = 0;
    unitFlagSound.volume = 0;
    winnerSound.volume = 0;
    overSound.volume = 0;
  }
  if (themesLightBtn.classList.contains('themes-block__theme_chosen')) {
    theme = 'light';
    addLightTheme();
  } else if (themesDarkBtn.classList.contains('themes-block__theme_chosen')) {
    theme = 'dark';
    addDarkTheme();
  }
});

markerSoundOn.addEventListener('input', () => {
  markerSoundOff.checked = false;
  markerSoundOn.checked = true;
});

markerSoundOff.addEventListener('input', () => {
  markerSoundOff.checked = true;
  markerSoundOn.checked = false;
});

let theme;

themesLightBtn.addEventListener('click', () => {
  themesDarkBtn.classList.remove('themes-block__theme_chosen');
  themesLightBtn.classList.add('themes-block__theme_chosen');
});

themesDarkBtn.addEventListener('click', () => {
  themesLightBtn.classList.remove('themes-block__theme_chosen');
  themesDarkBtn.classList.add('themes-block__theme_chosen');
});

function addLightTheme() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(el => el.classList.remove('button_dark'));
  const gameBoardUnits = document.querySelectorAll('.game-board__unit');
  gameBoardUnits.forEach(el => el.classList.remove('game-board__unit_dark'));
  const gameBoardUnitsOpend = document.querySelectorAll('.game-board__unit_opened-dark');
  gameBoardUnitsOpend.forEach(el => el.classList.add('game-board__unit_opened'));
  gameBoardUnitsOpend.forEach(el => el.classList.remove('game-board__unit_opened-dark'));
  const gameBoardUnitsFlagged = document.querySelectorAll('.game-board__unit_flagged-dark');
  gameBoardUnitsFlagged.forEach(el => el.classList.add('game-board__unit_flagged'));
  gameBoardUnitsFlagged.forEach(el => el.classList.remove('game-board__unit_flagged-dark'));
  const gameBoardUnitsOver = document.querySelectorAll('.game-board__unit_over-dark');
  gameBoardUnitsOver.forEach(el => el.classList.add('game-board__unit_over'));
  gameBoardUnitsOver.forEach(el => el.classList.remove('game-board__unit_over-dark'));
  vars.body.classList.remove('page_dark');
  const optionsTitleBlock = document.querySelectorAll('.options__title-block');
  optionsTitleBlock.forEach(el => el.classList.remove('options__title-block_dark'));
  const optionsTitle = document.querySelectorAll('.options__title');
  optionsTitle.forEach(el => el.classList.remove('options__title_dark'));
  const optionsInfoBlocksContainer = document.querySelectorAll('.options__info-blocks-container');
  optionsInfoBlocksContainer.forEach(el => el.classList.remove('options__info-blocks-container_dark'));
  const windowBlockInnerContainer = document.querySelectorAll('.window-block__inner-container');
  windowBlockInnerContainer.forEach(el => el.classList.remove('window-block__inner-container_dark'));
  const windowBlockOpened = document.querySelector('#gameModeWindow');
  windowBlockOpened.classList.remove('window-block_opened-dark');
  const settingsWindow = document.querySelector('#settingsWindow');
  settingsWindow.classList.remove('settings-block_opened-dark');
  const settingsBlockInnerContainer = document.querySelectorAll('.settings-block__inner-container');
  settingsBlockInnerContainer.forEach(el => el.classList.remove('settings-block__inner-container_dark'));
  const resultsBlockOpened = document.querySelector('#resultsWindow');
  resultsBlockOpened.classList.remove('results-block_opened-dark');
  const resultsBlockInnerContainer = document.querySelectorAll('.results-block__inner-container');
  resultsBlockInnerContainer.forEach(el => el.classList.remove('results-block__inner-container_dark'));

  const scoreBlockOpened = document.querySelector('#scoreWindow');
  scoreBlockOpened.classList.remove('score-block_opened-dark');
  const scoreBlockInnerContainer = document.querySelectorAll('.score-block__inner-container');
  scoreBlockInnerContainer.forEach(el => el.classList.remove('score-block__inner-container_dark'));
}

function addDarkTheme() {
  const buttons = document.querySelectorAll('.button');
  buttons.forEach(el => el.classList.add('button_dark'));
  const gameBoardUnits = document.querySelectorAll('.game-board__unit');
  gameBoardUnits.forEach(el => el.classList.add('game-board__unit_dark'));
  const gameBoardUnitsOpend = document.querySelectorAll('.game-board__unit_opened');
  gameBoardUnitsOpend.forEach(el => el.classList.add('game-board__unit_opened-dark'));
  gameBoardUnitsOpend.forEach(el => el.classList.remove('game-board__unit_opened'));
  const gameBoardUnitsFlagged = document.querySelectorAll('.game-board__unit_flagged');
  gameBoardUnitsFlagged.forEach(el => el.classList.add('game-board__unit_flagged-dark'));
  gameBoardUnitsFlagged.forEach(el => el.classList.remove('game-board__unit_flagged'));
  const gameBoardUnitsOver = document.querySelectorAll('.game-board__unit_over');
  gameBoardUnitsOver.forEach(el => el.classList.add('game-board__unit_over-dark'));
  gameBoardUnitsOver.forEach(el => el.classList.remove('game-board__unit_over'));
  vars.body.classList.add('page_dark');
  const optionsTitleBlock = document.querySelectorAll('.options__title-block');
  optionsTitleBlock.forEach(el => el.classList.add('options__title-block_dark'));
  const optionsTitle = document.querySelectorAll('.options__title');
  optionsTitle.forEach(el => el.classList.add('options__title_dark'));
  const optionsInfoBlocksContainer = document.querySelectorAll('.options__info-blocks-container');
  optionsInfoBlocksContainer.forEach(el => el.classList.add('options__info-blocks-container_dark'));
  const windowBlockInnerContainer = document.querySelectorAll('.window-block__inner-container');
  windowBlockInnerContainer.forEach(el => el.classList.add('window-block__inner-container_dark'));
  const windowBlockOpened = document.querySelector('#gameModeWindow');
  windowBlockOpened.classList.add('window-block_opened-dark');
  const settingsWindow = document.querySelector('#settingsWindow');
  settingsWindow.classList.add('settings-block_opened-dark');
  const settingsBlockInnerContainer = document.querySelectorAll('.settings-block__inner-container');
  settingsBlockInnerContainer.forEach(el => el.classList.add('settings-block__inner-container_dark'));
  
  const resultsBlockOpened = document.querySelector('#resultsWindow');
  resultsBlockOpened.classList.add('results-block_opened-dark');
  const resultsBlockInnerContainer = document.querySelectorAll('.results-block__inner-container');
  resultsBlockInnerContainer.forEach(el => el.classList.add('results-block__inner-container_dark'));

  const scoreBlockOpened = document.querySelector('#scoreWindow');
  scoreBlockOpened.classList.add('score-block_opened-dark');
  const scoreBlockInnerContainer = document.querySelectorAll('.score-block__inner-container');
  scoreBlockInnerContainer.forEach(el => el.classList.add('score-block__inner-container_dark'));
}

function correctTheme() {
  if (theme === 'light') {
    addLightTheme();
  } else if (theme === 'dark') {
    addDarkTheme();
  }
}
/* ----------result-window------ */
createElement('div', mainPage, 'resultsWindow', 'main-page__results-window', 'options-block', 'results-block_closed');
const resultsWindow = document.querySelector('#resultsWindow');
createElement('div', resultsWindow, 'resultsClose', 'results-block__close-btn');
nameButtons(['+'], '.results-block__close-btn');
createElement('div', resultsWindow, '', 'results-block__inner-container');
const innerResultsContainer = document.querySelector('.results-block__inner-container');

const resultsBlockCloseBtn = document.querySelector('.results-block__close-btn');

resultsBlockCloseBtn.addEventListener('click', () => {
  resultsWindow.classList.toggle('results-block_opened');
  resultsWindow.classList.toggle('results-block_closed');
  vars.body.removeChild(backdrop);
  saveGameBtn.disabled = true;
});
/* -------score-window------- */

createElement('div', mainPage, 'scoreWindow', 'main-page__score-window', 'score-block_closed');
const scoreWindow = document.querySelector('#scoreWindow');
createElement('h2', scoreWindow, '', 'score-block__subtitle');
createElement('div', scoreWindow, 'scoreClose', 'score-block__close-btn');
const scoreSubtitle = document.querySelector('.score-block__subtitle');
scoreSubtitle.innerText = 'Score';
nameButtons(['+'], '.score-block__close-btn');
createElement('div', scoreWindow, '', 'score-block__inner-container');
createElement('div', scoreWindow, '', 'score-block__inner-container');
createElement('div', scoreWindow, '', 'score-block__inner-container');
createElement('div', scoreWindow, '', 'score-block__inner-container');
createElement('div', scoreWindow, '', 'score-block__inner-container');
createElement('div', scoreWindow, '', 'score-block__inner-container');
createElement('div', scoreWindow, '', 'score-block__inner-container');
createElement('div', scoreWindow, '', 'score-block__inner-container');
createElement('div', scoreWindow, '', 'score-block__inner-container');
createElement('div', scoreWindow, '', 'score-block__inner-container');

const scoreBlockCloseBtn = document.querySelector('.score-block__close-btn');

scoreBlockCloseBtn.addEventListener('click', () => {
  scoreWindow.classList.toggle('score-block_opened');
  scoreWindow.classList.toggle('score-block_closed');
  vars.body.removeChild(backdrop);
});

const scoreBtn = document.querySelector('#scoreBtn');
scoreBtn.addEventListener('click', () => {
  vars.body.append(backdrop);
  scoreWindow.classList.toggle('score-block_opened');
  scoreWindow.classList.toggle('score-block_closed');
  createScoreList();
});

let scoreArr = [];
if (localStorage.alyonaScoreArr) {
  scoreArr = JSON.parse(localStorage.alyonaScoreArr);
}

function writeScoreArr() {
  const resultObj = {};
  resultObj.level = optionsTitle.innerText;
  resultObj.mines = +(inputMines.value);
  resultObj.clicks = clicksCounter;
  resultObj.time = timerBlock.innerText;
  if (scoreArr.length === 10) {
    scoreArr.pop();
    scoreArr.reverse();
    scoreArr.push(resultObj);
    scoreArr.reverse();
  } else if (scoreArr.length === 0) {
    scoreArr.push(resultObj);
  } else {
    scoreArr.reverse();
    scoreArr.push(resultObj);
    scoreArr.reverse();
  }
}

function createScoreList() {
  const elements = document.querySelectorAll('.score-block__inner-container');
  for (let i = 0; i < scoreArr.length; i += 1) {
    elements[i].innerText = `Level: ${scoreArr[i].level}\\Mines: ${scoreArr[i].mines}\\Clicks: ${scoreArr[i].clicks}\\Time: ${scoreArr[i].time}s`;
  }
}

if (localStorage.alyonaTheme) {
  theme = localStorage.alyonaTheme;
  if (theme === 'light') {
    themesLightBtn.classList.add('themes-block__theme_chosen');
    themesDarkBtn.classList.remove('themes-block__theme_chosen');
    addLightTheme();
  } else {
    themesLightBtn.classList.remove('themes-block__theme_chosen');
    themesDarkBtn.classList.add('themes-block__theme_chosen');
    addDarkTheme();
  }
} else {
  theme = 'light';
  themesLightBtn.classList.add('themes-block__theme_chosen');
  themesDarkBtn.classList.remove('themes-block__theme_chosen');
}

/* -----btn-start-game---- */
const startNewGameBtn = document.querySelector('#startNewGameBtn');
startNewGameBtn.addEventListener('click', restartGame);

/* ------local-storage----- */
const arrClassLists = [];
const arrInnerText = [];
const saveGameBtn = document.querySelector('#saveGameBtn');
saveGameBtn.addEventListener('click', () => {
  localStorage.arrBoard = JSON.stringify(board);
  for (let i = 0; i < units.length; i += 1) {
    arrClassLists.push(units[i].classList.value);
    arrInnerText.push(units[i].innerText);
  }
  localStorage.arrClassLists = JSON.stringify(arrClassLists);
  localStorage.arrInnerText = JSON.stringify(arrInnerText);
  localStorage.alyonaOptionsTitle = optionsTitle.innerText;
  localStorage.alyonaTimerBlock = timerBlock.innerHTML;
  localStorage.alyonaClicksCounter = clicksCounter;
  localStorage.alyonaSeconds = seconds;
  localStorage.alyonaCounterMines = counterMines.innerText;
  localStorage.alyonaMarkerEasy = markerEasy.checked;
  localStorage.alyonaMarkerMedium = markerMedium.checked;
  localStorage.alyonaMarkerHard = markerHard.checked;
  localStorage.alyonaTheme = theme;
  localStorage.alyonaSoundOn = markerSoundOn.checked;
  localStorage.alyonaSoundOff = markerSoundOff.checked;
  localStorage.alyonaInputMines = inputMines.value;
  vars.body.append(backdrop);
  resultsWindow.classList.toggle('results-block_opened');
  resultsWindow.classList.toggle('results-block_closed');
  innerResultsContainer.innerText = 'Game saved! The next time you open the game, you will see this version. Get ready, the timer is about to start!';
});
