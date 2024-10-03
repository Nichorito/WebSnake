import "./styles.css";
const ROWS = 20;
const COLUMNS = 40;

function GameManager() { 
    let ui = UIManager();
    let boardArray = [];

    
    //Create snake
    const startGame = () => {
        console.log("\n\n\nIts time to play the game");
        
        resetBoard();

        boardArray[ROWS/2][COLUMNS/2] = 1;
    }

    //Resets the console/logic board
    const resetBoard = () =>{
        
        //Create and fill array with 0s
        for (let row = 0; row < ROWS; row++) {
            boardArray[row] = [];
            for (let col = 0; col < COLUMNS; col++) {
                boardArray[row][col] = 0;
            }
        }

        //Display board
        console.log("\nHere is the new board:\n");
        console.log(boardArray);
    }

    const getBoard = () => boardArray;

    return {startGame, getBoard}
}

function PlayerControl() {
    let board = gameManager.getBoard();
    let activeRow = ROWS/2;
    let activeCol = COLUMNS/2;
    let direction = '';
    let moveInterval;   // To store the interval ID

    // Function to handle movement logic based on key pressed
    const moveSnake = (direction) => {
        // Clear the previous interval if it's already moving
        if (moveInterval) {
            clearInterval(moveInterval);
        }

        // Start the interval based on the current direction
        moveInterval = setInterval(function() {
            
            board[activeRow][activeCol] = 0;

            if (direction === 'left') {
                activeCol -= 1;
                console.log("\n\nMoving left. Current column:", activeCol);
            } else if (direction === 'right') {
                activeCol += 1;
                console.log("\n\nMoving right. Current column:", activeCol);
            } else if (direction === 'up') {
                activeRow -= 1;
                console.log("\n\nMoving up. Current row:", activeRow);
            } else if (direction === 'down') {
                activeRow += 1;
                console.log("\n\nMoving down. Current row:", activeRow);
            }
        
            //Check whether the snake has reached the edge 
            if (activeCol < 1 || activeCol > 38 || activeRow < 1 || activeRow > 18) {
                clearInterval(moveInterval);
                console.log("YOU'RE DEAD")
            }   
            //Set the cell to be active
            console.log("\nUpdating board: Active row is " + activeRow + "  Active Column is " + activeCol)
            board[activeRow][activeCol] = 1;
            console.log(board)
            uiManager.updateGrid();
        }, 250); // 1000ms = 1 second
    }

    document.addEventListener("keydown", function(event) {
        const activeKey = event.key.toLowerCase();
        let newDirection = '';

        // Update the direction based on key press
        if (activeKey === 'a' && direction !== 'left' && direction !== 'right') {   // Move left
            console.log("\nYou pressed the 'A' key! Moving Left:");
            newDirection = 'left';
        } else if (activeKey === 'd' && direction !== 'right' && direction !== 'left') {  // Move right
            console.log("\nYou pressed the 'D' key! Moving Right:");
            newDirection = 'right';
        } else if (activeKey === 'w' && direction !== 'up' && direction !== 'down') {  // Move up
            console.log("\nYou pressed the 'W' key! Moving Up:");
            newDirection = 'up';
        } else if (activeKey === 's' && direction !== 'down' && direction !== 'up') {  // Move down
            console.log("\nYou pressed the 'S' key! Moving Down:");
            newDirection = 'down';
        } else if (activeKey === 'p') {
            console.log("\n\n\nPausing\n\n\n");
            clearInterval(moveInterval);
        }

        // Only start movement if the direction changes
        if (newDirection && newDirection !== direction) {
            direction = newDirection;
            moveSnake(direction); // Restart the interval with the new direction
        }
    });
    
}


//////////////////////
//// UI ELEMENTS /////
//////////////////////

function UIManager() {
    const gridContainer = document.getElementById('grid');

    const updateGrid = () => {
        let board = gameManager.getBoard();
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLUMNS; col++) {
                let cell = document.getElementById(`cell${row}/${col}`);
                if (board[row][col] == 1) {
                    cell.classList.add('active'); // Highlight active cells (e.g., snake)
                    console.log(`Checking cell${row}${col}:  Value is ${board[row][col]}`)
                } else {
                    cell.classList.remove('active');
                }
            }
        }
    };
    //Create initial grid

    const createGrid = () => {
        let board = gameManager.getBoard();
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLUMNS; col++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-row', row);
                cell.setAttribute('data-col', col);
                cell.setAttribute('id', `cell${row}/${col}`);
                gridContainer.appendChild(cell);
                setColor(row, col, cell); // Call setColor to set the cell's color
            }
        }
        updateGrid();
    }
    
    const setColor = (row, col, cell) => {
        // Use the sum of row and column to determine color
        if ((row + col) % 2 === 0) {
            cell.classList.add('darkCell'); // Even sum: green
        } else {
            cell.classList.add('lightGreen'); // Odd sum: lightgreen
        }
    }
    
    return {createGrid, updateGrid, gridContainer}
}

const gameManager = GameManager();
gameManager.startGame();
window.gameManager = gameManager;


const uiManager = UIManager();
uiManager.createGrid();

PlayerControl();