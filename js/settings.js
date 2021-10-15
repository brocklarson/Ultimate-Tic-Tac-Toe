const settingsModule = (() => {
    //Cache DOM
    const playerSelectors = document.querySelectorAll('.player-selection');
    const modeSelectors = document.querySelectorAll('.mode-selection');
    const playerNames = document.querySelectorAll('input');

    //Bind Events
    document.getElementById('backButton').addEventListener('click', updateSettings);
    for (let i = 0; i < 2; i++) {
        playerSelectors[i].addEventListener('click', changePlayerCount);
        modeSelectors[i].addEventListener('click', changeGameMode);
    }

    (function intializeSettings() {
        const playerCount = storage.getLocalStorage('playerCount') || 2;
        const conquestMode = storage.getLocalStorage('conquestMode') || false;

        if (playerCount === 1) changePlayerCount('onePlayer');
        else changePlayerCount('twoPlayer');
        if (conquestMode === true) changeGameMode('conquestMode');
        else changeGameMode('normalMode');
        setPlayersNames();
    })();

    function changePlayerCount(e) {
        let selectedButton;
        if (typeof(e) === 'string') selectedButton = document.getElementById(e);
        else selectedButton = e.target;

        playerSelectors.forEach(button => button.classList.remove('selected'));
        selectedButton.classList.add('selected');
        if (selectedButton.id === 'onePlayer') playerNames[1].disabled = true;
        else playerNames[1].disabled = false;
    }

    function changeGameMode(e) {
        let selectedMode;
        if (typeof(e) === 'string') selectedMode = document.getElementById(e);
        else selectedMode = e.target;

        modeSelectors.forEach(button => button.classList.remove('selected'));
        selectedMode.classList.add('selected');
        if (selectedMode.id === 'conquestMode') conquestMode = true;
        else conquestMode = false;
    }

    function getPlayerCount() {
        if (playerSelectors[0].classList.contains('selected')) return 1;
        else return 2;
    }

    function getConquestMode() {
        if (modeSelectors[1].classList.contains('selected')) return true;
        else return false;
    }

    function getPlayersNames() {
        let playerOne = playerNames[0].value;
        if (playerOne === '') playerOne = 'Player 1';
        let playerTwo = playerNames[1].value;
        if (getPlayerCount() === 1) playerTwo = 'Computer';
        else if (playerTwo === '') playerTwo = 'Player 2';

        return { playerOne, playerTwo }
    }

    function setPlayersNames() {
        const playerOneName = storage.getLocalStorage('playerOneName') || '';
        const playerTwoName = storage.getLocalStorage('playerTwoName') || '';

        if (playerOneName === 'Player 1') playerNames[0].value = '';
        else playerNames[0].value = playerOneName;
        if (playerTwoName === 'Player 2' || playerTwoName === 'Computer') playerNames[1].value = '';
        else playerNames[1].value = playerTwoName;
    }

    function updateSettings() {
        const playerCount = getPlayerCount();
        const conquestMode = getConquestMode();
        const playersNames = getPlayersNames();

        events.publish('variableChange', [
            [playerCount, 'playerCount'],
            [playersNames.playerOne, 'playerOneName'],
            [playersNames.playerTwo, 'playerTwoName'],
            [conquestMode, 'conquestMode']
        ]);

        window.location.href = '../index.html';
    }

})();