const leftArrow = document.getElementById('howToPlayLeftArrow');
const rightArrow = document.getElementById('howToPlayRightArrow');
const howToPlayText = document.getElementById('howToPlayText');
const cellElements = document.querySelectorAll('.how-to-play-cell');
const boardSection = document.querySelectorAll('.how-to-play-board-segment');
const gameBoard = document.getElementById('howToPlayBoardWhole');
const gameIndicators = document.getElementById('howToPlayGameIndicators');
const turnIndicator = document.getElementById('howToPlayTurnIndicator');
const sectionIndicator = document.getElementById('howToPlaySectionIndicator');
const conquestIndicator = document.getElementById('howToPlayConquestModeIndicator');
let instructionCounter = 0;

instructionZero();
leftArrow.addEventListener('click', clickLeftArrow);
rightArrow.addEventListener('click', clickRightArrow);

function clickLeftArrow() {
    if(instructionCounter > 0) instructionCounter -= 1;
    functionCaller(instructionCounter);
}

function clickRightArrow() {
    if(instructionCounter < 8) instructionCounter += 1;
    functionCaller(instructionCounter)
}

function functionCaller(instructionCounter) {
    switch(instructionCounter){
        case 0: 
            instructionZero();
            break;
        case 1: 
            instructionOne();
            break;
        case 2: 
            instructionTwo();
            break;
        case 3: 
            instructionThree();
            break;
        case 4: 
            instructionFour();
            break;
        case 5: 
            instructionFive();
            break;
        case 6: 
            instructionSix();
            break;
        case 7: 
            instructionSeven();
            break;
        case 8:
            instructionEight();
            break;
        default:
            instructionZero();
            break;
    }
}

function instructionZero() {
    leftArrow.firstChild.classList.add('hide');
    gameIndicators.classList.add('hide');
    howToPlayText.innerHTML = "The game is relatively simple, it's just like Tic-Tac-Toe, except you're playing 9 games... all at once...";
}

function instructionOne(){
    leftArrow.firstChild.classList.remove('hide');
    boardSection.forEach(section => {
        section.classList.remove('X-win', 'O-win');
    })
    cellElements.forEach(cell => {
        cell.classList.remove('X', 'O');
    })
    howToPlayText.innerHTML = "Player 1 may start anywhere in any of the boards. But note that where player 1 goes controls where the next player must play.";
}

function instructionTwo() {
    boardSection.forEach(section => {
        section.classList.remove('X-win', 'O-win');
    })
    cellElements.forEach(cell => {
        cell.classList.remove('X', 'O');
    })
    howToPlayText.innerHTML = "For example, if player 1 (X) plays in the top left box of one of the boards, then player 2 (O) must play in the top left board.";
    howToPlayText.innerHTML += "<br><br>Then, if player 2 (O) plays in the center box of the top left board, player 1 (X) must play their next move in the center board.";
    cellElements[63].classList.add('X');
    cellElements[4].classList.add('O');
}

function instructionThree() {
    boardSection.forEach(section => {
        section.classList.remove('X-win', 'O-win');
    })
    cellElements.forEach(cell => {
        cell.classList.remove('X', 'O');
    })
    howToPlayText.innerHTML = "Once a player gets a tic-tac-toe in any of the boards, a large 'X' or 'O' will be overlaid to indicate that they won that board.";
    howToPlayText.innerHTML += "<br><br>After a board has been won, the board may still be played in by either player.";
    cellElements[63].classList.add('X');
    cellElements[4].classList.add('O');
    cellElements[40].classList.add('X');
    cellElements[38].classList.add('O');
    cellElements[23].classList.add('X');
    cellElements[25].classList.add('O');
    cellElements[67].classList.add('X');
    cellElements[39].classList.add('O');
    cellElements[34].classList.add('X');
    cellElements[56].classList.add('O');
    cellElements[50].classList.add('X');
    cellElements[80].classList.add('O');
    cellElements[79].classList.add('X');
    cellElements[64].classList.add('O');
    cellElements[10].classList.add('X');
    cellElements[16].classList.add('O');
    cellElements[71].classList.add('X');
    boardSection[7].classList.add('X-win')
}

