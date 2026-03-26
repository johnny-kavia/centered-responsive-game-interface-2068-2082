/**
 * Winning line combinations (indices).
 */
const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// PUBLIC_INTERFACE
export function calculateWinner(board) {
  /** Determine winner and winning line for a 3x3 board. */
  for (const [a, b, c] of LINES) {
    const v = board[a];
    if (v && v === board[b] && v === board[c]) {
      return { winner: v, line: [a, b, c] };
    }
  }
  return null;
}

// PUBLIC_INTERFACE
export function isDraw(board, winner) {
  /** True when the board is full and there is no winner. */
  if (winner) return false;
  return board.every((cell) => cell !== null);
}
