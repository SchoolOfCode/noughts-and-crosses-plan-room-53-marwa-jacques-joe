import React, { useState, useEffect } from "react";
import Board from "../Board/board";
import "./game.css";
import { calculateWinner } from "../../Function/calculateWinner";

function Game() {
  //   const [turnNumber, setTurnNumber] = useState(1);
  //   const [playerTurn, setPlayerTurn] = useState(true);
  //   const [turnSymbol, setTurnSymbol] = useState(null);
  //   const [disabled, setDisabled] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(board);
  const [xWinCount, setXWinCount] = useState(0);
  const [oWinCount, setOWinCount] = useState(0);
  const [drawCount, setDrawCount] = useState(0);

  useEffect(() => {
    if (winner === "X") {
      let newWinCountX = xWinCount;
      setXWinCount(newWinCountX + 1);
      return;
    }
    if (winner === "O") {
      let newWinCountO = oWinCount;
      setOWinCount(newWinCountO + 1);
      return;
    }

    if (!board.includes(null)) {
      let newDrawCount = drawCount + 1;
      setDrawCount(newDrawCount);
    }
  }, [board, winner]);

  //   function getTurn(value) {
  //     return value % 2 === 0 ? "O" : "X";
  //   }

  //   function handleClick() {
  //     let newTurnNumber = turnNumber;
  //     setTurnNumber(newTurnNumber + 1);
  //     console.log("this is turn", turnNumber);
  //     setPlayerTurn(!playerTurn);
  //     let newTurnSymbol = getTurn(turnNumber);
  //     setTurnSymbol(newTurnSymbol);
  //     setDisabled(true);
  //     console.log("clicked");
  //   }

  function handleClick(i) {
    const boardCopy = [...board];

    // If user click an occupied square or if game is won, return
    if (winner || boardCopy[i]) {
      return;
    }
    // Put an X or an O in the clicked square
    boardCopy[i] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXisNext(!xIsNext);
  }

  function restart() {
    setBoard(Array(9).fill(null));
    setXisNext(true);
  }

  function resetScores() {
    setOWinCount(0);
    setXWinCount(0);
  }

  return (
    <div className="game">
      {/* Game div */}
      <h1>Tic-Tac-Toe</h1>
      <Board squares={board} onClick={handleClick} restart={restart} />
      <div>
        {/* Results Div */}
        <p>
          {winner
            ? "Winner: " + winner
            : !board.includes(null)
            ? "It's a draw!"
            : "It is Player " + (xIsNext ? "X" : "O") + "'s turn!"}
        </p>
      </div>
      {/* End of results div */}

      <button onClick={restart}>Clear board</button>
      <h2>Scores</h2>
      <p>Player X has won {xWinCount} times!</p>
      <p>Player O has won {oWinCount} times!</p>
      <p>There has been {drawCount} draw(s)!</p>
      <button onClick={resetScores}>Reset scores</button>
      {/* End of game div */}
    </div>
  );
}

export default Game;
