import './index.scss';
import { createElement } from './scripts/createElement';
import * as vars from './scripts/vars';
import { createArrBoard } from './scripts/createArrBoard';
import { nameButtons } from './scripts/nameButtons';
import { createGameBoard } from './scripts/createGameBoard';
import { openEmptyUnits } from './scripts/openEmptyUnits';
import { controlWin } from './scripts/controlWin';

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
optionsTitle.innerText = 'Medium 16x16';

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
nameButtons(['Game Mode', 'Settings', 'Score'], '.options__button')

/*----game-board-----*/

createElement('div', mainPage, '', 'main-page__game-board', 'game-board');
const  gameBoard = document.querySelector('.game-board');

let board = createArrBoard(10, 10, 10);
createGameBoard(board, gameBoard);

let clicksCounter = 0;

let units = document.querySelectorAll('.game-board__unit');
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
       //alert('Вы проиграли!');
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
        //alert('Вы выиграли!');
      }
    }
  });
  units[i].addEventListener('contextmenu', function(event) {
    event.preventDefault();
    let row = parseInt(this.dataset.row);
    let col = parseInt(this.dataset.col);
    if (!board[row][col].isOpened) {
      board[row][col].isFlagged = !board[row][col].isFlagged;
      this.classList.toggle('game-board__unit_flagged');
    }
  });
}