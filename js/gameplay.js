//GAME OVER MODULE
const gameOverModule = (() => {
    //Cache DOM
    const winningMessage = document.getElementById('winningMessage');
    const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
    const restartButton = document.getElementById('restartButton');

    //Bind Events
    restartButton.addEventListener('click', initializeGame); //Combine this with resetGameWin and publish?

    function resetGameWin() {
        winningMessage.classList.remove('show');
        console.log('here');
    }

    return { resetGameWin }
});

//GAME INDICATORS MODULE
const gameIndicatorsModule = (() => {
    //Cache DOM
    const saveButton = document.getElementById('saveButton'); //Implement auto-saving
    const turnIndicator = document.getElementById('turnIndicator');
    const playableSectionIndicatorText = document.getElementById('playableSectionIndicatorText');
    const conquestModeIndicator = document.getElementById('conquestModeIndicator');
    let conquestMode = (localStorage.conquestMode === 'true');


    //Bind Events
    // saveButton.addEventListener('click', saveGame);
    events.subscribe('playableSection', setPlayableSectionIndicatorText);

    (function setConquestMode() {
        if (conquestMode) conquestModeIndicator.classList.add('show');
    })();

    function setPlayableSectionIndicatorText(data) {
        const playedCellIndex = data[0];
        const sentToFullSection = data[1];

        if (sentToFullSection) {
            playableSectionIndicatorText.innerHTML = 'Play<br>Anywhere';
            return;
        }

        switch (playedCellIndex) {
            case 0:
                playableSectionIndicatorText.innerHTML = 'Top<br>Left';
                break;
            case 1:
                playableSectionIndicatorText.innerHTML = 'Top<br>Middle';
                break;
            case 2:
                playableSectionIndicatorText.innerHTML = 'Top<br>Right';
                break;
            case 3:
                playableSectionIndicatorText.innerHTML = 'Middle<br>Left';
                break;
            case 4:
                playableSectionIndicatorText.innerHTML = 'Center';
                break;
            case 5:
                playableSectionIndicatorText.innerHTML = 'Middle<br>Right';
                break;
            case 6:
                playableSectionIndicatorText.innerHTML = 'Bottom<br>Left';
                break;
            case 7:
                playableSectionIndicatorText.innerHTML = 'Bottom<br>Middle';
                break;
            case 8:
                playableSectionIndicatorText.innerHTML = 'Bottom<br>Right';
                break;
            default:
                playableSectionIndicatorText.innerHTML = 'Play<br>Anywhere';
                break;
        }
    }

})();

//GAMEPLAY MODULE
const gameboardModule = (() => {
    //Cache DOM
    const X_CLASS = 'X'; //For individual cells
    const O_CLASS = 'O'; //For individual cells
    const X_WIN_CLASS = 'X-win'; //For board section 
    const O_WIN_CLASS = 'O-win'; //For board section
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
    const gameBoard = document.getElementById('boardWhole');
    const boardSection = document.querySelectorAll('.board-segment');
    const cellElements = document.querySelectorAll('.cell');

    //Board Module?
    const savedGameExist = (localStorage.savedGameExist === 'true');
    let xTurn;
    let playedCellIndex;
    let indexOfPlayedSection;


    (function createBoard() {
        for (i = 0; i < 9; i++) {
            let boardSegment = document.createElement('div');
            boardWhole.appendChild(boardSegment).className = 'board-segment';
            for (j = 0; j < 9; j++) {
                let cell = document.createElement('div');
                boardSegment.appendChild(cell).className = 'cell';
            }
        }
    })();

    function initializeGame() {
        // if (savedGameExist) {
        //     loadGame();
        //     return;
        // }

        xTurn = true;
        resetBoard();
        events.publish('playableSection', [null, true]);
        gameOverModule.resetGameWin();
    }
    initializeGame();

    function resetBoard() {
        boardSection.forEach(section => {
            section.classList.remove(X_CLASS, O_CLASS, X_WIN_CLASS, O_WIN_CLASS);
            section.classList.add(X_CLASS);
        })
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS, O_CLASS);
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick);
        })

        turnIndicator.classList.remove(X_CLASS, O_CLASS);
        turnIndicator.classList.add(X_CLASS);
    }

    function handleClick(e) {
        const cell = e.target;
        const currentClass = xTurn ? X_CLASS : O_CLASS;
        const currentWinCheckClass = xTurn ? X_WIN_CLASS : O_WIN_CLASS;
        playedCellIndex = Array.prototype.indexOf.call(cell.parentNode.children, cell);
        indexOfPlayedSection = Array.prototype.indexOf.call(cell.parentNode.parentNode.children, cell.parentNode);

        if (!placeCellMarker(cell, currentClass, indexOfPlayedSection)) return;

        if (checkSectionWin(cell, currentClass, playedCellIndex)) placeSectionWinMarker(cell);

        if (checkGameWin(currentWinCheckClass)) { endGame(false, currentClass); return; }
        if (checkDraw()) { endGame(true, currentClass); return; }

        switchTurn(currentClass);
        if (isSectionFull(playedCellIndex)) {
            setBoardHoverClass(playedCellIndex, true);
            setPlayableSectionIndicatorText(playedCellIndex, true);
        } else {
            setBoardHoverClass(playedCellIndex, false);
            setPlayableSectionIndicatorText(playedCellIndex, false);
        }
    }

    function placeCellMarker(cell, currentClass, indexOfPlayedSection) {
        if (cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)) return false;
        if (boardSection[indexOfPlayedSection].classList.contains(currentClass) === false) return false;

        cell.classList.add(currentClass);
        return true;
    }

    function switchTurn() {
        xTurn = !xTurn;
        if (xTurn) turnIndicator.classList.replace(O_CLASS, X_CLASS);
        if (!xTurn) turnIndicator.classList.replace(X_CLASS, O_CLASS);
    }

    function setBoardHoverClass(playedCellIndex, sentToFullSection) {
        boardSection.forEach(section => section.classList.remove(X_CLASS, O_CLASS));

        //If isSectionFull() === true, sets class of each section to 'X' or 'O' to allow any section to be played on/hovered over
        if (sentToFullSection) {
            if (xTurn) boardSection.forEach(section => section.classList.add(X_CLASS));
            if (!xTurn) boardSection.forEach(section => section.classList.add(O_CLASS));
            return;
        }

        if (xTurn) boardSection[playedCellIndex].classList.add(X_CLASS);
        if (!xTurn) boardSection[playedCellIndex].classList.add(O_CLASS);
    }

    function isSectionFull(playedCellIndex) {
        if (isNaN(playedCellIndex)) {
            return true;
        }
        return Array.from(boardSection[playedCellIndex].children).every(child =>
            child.classList.contains(X_CLASS) || child.classList.contains(O_CLASS)
        );
    }

    function placeSectionWinMarker(cell) {
        cell.parentNode.classList.remove(X_WIN_CLASS, O_WIN_CLASS);

        if (xTurn) cell.parentNode.classList.add(X_WIN_CLASS);
        if (!xTurn) cell.parentNode.classList.add(O_WIN_CLASS);
    }

    function checkSectionWin(cell, currentClass, playedCellIndex) {
        if (!conquestMode) {
            if (cell.parentNode.classList.contains(X_WIN_CLASS) || cell.parentNode.classList.contains(O_WIN_CLASS)) {
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
            return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
        })
    }

    function endGame(draw, currentClass) {
        if (draw) winningMessageTextElement.innerHTML = 'Draw';
        if (!draw) winningMessageTextElement.innerHTML = currentClass + "'s Win!";
        winningMessage.classList.add('show');
    }

})();



