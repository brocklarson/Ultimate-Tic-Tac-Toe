//PLAYER FACTORY   
const Player = (name, score = 0) => {
    const getName = () => name;
    const getScore = () => score;
    const win = () => score++;

    return { getName, getScore, win }
};
const playerOne = Player(storage.getLocalStorage('playerOneName') || 'Player 1', storage.getLocalStorage('playerOneScore'));
const playerTwo = Player(storage.getLocalStorage('playerTwoName') || 'Player 2', storage.getLocalStorage('playerTwoScore'));

//SAVE GAME MODULE
const saveGameModule = (() => {
    events.subscribe('saveGame', _saveGame)

    function _saveGame(gameState) {
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
        const isDraw = data[0];
        const currentPlayer = data[1];

        if (isDraw) winningMessageTextElement.innerText = 'Draw';
        else {
            winningMessageTextElement.innerText = `${currentPlayer} Wins!`;
            if (currentPlayer === 'X') playerOne.win();
            else playerTwo.win();
            gameHUDModule.setScores();
            events.publish('variableChange', [
                [playerOne.getScore(), 'playerOneScore'],
                [playerTwo.getScore(), 'playerTwoScore'],
            ]);
        }
        winningMessage.classList.add('show');
        events.publish('removeStorage', ['savedGameExists', 'xTurn', 'playableSection', 'smallCellsClassList', 'largeCellsClassList']);
        restartButton.addEventListener('click', restartGame);
    }

    function restartGame() {
        winningMessage.classList.remove('show');
        events.publish('restartGame', '');
    }

})();

//GAME HUD MODULE
const gameHUDModule = (() => {
    //Cache DOM
    const turnIndicator = document.getElementById('turnIndicator');
    const playableSectionIndicator = document.getElementById('playableSectionIndicatorText');
    const conquestMode = storage.getLocalStorage('conquestMode') || false;
    const playerOneName = document.getElementById('playerOneName');
    const playerTwoName = document.getElementById('playerTwoName');

    //Bind Events
    events.subscribe('playableSection', _setplayableSectionIndicator);
    events.subscribe('turnIndicator', _setPlayersTurn);

    function _initialize() {
        _setConquestMode();
        _setPlayerNames();
        _setPlayersTurn(storage.getLocalStorage('xTurn'));
        setScores();
    }
    _initialize();

    function _setConquestMode() {
        if (conquestMode) document.getElementById('conquestModeIndicator').classList.add('show');
    }

    function _setPlayerNames() {
        playerOneName.innerText = playerOne.getName();
        playerTwoName.innerText = playerTwo.getName();
    }

    function setScores() {
        document.getElementById('playerOneScore').innerText = playerOne.getScore();
        document.getElementById('playerTwoScore').innerText = playerTwo.getScore();
    }

    function getConquestMode() {
        return conquestMode;
    }

    function _setplayableSectionIndicator(data) {
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

    function _setPlayersTurn(xTurn) {
        playersTurn = (xTurn === true) ? 'X' : 'O';
        turnIndicator.classList.remove('X', 'O');
        turnIndicator.classList.add(playersTurn);

        if (xTurn) {
            playerTwoName.classList.remove('turn');
            playerOneName.classList.add('turn');
        } else {
            playerOneName.classList.remove('turn');
            playerTwoName.classList.add('turn');
        }
    }

    return { getConquestMode, setScores }
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
        const savedGameExists = storage.getLocalStorage('savedGameExists') || false;
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
                section.classList.add('X'); //Allows hover over playable cells
            });
            smallCells.forEach(cell => {
                cell.classList.remove('X', 'O');
                cell.removeEventListener('click', handleClick);
                cell.addEventListener('click', handleClick);
            });
            sentToFullSection = true;
        } else {
            xTurn = loadedGame.xTurn;
            playedCellIndex = loadedGame.playedCellIndex;
            conquestMode = loadedGame.conquestMode;
            smallCellsClassList = loadedGame.smallCellsClassList;
            largeCellsClassList = loadedGame.largeCellsClassList;

            for (i = 0; i < smallCells.length; i++) {
                smallCells[i].classList.add(Object.values(smallCellsClassList[i])[1]);
            }
            for (i = 0; i < largeCells.length; i++) {
                largeCells[i].classList.add(Object.values(largeCellsClassList[i])[1]);
                console.log(Object.values(largeCellsClassList[i])[1]);
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
        const playerCount = storage.getLocalStorage('playerCount') || 2;
        const cell = e.target;
        const largeCellIndex = Array.prototype.indexOf.call(cell.parentNode.parentNode.children, cell.parentNode);

        if (playerCount === 2 || xTurn) doMove(cell, largeCellIndex);

        if (playerCount === 1 && !xTurn) {
            setTimeout(function() {
                checkCompMove();
            }, 300);
        }
    }

    function doMove(cell, largeCellIndex) {
        const currentPlayer = xTurn ? 'X' : 'O';
        const currentPlayerWin = xTurn ? 'X-win' : 'O-win';
        playedCellIndex = Array.prototype.indexOf.call(cell.parentNode.children, cell);

        if (!validLocation(cell, currentPlayer, largeCellIndex)) return;
        else placeMarker(cell, currentPlayer);

        if (checkSectionWin(cell, currentPlayer, playedCellIndex)) placeSectionWinMarker(cell, currentPlayerWin);
        if (checkGameWin(currentPlayerWin)) {
            events.publish('endGame', [false, currentPlayer]);
            return;
        }
        if (checkDraw()) {
            events.publish('endGame', [true, currentPlayer]);
            return;
        }

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

    function checkCompMove() {
        const compMove = computerMove.getCompMove(playedCellIndex);
        playedCellIndex = compMove.playedCellIndex;
        doMove(compMove.cell, compMove.largeCellIndex);
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
        const conquestMode = gameHUDModule.getConquestMode();
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
            conquestMode: gameHUDModule.getConquestMode(),
            smallCellsClassList,
            largeCellsClassList
        };
    }
})();

