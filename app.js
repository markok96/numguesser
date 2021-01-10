let min = 1,
max = 10,
winningNum = getRandomNum(min, max);
guessesLeft = 3;

var game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guess = document.querySelector('#guess-input'),
    submit = document.querySelector('#guess-btn'),
    message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

submit.addEventListener('click', function(){
    let newGuess = parseInt(guess.value);

    if (isNaN(newGuess) || newGuess < min || newGuess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    } 
    else if(newGuess === winningNum) {
        gameOver(true, `${winningNum} is correct!`);
    } else {
        guessesLeft -= 1;
        if(guessesLeft === 0){
            gameOver(false, `GAME OVER! The correct number was ${winningNum}`);
        }
        else {
            guess.style.borderColor = 'red';
            guess.value = '';
            setMessage(`${newGuess} isn't correct, you have ${guessesLeft} guesses left`, 'red');
        }
    }
});

function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    guess.disabled = true;
    guess.style.borderColor = color;
    setMessage(msg, color);

    submit.value = 'Play again';
    submit.classList.remove('btn');
    submit.classList.add('play-again');
}

function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max-min+1)+min);
}