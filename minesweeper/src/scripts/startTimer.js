export function startTimer(seconds, minutes) {
    
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }    
    document.getElementById("time").innerHTML = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    setTimeout(startTimer, 1000);
}