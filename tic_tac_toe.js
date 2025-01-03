
const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let board = Array(9).fill(null);


function createBoard() {
    gameBoard.innerHTML = '';
    board.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    });
}


function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (!board[index]) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add('taken');

        if (checkWin()) {
            message.textContent = `${currentPlayer} wins!`;
            endGame();
        } else if (board.every(cell => cell)) {
            message.textContent = "It's a tie!";
            endGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}


function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

//end game
function endGame() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
}

// Restart game
function restartGame() {
    board.fill(null);
    currentPlayer = 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
    createBoard();
}

restartButton.addEventListener('click', restartGame);

// Initialize game
createBoard();
message.textContent = `Player ${currentPlayer}'s turn`;
