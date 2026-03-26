import React from "react";
import Square from "./Square";

// PUBLIC_INTERFACE
function Board({ board, onSquareClick, winningLine, disabled }) {
  /** Tic Tac Toe board UI (3x3). */
  const winningSet = new Set(winningLine ?? []);

  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {board.map((value, idx) => (
        <Square
          key={idx}
          value={value}
          index={idx}
          onClick={onSquareClick}
          highlight={winningSet.has(idx)}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

export default Board;
