//gameboard
const gameboard = (() => {

    //size of the board
    let slotCount = 9;
    let board = [];

    //fill board with different numbers from 3 to 11 to use later to check if there is a 3 in a row on the board
    for (let i = 0; i < slotCount; i++)
    {
        board[i] = i + 3;
    }

    const move = (symbol, slot) => {
        if (symbol === "X") {
            board[slot] = 1;
            return 0;
        }
        //set board slot to 2 for Circles
        else if (symbol === "O") {
            board[slot] = 2;
            return 0;
        }
    }

    //check for all winning conditions
    const checkWin = (count) => {
        if (board[0] === board[1] && board[0] === board[2])
            return 1;
        else if (board[3] === board[4] && board[3] === board[5]) 
            return 1;
        else if (board[6] === board[7] && board[6] === board[8]) 
            return 1;
        else if (board[0] === board[3] && board[0] === board[6]) 
            return 1;
        else if (board[1] === board[4] && board[1] === board[7]) 
            return 1;       
        else if (board[2] === board[5] && board[2] === board[8]) 
            return 1;
        else if (board[0] === board[4] && board[0] === board[8]) 
            return 1;   
        else if (board[2] === board[4] && board[2] === board[6]) 
            return 1;
        //or a tie
        else if (count === 9) 
            return 2;
        //or no result yet
        else 
            return 0;
    }

    //reset board array, visual gameboard, and message boxes
    const resetBoard = () => {
        for (let i = 0; i < slotCount; i++) {
            board[i] = i + 3;
        }
        let buttons = document.querySelectorAll(".board_slot");
        buttons.forEach((button) => {
            button.textContent = "";
            button.disabled = false;
        });
        let resultBox = document.querySelector(".result");
        let againBox = document.querySelector(".again");
        resultBox.removeChild(resultBox.firstChild);
        againBox.removeChild(againBox.firstChild);
    }

    return { move, checkWin, resetBoard };
})();

//game
const game = (() => {

    let counter = 0;

    //player with name and symbol
    const player = (name, symbol) => {
        return { name, symbol }
    };

    const player1 = player("Player One", "X");
    const player2 = player("Player Two", "O");

    const players = [player1, player2];

    let currentPlayer = players[0];

    //switch using ternary operator
    const switchTurns = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    let buttons = document.querySelectorAll(".board_slot");
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            turn(button.id);
        });
    });

    const displayWinner = (result) => {
        let resultBox, resultMessage, againBox, againBtn;
        //if a result is decided
        if (result !== 0) {
            //add the messages for result and playing again
            resultBox = document.querySelector(".result");
            resultMessage = document.createElement("div");
            againBox = document.querySelector(".again");
            againBtn = document.createElement("button");
            resultMessage.style.color = againBtn.style.color = 'white';
            resultMessage.style.fontFamily = againBtn.style.fontFamily = 'Amatic';
            resultMessage.style.fontSize = againBtn.style.fontSize = '100px';
            againBtn.style.backgroundColor = 'black';
            againBtn.style.border = 'none';
            againBtn.setAttribute('id', 'againBtn');
            // againBtn.addEventListener("mouseover", (event) => {
            //     againBtn.style.color = "yellow";
            // });
            //change text size if hovered, added play againr reset function to button
            againBtn.onmouseenter = () => againBtn.style.fontSize = "120px";
            againBtn.onmouseleave = () => againBtn.style.fontSize = "100px";
            againBtn.onclick = () => gameboard.resetBoard();
        }
        //in the event a player won
        if (result === 1) {
            //display winner, display buttons, prompt to play again, reset counter and player
            resultMessage.textContent = `${currentPlayer.name} Wins!`;
            resultBox.appendChild(resultMessage);
            buttons.forEach((button) => {
                button.disabled = true;
            })
            againBtn.textContent = "Play Again?";
            againBox.appendChild(againBtn);
            counter = 0;
            currentPlayer = player2;
        }
        //in the event of a tie
        else if (result === 2) {
            resultMessage.textContent = "It's a Tie!";
            resultBox.appendChild(resultMessage);
            againBtn.textContent = "Play Again?";
            againBox.appendChild(againBtn);
            counter = 0;
            currentPlayer = player2;
        }
    }

    //one turn of a player
    const turn = (id) => {
        //pass in id of button, call move function and update board accordint to current player
        gameboard.move(currentPlayer.symbol, parseInt(id));
        let current = document.getElementById(id);
        //disable that button
        current.setAttribute("disabled", true);
        current.textContent = currentPlayer.symbol;
        //update counter for tie check
        counter++;
        //check for win
        let result = gameboard.checkWin(counter);
        //call display winner
        displayWinner(result);
        //switch turn
        switchTurns();
    };
})();

