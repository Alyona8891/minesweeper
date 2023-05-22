import myAudioResource from '../sounds/game_over.mp3';

export const overSound = new Audio();
overSound.src = myAudioResource;
overSound.volume = 0.5;