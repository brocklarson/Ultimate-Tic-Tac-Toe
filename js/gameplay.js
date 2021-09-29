//SAVE GAME MODULE
const saveGameModule = (() => {
    events.subscribe('saveGame', saveGame)

    function saveGame(gameState) {
        events.publish('variableChange', [
            [true, 'savedGameExists'],
            [gameState.conquestMode, 'conquestMode'],
            [gameState.xTurn, 'xTurn'],
            [gameState.playedCellIndex, 'playableSection'],
            [gameState.smallCellsClassList, 'smallCellsClassList'],
            [gameState.largeCellsClassList, 'largeCellsClassList']
        ]);
    }

    function loadGame() {
        return {
            largeCellsClassList: storage.getLocalStorage('largeCellsClassList'),
            smallCellsClassList: storage.getLocalStorage('smallCellsClassList'),
            xTurn: storage.getLocalStorage('xTurn'),
            playedCellIndex: storage.getLocalStorage('playableSection'),
            conquestMode: storage.getLocalStorage('conquestMode')
        }
    }

    return { loadGame }

})();

//GAME OVER MODULE
const gameEndModule = (() => {
    //Cache DOM
    const winningMessage = document.getElementById('winningMessage');
    const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
    const restartButton = document.getElementById('restartButton');

    //Bind Events
    events.subscribe('endGame', endGame);

    function endGame(data) {
        const draw = data[0];
        const currentPlayer = data[1];

        if (draw) winningMessageTextElement.innerText = 'Draw';
        else winningMessageTextElement.innerText = `${currentPlayer} Wins!`;

        winningMessage.classList.add('show');
        events.publish('removeStorage', ['savedGameExists', 'xTurn', 'playableSection', 'smallCellsClassList', 'largeCellsClassList']);
        restartButton.addEventListener('click', restartGame);
    }

    function restartGame() {
        winningMessage.classList.remove('show');
        events.publish('restartGame', '');
    }

})();

//GAME INDICATORS MODULE
const gameIndicatorsModule = (() => {
    //Cache DOM
    const turnIndicator = document.getElementById('turnIndicator');
    const playableSectionIndicator = document.getElementById('playableSectionIndicatorText');
    const conquestMode = storage.getLocalStorage('conquestMode') || false;

    //Bind Events
    events.subscribe('playableSection', setplayableSectionIndicator);
    events.subscribe('turnIndicator', setPlayersTurn);


    (function setConquestMode() {
        if (conquestMode) document.getElementById('conquestModeIndicator').classList.add('show');
    })();

    function getConquestMode() {
        return conquestMode;
    }

    function setplayableSectionIndicator(data) {
        const playedCellIndex = data[0];
        const sentToFullSection = data[1];

        if (sentToFullSection) playableSectionIndicator.innerText = 'Play\nAnywhere';
        else if (playedCellIndex === 0) playableSectionIndicator.innerText = 'Top\nLeft';
        else if (playedCellIndex === 1) playableSectionIndicator.innerText = 'Top\nMiddle';
        else if (playedCellIndex === 2) playableSectionIndicator.innerText = 'Top\nRight';
        else if (playedCellIndex === 3) playableSectionIndicator.innerText = 'Middle\nLeft';
        else if (playedCellIndex === 4) playableSectionIndicator.innerText = 'Center';
        else if (playedCellIndex === 5) playableSectionIndicator.innerText = 'Middle\nRight';
        else if (playedCellIndex === 6) playableSectionIndicator.innerText = 'Bottom\nLeft';
        else if (playedCellIndex === 7) playableSectionIndicator.innerText = 'Bottom\nMiddle';
        else if (playedCellIndex === 8) playableSectionIndicator.innerText = 'Bottom\nRight';
        else playableSectionIndicator.innerText = 'Play\nAnywhere';
    }

    function setPlayersTurn(xTurn) {
        playersTurn = (xTurn === true) ? 'X' : 'O';
        turnIndicator.classList.remove('X', 'O');
        turnIndicator.classList.add(playersTurn);
    }

    return { getConquestMode }
})();

