const mainMenu = (() => {
    const continueGameButton = document.getElementById('continueGameButton');
    const newGameButton = document.getElementById('newGameButton');

    //Bind Events
    newGameButton.addEventListener('click', startNewGame);

    if (storage.getLocalStorage('savedGameExists')) continueGameButton.classList.add('show');

    function startNewGame() {
        events.publish('removeStorage', ['savedGameExists', 'xTurn', 'playableSection', 'smallCellsClassList', 'largeCellsClassList', 'playerOneScore', 'playerTwoScore']);
        window.location.href = 'html/gameboard.html';
    }

})();