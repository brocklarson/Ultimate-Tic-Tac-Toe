const howToPlay = (() => {
    const instructionText = [
        "The game is relatively simple, it's just like Tic-Tac-Toe, except you're playing 9 games... all at once...",
        "Player 1 may start anywhere in any of the boards. But note that where player 1 goes controls where the next player must play.",
        "For example, if player 1 (X) plays in the top left box of one of the boards, then player 2 (O) must play in the top left board.<br><br>Then, if player 2 (O) plays in the center box of the top left board, player 1 (X) must play their next move in the center board.",
        "Once a player gets a tic-tac-toe in any of the boards, a large 'X' or 'O' will be overlaid to indicate that they won that board.<br><br>After a board has been won, the board may still be played in by either player.",
        "Once a board has been won, the outcome cannot be changed even if the other player later gets a tic-tac-toe in the same board<br><br>However, in 'Conquest Mode', getting a tic-tac-toe in an already won board will cause the board to be overtaken.",
        "Get three boards in a row to win!",
        "This indicator on the top left of the board indicates which player's turn it is",
        "This indicator indicates which board you can play in",
        "If you see this indicator, it means you are playing in 'Conquest Mode'!"
    ];
    const cellIndex = [
        [63, 4],
        [63, 4, 40, 38, 23, 25, 67, 39, 34, 56, 50, 80, 79, 64, 10, 16, 71],
        [63, 4, 40, 38, 23, 25, 67, 39, 34, 56, 50, 80, 79, 64, 10, 16, 71, 76, 36, 7, 70, 69, 61, 58, 44, 72, 0, 1, 11, 19, 9]
    ]
    let counter = 0;

    (function createBoard() {
        const gameBoard = document.getElementById('howToPlayBoardWhole');
        for (i = 0; i < 9; i++) {
            let boardSegment = document.createElement('div');
            gameBoard.appendChild(boardSegment).className = 'how-to-play-board-segment';
            for (j = 0; j < 9; j++) {
                let cell = document.createElement('div');
                boardSegment.appendChild(cell).className = 'how-to-play-cell';
            }
        }
    })();

    //Cache DOM
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


    //Bind Events
    leftArrow.addEventListener('click', clickLeftArrow);
    rightArrow.addEventListener('click', clickRightArrow);
    instructionZero();

    function clickLeftArrow() {
        if (counter > 0) counter -= 1;
        showInstruction(counter);
    }

    function clickRightArrow() {
        if (counter < 8) counter += 1;
        showInstruction(counter)
    }

    function showInstruction(counter) {
        if (counter === 0) instructionZero();
        else if (counter === 1) instructionOne();
        else if (counter === 2) instructionTwo();
        else if (counter === 3) instructionThree();
        else if (counter === 4) instructionFour();
        else if (counter === 5) instructionFive();
        else if (counter === 6) instructionSix();
        else if (counter === 7) instructionSeven();
        else if (counter === 8) instructionEight();
    }

    function instructionZero() {
        leftArrow.firstChild.classList.add('hide');
        gameIndicators.classList.add('hide');
        howToPlayText.innerHTML = instructionText[0];
    }

    function instructionOne() {
        leftArrow.firstChild.classList.remove('hide');
        boardSection.forEach(section => {
            section.classList.remove('X-win', 'O-win');
        })
        cellElements.forEach(cell => {
            cell.classList.remove('X', 'O');
        })
        howToPlayText.innerHTML = instructionText[1];
    }

    function instructionTwo() {
        boardSection.forEach(section => {
            section.classList.remove('X-win', 'O-win');
        });
        cellElements.forEach(cell => {
            cell.classList.remove('X', 'O');
        });
        let marker = 'O';
        cellIndex[0].forEach(num => {
            marker = (marker === 'O') ? 'X' : 'O';
            cellElements[num].classList.add(marker);
        })
        howToPlayText.innerHTML = instructionText[2];
    }

    function instructionThree() {
        boardSection.forEach(section => {
            section.classList.remove('X-win', 'O-win');
        })
        cellElements.forEach(cell => {
            cell.classList.remove('X', 'O');
        })
        let marker = 'O';
        cellIndex[1].forEach(num => {
            marker = (marker === 'O') ? 'X' : 'O';
            cellElements[num].classList.add(marker);
        })
        boardSection[7].classList.add('X-win');
        howToPlayText.innerHTML = instructionText[3];
    }

    function instructionFour() {
        boardSection.forEach(section => {
            section.classList.remove('X-win', 'O-win');
        })
        cellElements.forEach(cell => {
            cell.classList.remove('X', 'O');
        })
        let marker = 'O';
        cellIndex[1].forEach(num => {
            marker = (marker === 'O') ? 'X' : 'O';
            cellElements[num].classList.add(marker);
        })
        boardSection[7].classList.add('X-win');
        howToPlayText.innerHTML = instructionText[4];
    }

    function instructionFive() {
        gameBoard.classList.remove('hide');
        turnIndicator.classList.remove('circled');
        gameIndicators.classList.add('hide');

        boardSection.forEach(section => {
            section.classList.remove('X-win', 'O-win');
        })
        cellElements.forEach(cell => {
            cell.classList.remove('X', 'O');
        })
        let marker = 'O';
        cellIndex[2].forEach(num => {
            marker = (marker === 'O') ? 'X' : 'O';
            cellElements[num].classList.add(marker);
        });
        boardSection[0].classList.add('O-win');
        boardSection[1].classList.add('X-win');
        boardSection[4].classList.add('X-win');
        boardSection[7].classList.add('X-win');
        boardSection[8].classList.add('O-win');
        howToPlayText.innerHTML = instructionText[5];
    }

    function instructionSix() {
        sectionIndicator.classList.remove('circled');
        gameIndicators.classList.remove('hide');
        turnIndicator.classList.add('circled');
        gameBoard.classList.add('hide');
        boardSection.forEach(section => {
            section.classList.remove('X-win', 'O-win');
        })
        cellElements.forEach(cell => {
            cell.classList.remove('X', 'O');
        })
        howToPlayText.innerHTML = instructionText[6];
    }

    function instructionSeven() {
        rightArrow.firstChild.classList.remove('hide');
        turnIndicator.classList.remove('circled');
        conquestIndicator.classList.remove('circled');
        sectionIndicator.classList.add('circled');
        howToPlayText.innerHTML = instructionText[7];
    }

    function instructionEight() {
        sectionIndicator.classList.remove('circled');
        rightArrow.firstChild.classList.add('hide');
        conquestIndicator.classList.add('circled');
        howToPlayText.innerHTML = instructionText[8];
    }
})();