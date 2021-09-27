//SAVE GAME MODULE
const saveGameModule = (() => {
    //utilize save.js now
    function saveGame() {
        const cellElements = document.querySelectorAll('.cell');
        const boardSection = document.querySelectorAll('.board-segment');
        const saveGameVar = gameboardModule.getSaveVar();
        document.body.classList.add('waiting');


        localStorage.setItem('savedGameExist', true);
        localStorage.setItem('conquestMode', saveGameVar.conquestMode);

        let cellsClassList = [];
        for (i = 0; i < 81; i++) {
            cellsClassList[i] = cellElements[i].classList;
        }
        let boardSectionsClassList = [];
        for (i = 0; i < 9; i++) {
            boardSectionsClassList[i] = boardSection[i].classList;
        }

        localStorage.setItem('cellsClassList', JSON.stringify(cellsClassList));
        localStorage.setItem('boardSectionsClassList', JSON.stringify(boardSectionsClassList));
        localStorage.setItem('xTurn', saveGameVar.xTurn);
        localStorage.setItem('playableSection', saveGameVar.playedCellIndex);

        saveButton.innerText = 'Saving...';
        setTimeout(function() {
            saveButton.innerText = "Save Game";
            document.body.classList.remove('waiting');
        }, 500);
    }

    function loadGame() {
        return {
            boardSectionsClassList: JSON.parse(localStorage.boardSectionsClassList),
            cellsClassList: JSON.parse(localStorage.cellsClassList),
            xTurn: (localStorage.xTurn === 'true'),
            playedCellIndex: parseInt(localStorage.playableSection),
            conquestMode: (localStorage.conquestMode === 'true')
        }
    }

    return { saveGame, loadGame }

})();

