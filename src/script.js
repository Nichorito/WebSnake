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
    let activeKey;
    let moveInterval;   // To store the interval ID
    let isMoving = false; // Flag to check if movement is already happening

    // Function to handle movement logic based on key pressed
    const startMovement = (direction) => {
        // Clear the previous interval if it's already moving
        if (moveInterval) {
            clearInterval(moveInterval);
        }

        // Start the interval based on the current direction
        moveInterval = setInterval(function() {
            if (direction === 'left') {
                activeCol -= 1;
                console.log("Moving left. Current column:", activeCol);
            } else if (direction === 'right') {
                activeCol += 1;
                console.log("Moving right. Current column:", activeCol);
            } else if (direction === 'up') {
                activeRow -= 1;
                console.log("Moving up. Current row:", activeRow);
            } else if (direction === 'down') {
                activeRow += 1;
                console.log("Moving down. Current row:", activeRow);
            }
        
        //Check whether the snake has reached the edge 
        if (activeCol < 0 || activeCol > 38 || activeRow < 0 || activeRow > 18) {
            clearInterval(moveInterval);
            console.log("YOU'RE DEAD")
        }
            board[activeRow][activeCol] = 1;
            console.log(board)
        }, 1000); // 1000ms = 1 second
    }

    // Keydown event listener to detect direction
    document.addEventListener("keydown", function(event) {
        activeKey = event.key.toLowerCase();

        // Check for direction keys and start movement in that direction
        if (!isMoving) {
            if (activeKey === 'a') {   // Move left
                console.log("\nYou pressed the 'A' key! Moving Left:");
                startMovement('left');
                //isMoving = true;
            } else if (activeKey === 'd') {  // Move right
                console.log("\nYou pressed the 'D' key! Moving Right:");
                startMovement('right');
               // isMoving = true;
            } else if (activeKey === 'w') {  // Move up
                console.log("\nYou pressed the 'W' key! Moving Up:");
                startMovement('up');
               // isMoving = true;
            } else if (activeKey === 's') {  // Move down
                console.log("\nYou pressed the 'S' key! Moving Down:");
                startMovement('down');
               // isMoving = true;
            }
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