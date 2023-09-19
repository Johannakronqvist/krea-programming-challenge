//INPUT Draw numbers: Array
//INPUT Boards: string of numbers with rows and empty rows between boards

//OUTPUT: number (final score of last winning board)

//PRE GAME:
/**
 * create boards
 */

//GAME STEPS to reach last board:
/**
 * 1. draw a number
 * 2. fill in the number on each board that has it
 * repeat until a full row or column is found. If more than one board is still in the game, remove that board from the game.
 */

//POST GAME:
/**
 * calculate final score of the remaining boards
 */

/**
 * Game{ board: [ row { num: {isMarked: boolean}}] }
 * option 2
 * Game{ board: [ row { num: boolean}] }
 *
 * check marked numbers.
 * {
 *  [ {1: {isMarked: false}, 2: {isMarked: false}, 3: {isMarked: true}, 4: {isMarked: false},
 *     5: {isMarked:   false},},
 *    {1: {isMarked: false}, 2: {isMarked: false}, 3: {isMarked: true}, 4: {isMarked: true},
 *     5: {isMarked:   false},},
 *    {1: {isMarked: false}, 2: {isMarked: false}, 3: {isMarked: true}, 4: {isMarked: false},
 *     5: {isMarked:   false},},
 *    {1: {isMarked: false}, 2: {isMarked: false}, 3: {isMarked: true}, 4: {isMarked: false},
 *     5: {isMarked:   false},},
 *    {1: {isMarked: true}, 2: {isMarked: false}, 3: {isMarked: true}, 4: {isMarked: false},
 *     5: {isMarked:   false},},
 * }
 *
 */
