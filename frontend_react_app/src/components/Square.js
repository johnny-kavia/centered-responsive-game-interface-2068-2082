import React from "react";

// PUBLIC_INTERFACE
function Square({ value, index, onClick, highlight, disabled }) {
  /** Single board cell. */
  const label = value ? `Square ${index + 1}: ${value}` : `Square ${index + 1}`;

  return (
    <button
      type="button"
      className={["square", highlight ? "square--highlight" : ""].join(" ")}
      onClick={() => onClick(index)}
      disabled={disabled || value !== null}
      aria-label={label}
      aria-pressed={value !== null}
    >
      <span className={["mark", value ? "mark--set" : ""].join(" ")}>
        {value ?? ""}
      </span>
    </button>
  );
}

export default Square;
