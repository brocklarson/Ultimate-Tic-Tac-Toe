const mainMenu = (() => {
    const continueGameButton = document.getElementById('continueGameButton');
    const newGameButton = document.getElementById('newGameButton');
    const normalModeButton = document.getElementById('normalModeButton');
    const conquestModeButton = document.getElementById('conquestModeButton');
    const newGameModal = document.getElementById('newGameModal');
    const newGameModalBackground = document.getElementById('newGameModalBackground');

    //Bind Events
    newGameButton.addEventListener('click', openNewGameModal);
    newGameModalBackground.addEventListener('click', closeNewGameModal);

    if (storage.getLocalStorage('savedGameExists')) continueGameButton.classList.add('show');

    function startNewGame(conquestMode = false) {
        events.publish('variableChange', [
            [conquestMode, 'conquestMode']
        ]);
        events.publish('removeStorage', ['savedGameExists', 'xTurn', 'playableSection', 'smallCellsClassList', 'largeCellsClassList']);
        window.location.href = 'html/gameboard.html';
    }

    function openNewGameModal() {
        newGameModal.classList.add('show');
        newGameModalBackground.classList.add('show');
        normalModeButton.addEventListener('click', () => startNewGame(false));
        conquestModeButton.addEventListener('click', () => startNewGame(true));
    }

    function closeNewGameModal() {
        newGameModal.classList.remove('show');
        newGameModalBackground.classList.remove('show');
        normalModeButton.removeEventListener('click', () => startNewGame(false));
        conquestModeButton.removeEventListener('click', () => startNewGame(true));
    }

})();