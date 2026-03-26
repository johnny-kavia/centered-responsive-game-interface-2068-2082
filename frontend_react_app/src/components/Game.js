import React, { useMemo, useState } from "react";
import Board from "./Board";
import { calculateWinner, isDraw } from "../utils/gameLogic";

const PLAYER_X = "X";
const PLAYER_O = "O";

function getOtherPlayer(player) {
  return player === PLAYER_X ? PLAYER_O : PLAYER_X;
}

// PUBLIC_INTERFACE
function Game() {
  /** Dark Tic Tac Toe game container: owns game state, status, and controls. */
  const [board, setBoard] = useState(() => Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_X);
  const [xStartsNext, setXStartsNext] = useState(true);
  const [score, setScore] = useState(() => ({ X: 0, O: 0, draws: 0 }));

  const winnerInfo = useMemo(() => calculateWinner(board), [board]);
  const winner = winnerInfo?.winner ?? null;
  const winningLine = winnerInfo?.line ?? null;

  const draw = useMemo(() => isDraw(board, winner), [board, winner]);
  const gameOver = Boolean(winner) || draw;

  const status = useMemo(() => {
    if (winner) return `Winner: ${winner}`;
    if (draw) return "Draw";
    return `Turn: ${currentPlayer}`;
  }, [winner, draw, currentPlayer]);

  function handleSquareClick(index) {
    // Ignore moves when game is over or cell already taken.
    if (gameOver || board[index] !== null) return;

    setBoard((prev) => {
      const next = [...prev];
      next[index] = currentPlayer;
      return next;
    });

    setCurrentPlayer((prev) => getOtherPlayer(prev));
  }

  function restartRound() {
    // If the round ended, update score based on last outcome, then reset board.
    if (winner) {
      setScore((s) => ({ ...s, [winner]: s[winner] + 1 }));
    } else if (draw) {
      setScore((s) => ({ ...s, draws: s.draws + 1 }));
    }

    const nextStartsX = !xStartsNext;
    setXStartsNext(nextStartsX);
    setBoard(Array(9).fill(null));
    setCurrentPlayer(nextStartsX ? PLAYER_X : PLAYER_O);
  }

  function newGame() {
    // Hard reset: clear scores and start with X.
    setScore({ X: 0, O: 0, draws: 0 });
    setXStartsNext(true);
    setBoard(Array(9).fill(null));
    setCurrentPlayer(PLAYER_X);
  }

  return (
    <main className="page">
      <header className="header">
        <div className="titleRow">
          <h1 className="title">Dark Tic Tac Toe</h1>
          <span className="badge">Local 2‑Player</span>
        </div>

        <p className="subtitle">
          Play on the same device. First to align three wins.
        </p>
      </header>

      <section className="card">
        <div className="statusRow" aria-live="polite">
          <div
            className={[
              "statusPill",
              winner ? "statusPill--win" : "",
              draw ? "statusPill--draw" : "",
            ].join(" ")}
          >
            <span className="statusLabel">{status}</span>
          </div>

          <div className="scoreboard" aria-label="Scoreboard">
            <div className="scoreItem">
              <span className="scoreKey">X</span>
              <span className="scoreVal">{score.X}</span>
            </div>
            <div className="scoreItem">
              <span className="scoreKey">O</span>
              <span className="scoreVal">{score.O}</span>
            </div>
            <div className="scoreItem scoreItem--draws">
              <span className="scoreKey">Draws</span>
              <span className="scoreVal">{score.draws}</span>
            </div>
          </div>
        </div>

        <div className="boardWrap">
          <Board
            board={board}
            onSquareClick={handleSquareClick}
            winningLine={winningLine}
            disabled={gameOver}
          />
        </div>

        <div className="controls">
          <button
            type="button"
            className="btn btnPrimary"
            onClick={restartRound}
          >
            {gameOver ? "Next Round" : "Restart Round"}
          </button>

          <button type="button" className="btn btnGhost" onClick={newGame}>
            New Game
          </button>
        </div>

        <div className="hintRow" role="note">
          <span className="hintDot" aria-hidden="true" />
          <span className="hintText">
            Tip: Use Tab/Enter to play with keyboard.
          </span>
        </div>
      </section>

      <footer className="footer">
        <span className="footerText">
          Minimal dark UI • Accent colors:{" "}
          <span className="swatch swatch--primary" aria-label="Primary" />
          <span className="swatch swatch--secondary" aria-label="Secondary" />
          <span className="swatch swatch--success" aria-label="Success" />
          <span className="swatch swatch--error" aria-label="Error" />
        </span>
      </footer>
    </main>
  );
}

export default Game;
