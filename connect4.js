/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  for (let i = 0; i< HEIGHT; i++) {
    let row = []; 
    for (let i = 0; i< WIDTH; i++) {
      row.push(null)
    }
    board.push(row)
  }
  // *DONE* TODO: set "board" to empty HEIGHT x WIDTH matrix array
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // *DONE* TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board');
  // *DONE* TODO: add comment for this code
  //create table row "top" and add the event listener for click, call handleClick f() when clicked
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  //assign a unique id to each "headCell" in the top row and add them to the "top" row
  //then add "top" row to htmlBoard
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // *DONE* TODO: add comment for this code
  //assign a unique id to each cell in the remaining rows
  //then add each row to htmlBoard
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // *DONE* TODO: write the real version of this, rather than always returning 0
  for (let i = 5; i>= 0; i--){
    if (board[i][x] !== null) {
    } else {
      return i
    }
  } return null
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // *DONE* TODO: make a div and insert into correct table cell
  const newPiece = document.createElement('div');
  newPiece.classList.add('piece', `p${currPlayer}`);
  const space = document.querySelector(`[id='${y}-${x}']`);
  space.append(newPiece);
}

/** endGame: announce game end */

function endGame(msg) {
  // *DONE* TODO: pop up alert message
  alert(`${msg}`);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // *DONE* TODO: add line to update in-memory board
  board[y][x] = board[y][x] ? board[y][x] : currPlayer
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // *DONE* TODO: check if all cells in board are filled; if so call, call endGame  
  const exists = val => {return val !== null}
  
  if (board[0].every(exists)) {
      endGame("It's a tie!")
    }
  // switch players
  // *DONE* TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1? 2: 1
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // *DONE* TODO: read and understand this code. Add comments to help you.
  // For each y value up to the HEIGHT, each x value up to the WIDTH is passed in
  // for each resulting y,x pair, the four cells in each direction are collected in
  // four variables: horiz, vert, diagDR, & diagDL
  // each of these is then passed into the _win function and if any of them return a truthy value,
  // then the checkForWin function returns true

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
