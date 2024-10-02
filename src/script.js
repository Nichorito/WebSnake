import "./styles.css";



//////////////////////
//// UI ELEMENTS /////
//////////////////////

const gridContainer = document.getElementById('grid');
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 40; col++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-row', row);
                cell.setAttribute('data-col', col);
                cell.innerText = `cell[${row}][${col}]`;
                gridContainer.appendChild(cell);
            }
        }