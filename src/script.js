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
        }, 1000); // 1000ms = 1 second
    }

    document.addEventListener("keydown", function(event) {
        const activeKey = event.key.toLowerCase();
        let newDirection = '';

        // Update the direction based on key press
        if (activeKey === 'a' && direction !== 'left') {   // Move left
            console.log("\nYou pressed the 'A' key! Moving Left:");
            newDirection = 'left';
        } else if (activeKey === 'd' && direction !== 'right') {  // Move right
            console.log("\nYou pressed the 'D' key! Moving Right:");
            newDirection = 'right';
        } else if (activeKey === 'w' && direction !== 'up') {  // Move up
            console.log("\nYou pressed the 'W' key! Moving Up:");
            newDirection = 'up';
        } else if (activeKey === 's' && direction !== 'down') {  // Move down
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