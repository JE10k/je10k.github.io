

let timeDisplay = document.querySelector(".game__timer-display");
let time = 30;
let currentWord = "hedgehog";
let roundNum = 1;



let game = {

    roundsPlayed: 0,
    roundLength: 30,
    rounds: 3,
    wordList: ["hedgehog", "bird", "house", "truck"],

    timer() {

        if (time > 0) {
            time--;
            timeDisplay.innerText = `Round ${game.roundsPlayed} - The word is: "hedgehog" / ${time+1} seconds remaining`;
        } else {
            timeDisplay.innerText = `Time's up!`;
            
        }
     },
    
}


function playRound() {

    while (game.roundsPlayed < game.rounds) {
        console.log("Round played");
        
        setInterval(game.timer, 1000);
        game.roundsPlayed++;
    }
}