const computerMove = (() => {
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
    const conquestMode = storage.getLocalStorage('conquestMode') || false;
    //Cache DOM
    const largeCells = document.querySelectorAll('.board-segment');
    const smallCells = document.querySelectorAll('.cell');

    function getCompMove(playedCellIndex) {
        let cellScore = [];
        let validCells = _getValidCells(playedCellIndex);
        if (validCells.length === 0) validCells = _getAnyCell();

        let option = 0;
        validCells.forEach(cell => {
            let cellIndex = Array.prototype.indexOf.call(cell.parentNode.children, cell);
            cellScore.push({
                option: option,
                score: _getCellScore(cellIndex, playedCellIndex)
            });
            option++;
        });

        const newCell = _chooseBestScore(validCells, cellScore);
        const newLargeCellIndex = Array.prototype.indexOf.call(newCell.parentNode.parentNode.children, newCell.parentNode);
        const newPlayedCellIndex = Array.prototype.indexOf.call(newCell.parentNode.children, newCell);
        return { cell: newCell, largeCellIndex: newLargeCellIndex, playedCellIndex: newPlayedCellIndex }
    }

    function _getValidCells(playedCellIndex) {
        //returns an array of numbers of empty cells in given gameboard section
        return Array.from(largeCells[playedCellIndex].children)
            .map(cell => {
                if (!cell.classList.contains('X') && !cell.classList.contains('O')) {
                    return cell;
                }
            })
            .filter(index => {
                return index !== undefined;
            });
    }

    function _getAnyCell() {
        return Array.from(smallCells)
            .map(cell => {
                if (!cell.classList.contains('X') && !cell.classList.contains('O')) {
                    return cell;
                };
            })
            .filter(index => {
                return index !== undefined;
            });
    }

    function _getCellScore(cellIndex, playedCellIndex) {
        let score = 0;
        if (conquestMode || !_sectionWon(cellIndex, ['X-win', 'O-win'])) {
            score -= _twoInARow(cellIndex, 'X'); //Don't send to section where X can win
            score -= _twoInARow(cellIndex, 'O'); //Don't send to section where X could block O win
        }
        if (!conquestMode) {
            if (_sectionWon(cellIndex, ['X-win', 'O-win'])) score++; //Send to already won sections
        }
        if (conquestMode || !_sectionWon(playedCellIndex, ['X-win', 'O-win'])) {
            if (_winCurrentSection(playedCellIndex, cellIndex, 'O')) score += 2; //Play in cell if it could win section
            if (_winCurrentSection(playedCellIndex, cellIndex, 'X')) score++; //Play in cell if it blocks opponent from winning section
        }
        if (_fullSection(cellIndex)) score -= 2; // Don't send to already full section

        if (_winGame(cellIndex, 'X-win')) { //Don't send to section where player can win
            score -= 2;
            if (_twoInARow(cellIndex, 'X') > 0) score -= 100;
        }
        if (_winGame(cellIndex, 'O-win')) { //Don't send to section where player can block comp win
            score -= 2;
            if (_twoInARow(cellIndex, 'O') > 0) score -= 100;
        }
        if (_winGame(playedCellIndex, 'O-win')) {
            if (_winCurrentSection(playedCellIndex, cellIndex, 'O')) score += 9999; //Absolutely win game if possible
            if (_winCurrentSection(playedCellIndex, cellIndex, 'X')) score += 100; //Block opponent win game option
        }
        return score;
    }

    function _twoInARow(cellIndex, marker) {
        let counter = 0;
        WINNING_COMBINATIONS.forEach(combination => {
            //return array of how many in each combination are X's (or O's) and Empty
            const cellChecker = combination.reduce((total, index) => {
                if (largeCells[cellIndex].children[index].classList.contains(marker)) total[0]++;
                if (!largeCells[cellIndex].children[index].classList.contains('X') &&
                    !largeCells[cellIndex].children[index].classList.contains('O')) total[1]++;
                return total;
            }, [0, 0]);
            if (cellChecker[0] === 2 && cellChecker[1] === 1) counter++;
        });
        return counter;
    }

    function _winCurrentSection(playedCellIndex, cellIndex, compMarker) {
        let counter = 0;
        WINNING_COMBINATIONS.forEach(combination => {
            //return array of how many in each combination are O's and Empty
            if (combination.includes(cellIndex)) {
                const cellChecker = combination.reduce((total, index) => {
                    if (largeCells[playedCellIndex].children[index].classList.contains(compMarker)) total[0]++;
                    if (!largeCells[playedCellIndex].children[index].classList.contains('X') &&
                        !largeCells[playedCellIndex].children[index].classList.contains('O')) total[1]++;
                    return total;
                }, [0, 0]);
                if (cellChecker[0] === 2 && cellChecker[1] === 1) counter++;
            }
        });
        if (counter > 0) return true;
    }

    function _fullSection(cellIndex) {
        if (isNaN(cellIndex)) return true;
        return Array.from(largeCells[cellIndex].children).every(child => {
            return child.classList.contains('X') || child.classList.contains('O');
        });
    }

    function _sectionWon(index, classes) {
        return classes.some(element => largeCells[index].classList.contains(element));
    }

    function _winGame(section, marker) {
        let counter = 0;
        WINNING_COMBINATIONS.forEach(combination => {
            //return array of how many in each combination are O's and Empty
            if (combination.includes(section)) {
                const cellChecker = combination.reduce((total, index) => {
                    if (largeCells[index].classList.contains(marker)) total[0]++;
                    if (!largeCells[index].classList.contains('X-win') &&
                        !largeCells[index].classList.contains('O-win')) total[1]++;
                    return total;
                }, [0, 0]);
                if (cellChecker[0] === 2 && cellChecker[1] === 1) counter++;
            }
        });
        if (counter > 0 && !_sectionWon(section, ['X-win', 'O-win'])) return true;
    }

    function _chooseBestScore(validCells, cellScore) {
        cellScore.sort((a, b) => {
            return a.score > b.score ? -1 : 1;
        });
        let sameScores = cellScore.filter(cell => cell.score === cellScore[0].score).length;
        if (sameScores !== 1) return _resolveTies(sameScores, validCells, cellScore);
        else return validCells[cellScore[0].option];
    }

    function _resolveTies(sameScores, validCells, cellScore) {
        const rand = Math.floor(Math.random() * sameScores);
        return validCells[cellScore[rand].option];
    }

    return { getCompMove }
})();