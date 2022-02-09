import React, { useState } from "react";
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
    console.log("a click has happened");
    // If user click an occupied square or if game is won, return
    if (winner || boardCopy[i]) {
      console.log("this will only show up on a clicked square");
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

  return (
    <div className="game">
      {" "}
      {/* Game div */}
      <h1>Tic-Tac-Toe</h1>
      <Board squares={board} onClick={handleClick} restart={restart} />
      <div>
        {" "}
        {/* Results Div */}
        <p>
          {winner
            ? "Winner: " + winner
            : "Next Player: " + (xIsNext ? "X" : "O")}
        </p>
      </div>{" "}
      {/* End of results div */}
      {/* End of game div */}
      <button onClick={restart}>Restart</button>
      <h2>Scores</h2>
      <p>X has won {xWinCount} times</p>
      <p>O has won {oWinCount} times</p>
    </div>
  );
}

export default Game;