//GAME OVER MODULE
const gameOverModule = (() => {
    //Cache DOM
    const winningMessage = document.getElementById('winningMessage');
    const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
    const restartButton = document.getElementById('restartButton');

    events.subscribe('endGame', endGame);

    function endGame(data) {
        const draw = data[0];
        const currentClass = data[1];
        if (draw) winningMessageTextElement.innerText = 'Draw';
        if (!draw) winningMessageTextElement.innerText = currentClass + "'s Win!";
        winningMessage.classList.add('show');
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
    const saveButton = document.getElementById('saveButton'); //Implement auto-saving
    const turnIndicator = document.getElementById('turnIndicator');
    const playableSectionIndicatorText = document.getElementById('playableSectionIndicatorText');
    let conquestMode = (localStorage.conquestMode === 'true');


    //Bind Events
    saveButton.addEventListener('click', saveGameModule.saveGame);
    events.subscribe('playableSection', setPlayableSectionIndicatorText);


    (function setConquestMode() {
        if (conquestMode) document.getElementById('conquestModeIndicator').classList.add('show');
    })();

    function getConquestMode() {
        return conquestMode;
    }

    function setPlayableSectionIndicatorText(data) {
        const playedCellIndex = data[0];
        const sentToFullSection = data[1];

        if (sentToFullSection) {
            playableSectionIndicatorText.innerText = 'Play\nAnywhere';
            return;
        }

        if (playedCellIndex === 0) playableSectionIndicatorText.innerText = 'Top\nLeft';
        else if (playedCellIndex === 1) playableSectionIndicatorText.innerText = 'Top\nMiddle';
        else if (playedCellIndex === 2) playableSectionIndicatorText.innerText = 'Top\nRight';
        else if (playedCellIndex === 3) playableSectionIndicatorText.innerText = 'Middle\nLeft';
        else if (playedCellIndex === 4) playableSectionIndicatorText.innerText = 'Center';
        else if (playedCellIndex === 5) playableSectionIndicatorText.innerText = 'Middle\nRight';
        else if (playedCellIndex === 6) playableSectionIndicatorText.innerText = 'Bottom\nLeft';
        else if (playedCellIndex === 7) playableSectionIndicatorText.innerText = 'Bottom\nMiddle';
        else if (playedCellIndex === 8) playableSectionIndicatorText.innerText = 'Bottom\nRight';
        else playableSectionIndicatorText.innerText = 'Play\nAnywhere';
    }

    return { getConquestMode }

})();

//GAMEPLAY MODULE
const gameboardModule = (() => {
    //Variables
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

    //Board Module?
    const savedGameExist = (localStorage.savedGameExist === 'true');
    let xTurn;
    let playedCellIndex;
    let indexOfPlayedSection;

    function getSaveVar() {
        return { //maybe add cell and borad class lists here?
            xTurn,
            playedCellIndex,
            conquestMode: gameIndicatorsModule.getConquestMode()
        };
    }


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
    const boardSection = document.querySelectorAll('.board-segment');
    const cellElements = document.querySelectorAll('.cell');

    events.subscribe('restartGame', initializeGame);


    function initializeGame() {
        if (savedGameExist) { //Check is this runs when pressing restart game after a saved game too?
            const loadedGame = saveGameModule.loadGame();
            setBoard(loadedGame);
        } else setBoard(null);
    }
    initializeGame();

    function setBoard(loadedGame) {
        let sentToFullSection = false;
        if (loadedGame === null) {
            boardSection.forEach(section => {
                section.classList.remove('X', 'O', 'X-win', 'O-win');
                section.classList.add('X');
            })
            cellElements.forEach(cell => {
                cell.classList.remove('X', 'O');
                cell.removeEventListener('click', handleClick);
                cell.addEventListener('click', handleClick);
            })

            turnIndicator.classList.remove('X', 'O');
            turnIndicator.classList.add('X');
            xTurn = true;
        } else {
            xTurn = loadedGame.xTurn;
            playedCellIndex = loadedGame.playedCellIndex;
            conquestMode = loadedGame.conquestMode;
            cellsClassList = loadedGame.cellsClassList;
            boardSectionsClassList = loadedGame.boardSectionsClassList;

            for (i = 0; i < 81; i++) {
                cellElements[i].classList.add(Object.values(cellsClassList[i])[1]); //better way to do this? What if class isn't always in [1] position?
            }
            for (i = 0; i < 9; i++) {
                boardSection[i].classList.add(Object.values(boardSectionsClassList[i])[1]); //same as above
            }

            boardSection.forEach(section => {
                section.classList.remove('undefined');
            })

            cellElements.forEach(cell => {
                cell.classList.remove('undefined');
                cell.removeEventListener('click', handleClick);
                cell.addEventListener('click', handleClick);
            })

            turnIndicator.classList.remove('X', 'O');
            if (xTurn) turnIndicator.classList.add('X');
            if (!xTurn) turnIndicator.classList.add('O');

            if (isSectionFull(playedCellIndex)) {
                setBoardHoverClass(playedCellIndex, true);
                sentToFullSection = true;
            } else {
                setBoardHoverClass(playedCellIndex, false);
                sentToFullSection = false;
            }

            if (conquestMode) conquestModeIndicator.classList.add('show');
            else conquestModeIndicator.classList.remove('show');
        }

        events.publish('playableSection', [playedCellIndex, sentToFullSection]);
    }

    function handleClick(e) {
        const cell = e.target;
        const currentClass = xTurn ? 'X' : 'O';
        const currentWinCheckClass = xTurn ? 'X-win' : 'O-win';
        playedCellIndex = Array.prototype.indexOf.call(cell.parentNode.children, cell);
        indexOfPlayedSection = Array.prototype.indexOf.call(cell.parentNode.parentNode.children, cell.parentNode);

        if (!placeCellMarker(cell, currentClass, indexOfPlayedSection)) return;

        if (checkSectionWin(cell, currentClass, playedCellIndex)) placeSectionWinMarker(cell);

        if (checkGameWin(currentWinCheckClass)) { events.publish('endGame', [false, currentClass]); return; }
        if (checkDraw()) { events.publish('endGame', [true, currentClass]); return; }

        switchTurn(currentClass);
        if (isSectionFull(playedCellIndex)) {
            setBoardHoverClass(playedCellIndex, true);
            events.publish('playableSection', [playedCellIndex, true]);
        } else {
            setBoardHoverClass(playedCellIndex, false);
            events.publish('playableSection', [playedCellIndex, false]);
        }
    }

    function placeCellMarker(cell, currentClass, indexOfPlayedSection) {
        if (cell.classList.contains('X') || cell.classList.contains('O')) return false;
        if (boardSection[indexOfPlayedSection].classList.contains(currentClass) === false) return false;

        cell.classList.add(currentClass);
        return true;
    }

    function switchTurn() {
        xTurn = !xTurn;
        if (xTurn) turnIndicator.classList.replace('O', 'X');
        if (!xTurn) turnIndicator.classList.replace('X', 'O');
    }

    function setBoardHoverClass(playedCellIndex, sentToFullSection) {
        boardSection.forEach(section => section.classList.remove('X', 'O'));

        //If section is full, sets class of each section to 'X' or 'O' to allow any section to be played on/hovered over
        if (sentToFullSection) {
            if (xTurn) boardSection.forEach(section => section.classList.add('X'));
            if (!xTurn) boardSection.forEach(section => section.classList.add('O'));
            return;
        }

        if (xTurn) boardSection[playedCellIndex].classList.add('X');
        if (!xTurn) boardSection[playedCellIndex].classList.add('O');
    }

    function isSectionFull(playedCellIndex) {
        if (isNaN(playedCellIndex)) {
            return true;
        }
        return Array.from(boardSection[playedCellIndex].children).every(child =>
            child.classList.contains('X') || child.classList.contains('O')
        );
    }

    function placeSectionWinMarker(cell) {
        cell.parentNode.classList.remove('X-win', 'O-win');

        if (xTurn) cell.parentNode.classList.add('X-win');
        if (!xTurn) cell.parentNode.classList.add('O-win');
    }

    function checkSectionWin(cell, currentClass, playedCellIndex) {
        if (!gameIndicatorsModule.getConquestMode()) {
            if (cell.parentNode.classList.contains('X-win') || cell.parentNode.classList.contains('O-win')) {
                return false;
            }
        }

        //Checks if the winning combination is in the WINNING_COMBINATIONS array AND includes the index of the played cell
        return WINNING_COMBINATIONS.find(combination => {
            return combination.every(index => {
                return cell.parentNode.children[index].classList.contains(currentClass);
            }) && ([...combination].includes(playedCellIndex));
        });
    }

    function checkGameWin(currentWinCheckClass) {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return boardSection[index].classList.contains(currentWinCheckClass);
            })
        })
    }

    function checkDraw() {
        return [...cellElements].every(cell => {
            return cell.classList.contains('X') || cell.classList.contains('O');
        })
    }

    return { getSaveVar }

})();