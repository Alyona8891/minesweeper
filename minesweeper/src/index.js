import './index.scss';
import { createElement } from './scripts/createElement';
import * as vars from './scripts/vars';

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

/*---------*/
