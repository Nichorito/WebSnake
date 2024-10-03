import "./styles.css";

function GameManager() { 
    let ui = UIManager();
    let boardArray = [];
    //Create snake
    const startGame = () => {
        console.log("\n\n\nIts time to play the game");
        
        resetBoard();
    }

    //Resets the console/logic board
    const resetBoard = () =>{
        
        //Create and fill array with 0s
        for (let row = 0; row < 20; row++) {
            boardArray[row] = [];
            for (let col = 0; col < 40; col++) {
                boardArray[row][col] = 0;
            }
        }

        //Create the snake
        boardArray[10][20] = 1;

        //Display board
        console.log("\nHere is the new board:\n");
        console.log(boardArray);
    }

    const getBoard = () => boardArray;

    return {startGame, getBoard}
}

function PlayerControl() {
    let board = gameManager.getBoard();
    let activeRow = 10;
    let activeCol = 20;
    const activeCell = board[activeRow][activeRow];

    document.addEventListener("keydown", function(event) {
        if (event.key === "a" || event.key === "A") {
            console.log("\nYou pressed the 'A' key!  Moving Left:");
            activeCol = activeCol - 1;
        }
        else if (event.key === "w" || event.key === "W") {
            console.log("You pressed the 'W' key!  Moving up:");
            activeRow = activeRow - 1;
        }
        else if (event.key === "d" || event.key === "D") {
            console.log("You pressed the 'D' key!  Moving right:");
            activeCol = activeCol + 1;
        }
        else if (event.key === "s" || event.key === "S") {
            console.log("You pressed the 'S' key!  Moving down:");
            activeRow = activeRow + 1;
        }

        console.log(board);
        board[activeRow][activeCol] = 1;
    });

    return {}
}

//////////////////////
//// UI ELEMENTS /////
//////////////////////

function UIManager() {
    const gridContainer = document.getElementById('grid');

    const updateGrid = () => {

    }


    //Create initial grid

    const createGrid = () =>{
        
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 40; col++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-row', row);
                cell.setAttribute('data-col', col);
                cell.setAttribute('id', `cell${row}${col}`)
                cell.innerText = `[${row}][${col}]`;
                gridContainer.appendChild(cell);
            }
        }
    }
    
    return {createGrid, updateGrid, gridContainer}
}



const uiManager = UIManager();
uiManager.createGrid();

const gameManager = GameManager();
gameManager.startGame();
window.gameManager = gameManager;

PlayerControl();