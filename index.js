//Check if there's a saved game to display the "continue game" button
// When clicking "New Game", add pop-up for normal play or conquest play
const savedGameExist = (localStorage.savedGameExist === 'true');
const continueGameButton = document.getElementById('continueGameButton');
const newGameButton = document.getElementById('newGameButton');
const normalModeButton = document.getElementById('normalModeButton');
const conquestModeButton = document.getElementById('conquestModeButton');
const newGameModal = document.getElementById('newGameModal');
const newGameModalBackground = document.getElementById('newGameModalBackground');
let conquestMode;

initializeMenu();
newGameButton.addEventListener('click', openNewGameModal);
newGameModalBackground.addEventListener('click', closeNewGameModal);

function initializeMenu() {
    continueGameButton.classList.remove('show');
    if(savedGameExist) continueGameButton.classList.add('show');
}

function openNewGameModal() {
    newGameModal.classList.add('show');
    newGameModalBackground.classList.add('show');
    normalModeButton.addEventListener('click', playNormalMode);
    conquestModeButton.addEventListener('click', playConquestMode);
}

function playNormalMode() {
    conquestMode = false;
    localStorage.conquestMode = conquestMode;
    localStorage.setItem('savedGameExist', false);
    window.location.href = 'gameboard.html';
}

function playConquestMode() {
    conquestMode = true;
    localStorage.conquestMode = conquestMode;
    localStorage.setItem('savedGameExist', false);
    window.location.href = 'gameboard.html';
}

function closeNewGameModal() {
    newGameModal.classList.remove('show');
    newGameModalBackground.classList.remove('show');
}

