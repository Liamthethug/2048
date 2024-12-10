// Prompt user for table dimensions
const rows = parseInt(prompt("Enter the number of rows:"));
const cols = parseInt(prompt("Enter the number of columns:"));

// Create table dynamically
function createTable(rows, cols) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    for (let i = 0; i < rows; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            const td = document.createElement('td');
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    document.body.appendChild(table);
}

// Functions to manipulate table cells
function setValue(i, j, value) {
    const table = document.querySelector('table');
    const cell = table.rows[i].cells[j];
    cell.textContent = value;
}

function getValue(i, j) {
    const table = document.querySelector('table');
    const cell = table.rows[i].cells[j];
    return cell.textContent;
}

function isEmpty(i, j) {
    const table = document.querySelector('table');
    const cell = table.rows[i].cells[j];
    return cell.textContent === '';
}

// Helper function to get random integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Function to clear the table
function clearTable() {
    const table = document.querySelector('table');
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            setValue(i, j, '');
        }
    }
}

// Function to start a new game
function newGame() {
    clearTable();
    generateNewValue();
    generateNewValue();
}

// Function to generate a new value (2 or 4) in a random empty cell
function generateNewValue() {
    let emptyCells = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (isEmpty(i, j)) {
                emptyCells.push({i, j});
            }
        }
    }

    if (emptyCells.length > 0) {
        const {i, j} = emptyCells[getRandomInt(emptyCells.length)];
        const value = Math.random() < 0.85 ? 2 : 4;
        setValue(i, j, value);
    }
}

// Function to move values to the right and merge
function moveRight() {
    let moved = false;
    for (let i = 0; i < rows; i++) {
        let newRow = [];
        for (let j = 0; j < cols; j++) {
            const value = getValue(i, j);
            if (value !== '') {
                newRow.push(parseInt(value));
            }
        }
        for (let j = newRow.length - 1; j > 0; j--) {
            if (newRow[j] === newRow[j - 1]) {
                newRow[j] *= 2;
                newRow[j - 1] = '';
                moved = true;
            }
        }
        newRow = newRow.filter(value => value !== '');
        while (newRow.length < cols) {
            newRow.unshift('');
        }
        for (let j = 0; j < cols; j++) {
            if (getValue(i, j) !== newRow[j]) {
                moved = true;
            }
            setValue(i, j, newRow[j]);
        }
    }
    if (moved) {
        generateNewValue();
        checkGameStatus();
    }
}

// Function to move values to the left and merge
function moveLeft() {
    let moved = false;
    for (let i = 0; i < rows; i++) {
        let newRow = [];
        for (let j = 0; j < cols; j++) {
            const value = getValue(i, j);
            if (value !== '') {
                newRow.push(parseInt(value));
            }
        }
        for (let j = 0; j < newRow.length - 1; j++) {
            if (newRow[j] === newRow[j + 1]) {
                newRow[j] *= 2;
                newRow[j + 1] = '';
                moved = true;
            }
        }
        newRow = newRow.filter(value => value !== '');
        while (newRow.length < cols) {
            newRow.push('');
        }
        for (let j = 0; j < cols; j++) {
            if (getValue(i, j) !== newRow[j]) {
                moved = true;
            }
            setValue(i, j, newRow[j]);
        }
    }
    if (moved) {
        generateNewValue();
        checkGameStatus();
    }
}

// Function to move values up and merge
function moveUp() {
    let moved = false;
    for (let j = 0; j < cols; j++) {
        let newCol = [];
        for (let i = 0; i < rows; i++) {
            const value = getValue(i, j);
            if (value !== '') {
                newCol.push(parseInt(value));
            }
        }
        for (let i = 0; i < newCol.length - 1; i++) {
            if (newCol[i] === newCol[i + 1]) {
                newCol[i] *= 2;
                newCol[i + 1] = '';
                moved = true;
            }
        }
        newCol = newCol.filter(value => value !== '');
        while (newCol.length < rows) {
            newCol.push('');
        }
        for (let i = 0; i < rows; i++) {
            if (getValue(i, j) !== newCol[i]) {
                moved = true;
            }
            setValue(i, j, newCol[i]);
        }
    }
    if (moved) {
        generateNewValue();
        checkGameStatus();
    }
}

// Function to move values down and merge
function moveDown() {
    let moved = false;
    for (let j = 0; j < cols; j++) {
        let newCol = [];
        for (let i = 0; i < rows; i++) {
            const value = getValue(i, j);
            if (value !== '') {
                newCol.push(parseInt(value));
            }
        }
        for (let i = newCol.length - 1; i > 0; i--) {
            if (newCol[i] === newCol[i - 1]) {
                newCol[i] *= 2;
                newCol[i - 1] = '';
                moved = true;
            }
        }
        newCol = newCol.filter(value => value !== '');
        while (newCol.length < rows) {
            newCol.unshift('');
        }
        for (let i = 0; i < rows; i++) {
            if (getValue(i, j) !== newCol[i]) {
                moved = true;
            }
            setValue(i, j, newCol[i]);
        }
    }
    if (moved) {
        generateNewValue();
        checkGameStatus();
    }
}

// Function to check if the game is won or lost
function checkGameStatus() {
    let isBlocked = true;
    let sum = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const value = parseInt(getValue(i, j));
            if (value === 2048) {
                alert("C'est gagné!");
                endGame(sum);
                return;
            }
            sum += value;
            if (isEmpty(i, j) ||
                (j < cols - 1 && value === parseInt(getValue(i, j + 1))) ||
                (i < rows - 1 && value === parseInt(getValue(i + 1, j)))) {
                isBlocked = false;
            }
        }
    }

    if (isBlocked) {
        alert("C'est perdu! Score: " + sum);
        endGame(sum);
    }
}

// Function to end the game and propose to restart
function endGame(sum) {
    alert("Score final: " + sum);
    if (confirm("Voulez-vous recommencer le jeu?")) {
        newGame();
    }
}

// Create the table on page load
document.addEventListener('DOMContentLoaded', function() {
    createTable(rows, cols);
    newGame();

    // Add event listener for keydown to move values
    document.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowRight':
                moveRight();
                break;
            case 'ArrowLeft':
                moveLeft();
                break;
            case 'ArrowUp':
                moveUp();
                break;
            case 'ArrowDown':
                moveDown();
                break;
        }
    });
});