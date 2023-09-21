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
let boards = [];
let boardsToRemove = [];
let bingo = false;

//Create inital boards
for (let i = 0; i < boardData.length; i += boardLength) {
  //create board
  let board = [];
  let currentIndex = i;

  while (board.length < boardLength) {
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

const findRow = () => {
  boards.forEach((board, idx) => {
    let findChecked = 0;

    for (let i = 0; i < board.length; i += 5) {
      findChecked = 0;

      for (let j = 0; j < 5; j++) {
        if (Object.values(board[i + j])[0]) {
          findChecked += 1;
          if (findChecked === 5) {
            boardsToRemove.push(idx);
            bingo = true;
          }
        } else {
          findChecked = 0;
        }
      }
    }
  });
};

const findColumn = () => {
  boards.forEach((board, idx) => {
    let findChecked = 0;

    for (let i = 0; i < 5; i++) {
      findChecked = 0;

      for (let j = 0; j < 25; j += 5) {
        if (Object.values(board[i + j])[0]) {
          findChecked += 1;
          if (findChecked === 5) {
            boardsToRemove.push(idx);
            bingo = true;
          }
        } else {
          findChecked = 0;
        }
      }
    }
  });
};

const markNumbers = (currentDrawNumber) => {
  console.log('in markNumbers');
  //Set all numbers to true if they are they are drawn
  boards.forEach((board) => {
    board.forEach((obj) => {
      const boardNum = parseInt(Object.keys(obj)[0]);

      if (boardNum === currentDrawNumber) {
        obj[boardNum] = true;
      }
    });
  });
};

const checkForBingo = () => {
  console.log('in checkForBingo');

  findRow();
  findColumn();
};

const removeBingoBoards = () => {
  console.log('in removeBingoBoard');
  boards = boards.filter((board, idx) => !boardsToRemove.includes(idx));
  boardsToRemove = [];
};

let i = 0;

while (true) {
  currentDrawNumber = drawNumbers[i];
  console.log(boards);

  markNumbers(currentDrawNumber);
  checkForBingo();
  if (boards.length > 1) {
    removeBingoBoards();
  } else if (bingo) {
    break;
  }

  i++;
}

const calculateBoardScore = (board) => {
  //get sum of remaining numbers and multiply wit last drawn number
  console.log('board in calculate score', board);
  let sumOfUnmarked = 0;
  board.forEach((obj) => {
    console.log('sumOfUnmarked', sumOfUnmarked);
    if (!Object.values(obj)[0]) {
      console.log('IN IF STATEMENT');
      sumOfUnmarked += parseInt(Object.keys(obj)[0]);
    }
  });

  console.log('currentDrawNumber', currentDrawNumber);
  const score = sumOfUnmarked * currentDrawNumber;
  console.log('SCORE', score);
};

calculateBoardScore(boards[0]);

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
