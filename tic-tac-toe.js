//gameboard
const gameboard = (() => {

    //size of the board
    let slotCount = 9;
    let board = [];

    //fill board with 0's
    for (let i = 0; i < slotCount; i++)
    {
        board[i] = i + 3;
    }

    const move = (symbol, slot) => {
        if (symbol === "X") {
            board[slot] = 1;
            console.log(board);
            return 0;
        }
        //set board slot to 2 for Circles
        else if (symbol === "O") {
            board[slot] = 2;
            console.log(board);
            return 0;
        }
    }

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
        else if (count === 9) 
            return 2;
        else 
            return 0;
    }

    const hello = () => {
        console.log("hello");
    }

    return { move, hello, checkWin };
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

    //one turn of a player
    const turn = (id) => {
        gameboard.move(currentPlayer.symbol, parseInt(id));
        let current = document.getElementById(id);
        current.setAttribute("disabled", true);
        current.textContent = currentPlayer.symbol;
        counter++;
        let result = gameboard.checkWin(counter);
        console.log(result);
        if (result === 1)
            alert(`${currentPlayer.name} Wins!`);
        else if (result === 2)  
            alert("It's a Tie!");
        switchTurns();
    };
})();

