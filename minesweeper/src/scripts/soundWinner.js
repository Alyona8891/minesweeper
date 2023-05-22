import myAudioResource from '../sounds/winner.mp3';

export const winnerSound = new Audio();
winnerSound.src = myAudioResource;
winnerSound.volume = 0.5;