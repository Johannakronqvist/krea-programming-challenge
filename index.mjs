import { drawNumbersInput, boardsInput } from './input.mjs';

let boardData = boardsInput;
boardData = boardData
  .split('\n')
  .map((line) => line.trim()) // Trim each line
  .filter((line) => line !== '') // Remove empty lines
  .join(' ')
  .split(' ')
  .filter((item) => item !== ''); // Remove empty strings

const boardLength = 25;
let boards = [];
let boardsToRemove = [];

//Create inital boards
for (let i = 0; i < boardData.length; i += boardLength) {
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
const drawNumbers = [...drawNumbersInput];
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
            return;
          }
        } else {
          findChecked = 0;
          break;
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
          }
        } else {
          findChecked = 0;
        }
      }
    }
  });
};

const markNumbers = () => {
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
  findRow();
  findColumn();
};

const removeBingoBoards = () => {
  boards = boards.filter((board, idx) => !boardsToRemove.includes(idx));

  boardsToRemove = [];
};

let i = 0;

while (i < drawNumbers.length) {
  currentDrawNumber = drawNumbers[i];

  markNumbers();
  checkForBingo();
  if (boards.length === 1) {
    break;
  } else if (boards.length > 1) {
    removeBingoBoards();
  }

  i++;
}

const calculateBoardScore = (board) => {
  let sumOfUnmarked = 0;
  board.forEach((obj) => {
    if (!Object.values(obj)[0]) {
      sumOfUnmarked += parseInt(Object.keys(obj)[0]);
    }
  });

  const score = sumOfUnmarked * currentDrawNumber;
  console.log('Score for final board', score);
};

calculateBoardScore(boards[0]);