//SAVE GAME MODULE
const saveGameModule = (() => {
    function saveGame() {
        document.body.classList.add('waiting');

        localStorage.setItem('savedGameExist', true);
        localStorage.setItem('savedGameConquestMode', conquestMode);

        let cellsClassList = [];
        for (i = 0; i < 81; i++) {
            cellsClassList[i] = cellElements[i].classList;
        }
        localStorage.setItem('cellsClassList', JSON.stringify(cellsClassList));

        let boardSectionsClassList = [];
        for (i = 0; i < 9; i++) {
            boardSectionsClassList[i] = boardSection[i].classList;
        }
        localStorage.setItem('boardSectionsClassList', JSON.stringify(boardSectionsClassList));
        localStorage.setItem('xTurn', xTurn);
        localStorage.setItem('playableSection', playedCellIndex);

        saveButton.innerHTML = 'Saving...';
        setTimeout(function() {
            saveButton.innerHTML = "Save Game";
            document.body.classList.remove('waiting');
        }, 500);
    }

    function loadGame() {
        //for loops add X/O and X_WIN/O_WIN class to cells Elements and board sections, repectively
        for (i = 0; i < 81; i++) {
            cellElements[i].classList.add(Object.values(JSON.parse(localStorage.cellsClassList)[i])[1])
        }
        for (i = 0; i < 9; i++) {
            boardSection[i].classList.add(Object.values(JSON.parse(localStorage.boardSectionsClassList)[i])[1])
        }

        cellElements.forEach(cell => {
            cell.classList.remove('undefined');
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick);
        })

        boardSection.forEach(section => {
            section.classList.remove('undefined');
        })

        turnIndicator.classList.remove(X_CLASS, O_CLASS);
        xTurn = (localStorage.xTurn === 'true');
        if (xTurn) turnIndicator.classList.add(X_CLASS);
        if (!xTurn) turnIndicator.classList.add(O_CLASS);

        playedCellIndex = parseInt(localStorage.playableSection);
        if (isSectionFull(playedCellIndex)) {
            setBoardHoverClass(playedCellIndex, true);
            setPlayableSectionIndicatorText(playedCellIndex, true);
        } else {
            setBoardHoverClass(playedCellIndex, false);
            setPlayableSectionIndicatorText(playedCellIndex, false);
        }

        if (localStorage.savedGameConquestMode === 'true') {
            conquestMode = true;
            conquestModeIndicator.classList.add('show');
        } else {
            conquestMode = false;
            conquestModeIndicator.classList.remove('show');
        }

        winningMessage.classList.remove('show');
    }

    return { saveGame, loadGame }

})