function instructionFour() {
    boardSection.forEach(section => {
        section.classList.remove('X-win', 'O-win');
    })
    cellElements.forEach(cell => {
        cell.classList.remove('X', 'O');
    })
    howToPlayText.innerHTML = "Once a board has been won, the outcome cannot be changed even if the other player later gets a tic-tac-toe in the same board"; 
    howToPlayText.innerHTML += "<br><br>However, in an alternative game mode called 'Conquest Mode', getting a tic-tac-toe in an already won board will cause the board to be overtaken.";
    cellElements[63].classList.add('X');
    cellElements[4].classList.add('O');
    cellElements[40].classList.add('X');
    cellElements[38].classList.add('O');
    cellElements[23].classList.add('X');
    cellElements[25].classList.add('O');
    cellElements[67].classList.add('X');
    cellElements[39].classList.add('O');
    cellElements[34].classList.add('X');
    cellElements[56].classList.add('O');
    cellElements[50].classList.add('X');
    cellElements[80].classList.add('O');
    cellElements[79].classList.add('X');
    cellElements[64].classList.add('O');
    cellElements[10].classList.add('X');
    cellElements[16].classList.add('O');
    cellElements[71].classList.add('X');
    boardSection[7].classList.add('X-win');
}

function instructionFive() {
    boardSection.forEach(section => {
        section.classList.remove('X-win', 'O-win');
    })
    cellElements.forEach(cell => {
        cell.classList.remove('X', 'O');
    })
    howToPlayText.innerHTML = "Get three boards in a row to win!";
    gameBoard.classList.remove('hide');
    gameIndicators.classList.add('hide');
    turnIndicator.classList.remove('circled');
    cellElements[63].classList.add('X');cellElements[4].classList.add('O');
    cellElements[40].classList.add('X');
    cellElements[38].classList.add('O');
    cellElements[23].classList.add('X');
    cellElements[25].classList.add('O');
    cellElements[67].classList.add('X');
    cellElements[39].classList.add('O');
    cellElements[34].classList.add('X');
    cellElements[56].classList.add('O');
    cellElements[50].classList.add('X');
    cellElements[80].classList.add('O');
    cellElements[79].classList.add('X');
    cellElements[64].classList.add('O');
    cellElements[10].classList.add('X');
    cellElements[16].classList.add('O');
    cellElements[71].classList.add('X');
    boardSection[7].classList.add('X-win');
    cellElements[76].classList.add('O');
    cellElements[36].classList.add('X');
    cellElements[7].classList.add('O');
    cellElements[70].classList.add('X');
    cellElements[69].classList.add('O');
    cellElements[61].classList.add('X');
    cellElements[58].classList.add('O');
    cellElements[44].classList.add('X');
    boardSection[4].classList.add('X-win');
    cellElements[72].classList.add('O');
    boardSection[8].classList.add('O-win');
    cellElements[0].classList.add('X');
    cellElements[1].classList.add('O');
    boardSection[0].classList.add('O-win');
    cellElements[11].classList.add('X');
    cellElements[19].classList.add('O');
    cellElements[9].classList.add('X');
    boardSection[1].classList.add('X-win');
}

function instructionSix() {
    boardSection.forEach(section => {
        section.classList.remove('X-win', 'O-win');
    })
    cellElements.forEach(cell => {
        cell.classList.remove('X', 'O');
    })
    gameBoard.classList.add('hide');
    gameIndicators.classList.remove('hide');
    turnIndicator.classList.add('circled');
    sectionIndicator.classList.remove('circled');
    howToPlayText.innerHTML = "This indicator on the top left of the board indicates which player's turn it is";
}

function instructionSeven() {
    rightArrow.firstChild.classList.remove('hide');
    turnIndicator.classList.remove('circled');
    conquestIndicator.classList.remove('circled');
    sectionIndicator.classList.add('circled');
    howToPlayText.innerHTML = "This indicator on the top right of the board indicates which board to play in";
}

function instructionEight() {
    rightArrow.firstChild.classList.add('hide');
    sectionIndicator.classList.remove('circled');
    conquestIndicator.classList.add('circled');
    howToPlayText.innerHTML = "This indicator in the middle indicates that you are playing in 'Conquest Mode'";
}
