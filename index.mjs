import { testDrawNumber, testBoards } from './input.mjs';

//Game[ board: [ { num: boolean}] ]

//Remove spaces and empty lines form boarddata
let boardData = testBoards;
boardData = boardData
  .replaceAll('  ', ' ')
  .split('\n')
  .filter((line) => line.trim() !== '')
  .join(' ')
  .split(' ');

const boardLength = 25;
const boards = [];

//Create inital boards
for (let i = 0; i < boardData.length; i += boardLength) {
  //create board
  let board = [];
  let currentIndex = i;

  while (board.length < boardLength) {
    //console.log('currentIndex', currentIndex);
    let currentNum = boardData[currentIndex];
    board.push({ [currentNum]: false });
    currentIndex += 1;
  }

  boards.push(board);
}

//GAME
//Draw numbers
const drawNumbers = [...testDrawNumber];
let currentDrawNumber = null;

const findRow = (idx) => {
  let findChecked = 0;
  const board = boards[idx];
  let i = 0;

  while (findChecked < 5) {
    if (Object.keys(board[i])) {
      findChecked += 1;
    } else {
      findChecked = 0;
    }

    if (i === board.length) break;
  }

  if (findChecked === 5) return true;
};

//Check for bingo
let bingo = false;
const checkForBingo = (idx) => {
  if (findRow(idx)) {
    boards.splice(idx, 1);
    bingo = true;
  }
};

drawNumbers.forEach((num) => {
  currentDrawNumber = num;

  while (!bingo) {
    //Set all numbers to true if they are they are drawn
    boards.forEach((board, idx) => {
      board.forEach((obj) => {
        const boardNum = parseInt(Object.keys(obj));

        if (boardNum === currentDrawNumber) {
          obj[boardNum] = true;
          checkForBingo(idx);
        }
      });
    });
  }
});

//INPUT Draw numbers: Array
//INPUT Boards: string of numbers with rows and empty rows between boards

//OUTPUT: number (final score of last winning board)

//PRE GAME:
/**
 * create boards
 */

//GAME STEPS to reach last board:
/**
 * pre-step(if a row or column is full (and there is more than 1 board left) remove from game)
 * 1. draw a number
 * 2. fill in the number on each board that has it
 * repeat until a full row or column is found. If more than one board is still in the game, remove that board from the game.
 */

//POST GAME:
/**
 * calculate final score of the remaining boards
 */

// Game[board[ row { num: {isMarked: boolean}}]]
// option 2
// Game[ board: [ row { num: boolean}] ]

// [
//   [
//     {1: true},
//     {2: false},
//     {6: false},
//     {8: false},
//     {10: false},
//     {1: true},
//     {2: false},
//     {6: false},
//     {8: false},
//     {10: false},
//     ...
//   ],
//   [
//     {1: true},
//     {2: false},
//     {6: false},
//     {8: false},
//     {10: false},
//     {1: true},
//     {2: false},
//     {6: false},
//     {8: false},
//     {10: false},
//     ...
//   ],
// ];
