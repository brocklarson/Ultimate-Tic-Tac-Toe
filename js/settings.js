const settingsModule = (() => {
    //Cache DOM
    const playerCountArrows = document.querySelectorAll('.player-count-arrows');
    const modeArrows = document.querySelectorAll('.mode-arrows');
    const playerCountText = document.getElementById('playerCount');
    const gameModeText = document.getElementById('modeSelector');
    const playerOneNameText = document.getElementById('playerOneName');
    const playerTwoNameText = document.getElementById('playerTwoName');


    //Bind Events
    for (let i = 0; i < 2; i++) {
        playerCountArrows[i].addEventListener('click', changePlayerCount);
        modeArrows[i].addEventListener('click', changeGameMode);
    }
    document.getElementById('backButton').addEventListener('click', updateSettings);

    (function initializeSettings() {
        if (storage.getLocalStorage('playerCount') === 1) {
            playerCountText.innerText = '1 Player';
            playerTwoNameText.classList.add('transparent');
        } else {
            playerCountText.innerText = '2 Players';
            playerTwoNameText.classList.remove('transparent');
        }

        playerOneNameText.value = storage.getLocalStorage('playerOneName') || '';
        if (playerOneNameText.value === 'Player 1') playerOneNameText.value = '';

        playerTwoNameText.value = storage.getLocalStorage('playerTwoName') || '';
        if (playerTwoNameText.value === 'Player 2' || playerTwoNameText.value === "Robot") playerTwoNameText.value = '';

        if (storage.getLocalStorage('conquestMode') === true) gameModeText.innerText = 'Conquest Mode';
        else gameModeText.innerText = 'Normal Mode';
    })();


    function changePlayerCount() {
        if (playerCountText.innerText === '2 Players') {
            playerCountText.innerText = '1 Player';
            playerTwoNameText.classList.add('transparent');
        } else {
            playerCountText.innerText = '2 Players';
            playerTwoNameText.classList.remove('transparent');
        }
    }

    function changeGameMode() {
        if (gameModeText.innerText === 'Normal Mode') gameModeText.innerText = 'Conquest Mode';
        else gameModeText.innerText = 'Normal Mode';
    }

    function getPlayersName() {
        let playerOneName = playerOneNameText.value;
        let playerTwoName = playerTwoNameText.value;

        if (playerOneName === '') playerOneName = "Player 1";
        if (playerCountText.innerText === '1 Player') playerTwoName = "Robot";
        else if (playerTwoName === '') playerTwoName = "Player 2";

        return {
            playerOne: playerOneName,
            playerTwo: playerTwoName
        }
    }

    function getConquestMode() {
        return (gameModeText.innerText === 'Conquest Mode') ? true : false;
    }

    function updateSettings() {
        const playersName = getPlayersName();
        const conquestMode = getConquestMode();
        const playerCount = (playerCountText.innerText === "1 Player") ? 1 : 2;

        events.publish('variableChange', [
            [playerCount, 'playerCount'],
            [playersName.playerOne, 'playerOneName'],
            [playersName.playerTwo, 'playerTwoName'],
            [conquestMode, 'conquestMode']
        ]);

        window.location.href = '../index.html';
    }

})();