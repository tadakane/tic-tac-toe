const gameboard = (() => {
    let rowCount = 3;
    let colCount = 3;
    let board = [];

    for (let i = 0; i < rowCount; i++)
    {
        board.push([]);
        for (let j = 0; j < colCount; j++)
        {
            board[i].push(0);
        }
    }

    const move = (order, row, column) => {
        if (order === 1) {
            board[row][column] = 1;
        }
        else if (order === 2) {
            board[row][column] = -1;
        }
    }

    return { move };
})();

const game = (() => {

    const player = (name, order) => {
        return { name, order }
    };

    const player1 = player("Player One", 1);
    const player2 = player("Player Two", 2);

    const players = [player1, player2];

    let currentPlayer = players[0];

    const switchTurns = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

})();