//GAMEPLAY MODULE
const gameplayModule = (() => {
    const WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let xTurn;
    let playedCellIndex;

    (function createBoard() {
        const gameBoard = document.getElementById('boardWhole');
        for (i = 0; i < 9; i++) {
            let boardSegment = document.createElement('div');
            gameBoard.appendChild(boardSegment).className = 'board-segment';
            for (j = 0; j < 9; j++) {
                let cell = document.createElement('div');
                boardSegment.appendChild(cell).className = 'cell';
            }
        }
    })();

    //Cache DOM
    const largeCells = document.querySelectorAll('.board-segment');
    const smallCells = document.querySelectorAll('.cell');

    //Bind Events
    events.subscribe('restartGame', initializeGame);

    function initializeGame() {
        const savedGameExists = storage.getLocalStorage('savedGameExists');
        if (savedGameExists) {
            const loadedGame = saveGameModule.loadGame();
            setBoard(loadedGame);
        } else setBoard('newGame');
    }
    initializeGame();

    function setBoard(loadedGame) {
        let sentToFullSection = false;
        if (loadedGame === 'newGame') {
            xTurn = true;
            largeCells.forEach(section => {
                section.classList.remove('X', 'O', 'X-win', 'O-win');
                section.classList.add('X'); //Allows hover states
            });
            smallCells.forEach(cell => {
                cell.classList.remove('X', 'O');
                cell.removeEventListener('click', handleClick);
                cell.addEventListener('click', handleClick);
            });
        } else {
            xTurn = loadedGame.xTurn;
            playedCellIndex = loadedGame.playedCellIndex;
            conquestMode = loadedGame.conquestMode;
            smallCellsClassList = loadedGame.smallCellsClassList;
            largeCellsClassList = loadedGame.largeCellsClassList;

            for (i = 0; i < smallCells.length; i++) {
                smallCells[i].classList.add(Object.values(smallCellsClassList[i])[1]); //better way to do this? What if class isn't always in [1] position?
            }
            for (i = 0; i < largeCells.length; i++) {
                largeCells[i].classList.add(Object.values(largeCellsClassList[i])[1]); //same as above. Also doesn't it get saved as array? So why object.values?
            }

            largeCells.forEach(section => {
                section.classList.remove('undefined');
            })

            smallCells.forEach(cell => {
                cell.classList.remove('undefined');
                cell.removeEventListener('click', handleClick);
                cell.addEventListener('click', handleClick);
            })


            if (isSectionFull(playedCellIndex)) {
                setPlayableSection(playedCellIndex, true);
                sentToFullSection = true;
            } else {
                setPlayableSection(playedCellIndex, false);
                sentToFullSection = false;
            }

            if (conquestMode) conquestModeIndicator.classList.add('show');
        }
        events.publish('turnIndicator', xTurn);
        events.publish('playableSection', [playedCellIndex, sentToFullSection]);
    }

    function handleClick(e) {
        const cell = e.target;
        const currentPlayer = xTurn ? 'X' : 'O';
        const currentPlayerWin = xTurn ? 'X-win' : 'O-win';
        const largeCellIndex = Array.prototype.indexOf.call(cell.parentNode.parentNode.children, cell.parentNode);
        playedCellIndex = Array.prototype.indexOf.call(cell.parentNode.children, cell);

        if (!validLocation(cell, currentPlayer, largeCellIndex)) return;
        else placeMarker(cell, currentPlayer);

        if (checkSectionWin(cell, currentPlayer, playedCellIndex)) placeSectionWinMarker(cell, currentPlayerWin);
        if (checkGameWin(currentPlayerWin)) { events.publish('endGame', [false, currentPlayer]); return; }
        if (checkDraw()) { events.publish('endGame', [true, currentPlayer]); return; }

        switchTurn();

        if (isSectionFull(playedCellIndex)) {
            setPlayableSection(playedCellIndex, true);
            events.publish('playableSection', [playedCellIndex, true]);
        } else {
            setPlayableSection(playedCellIndex, false);
            events.publish('playableSection', [playedCellIndex, false]);
        }
        events.publish('saveGame', getGameState());
    }

    function validLocation(cell, currentPlayer, largeCellIndex) {
        if (cell.classList.contains('X') || cell.classList.contains('O')) return false;
        if (largeCells[largeCellIndex].classList.contains(currentPlayer) === false) return false;
        return true;
    }

    function placeMarker(cell, currentPlayer) {
        cell.classList.add(currentPlayer);
    }

    function checkSectionWin(cell, currentPlayer, playedCellIndex) {
        const conquestMode = gameIndicatorsModule.getConquestMode();
        if (!conquestMode) {
            if (cell.parentNode.classList.contains('X-win') || cell.parentNode.classList.contains('O-win')) {
                return false;
            }
        }

        //Checks if the winning combination is in the WINNING_COMBINATIONS array 
        //AND includes the index of the played cell
        return WINNING_COMBINATIONS.find(combination => {
            return combination.every(index => {
                return cell.parentNode.children[index].classList.contains(currentPlayer);
            }) && ([...combination].includes(playedCellIndex));
        });
    }

    function placeSectionWinMarker(cell, currentPlayerWin) {
        cell.parentNode.classList.remove('X-win', 'O-win');
        cell.parentNode.classList.add(currentPlayerWin);
    }

    function checkGameWin(currentPlayerWin) {
        //Checks if the winning combination is in the WINNING_COMBINATIONS array
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return largeCells[index].classList.contains(currentPlayerWin);
            });
        });
    }

    function checkDraw() {
        return [...smallCells].every(cell => {
            return cell.classList.contains('X') || cell.classList.contains('O');
        });
    }

    function switchTurn() {
        xTurn = !xTurn;
        events.publish('turnIndicator', xTurn);
    }

    function isSectionFull(playedCellIndex) {
        if (isNaN(playedCellIndex)) return true;
        return Array.from(largeCells[playedCellIndex].children).every(child => {
            return child.classList.contains('X') || child.classList.contains('O');
        });
    }

    function setPlayableSection(playedCellIndex, sentToFullSection) {
        const currentPlayer = xTurn ? 'X' : 'O';

        largeCells.forEach(section => section.classList.remove('X', 'O'));
        if (sentToFullSection) largeCells.forEach(section => section.classList.add(currentPlayer));
        else largeCells[playedCellIndex].classList.add(currentPlayer);
    }

    function getGameState() {
        let smallCellsClassList = [];
        for (i = 0; i < 81; i++) {
            smallCellsClassList[i] = smallCells[i].classList;
        }
        let largeCellsClassList = [];
        for (i = 0; i < 9; i++) {
            largeCellsClassList[i] = largeCells[i].classList;
        }
        return {
            xTurn,
            playedCellIndex,
            conquestMode: gameIndicatorsModule.getConquestMode(),
            smallCellsClassList,
            largeCellsClassList
        };
    }

})();