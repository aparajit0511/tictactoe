import React, { useState } from "react";
import "./App.css";

export default function TicTacToe() {
  const [turn, setturn] = useState("x");
  const [cells, setcells] = useState(Array(9).fill(""));
  const [Winner, setWinner] = useState("");
  const [Draw, setDraw] = useState(false);

  const checkWinner = (squares) => {
    var combos = {
      horizontal: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      vertical: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      diagonal: [
        [0, 4, 8],
        [6, 4, 2],
      ],
    };

    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === "" ||
          squares[pattern[1]] === "" ||
          squares[pattern[2]] === ""
        ) {
          // do nothing
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
        }
      });
    }

    const checkDraw = (value) => value !== "";
    if (squares.every(checkDraw)) {
      setDraw(true);
    }
  };

  const Cell = ({ nums }) => {
    // console.log(nums);

    return (
      <div onClick={() => onClickHandler(nums)} className="boxStyle">
        <p className="text">{cells[nums]}</p>
      </div>
    );
  };
  const onClickHandler = (nums) => {
    if (cells[nums] !== "") {
      alert("Already clicked");
      return;
    }
    var squares = [...cells];
    console.log("nums", nums);
    // alert(nums);

    if (turn === "x") {
      squares[nums] = "x";
      setturn("o");
    } else {
      squares[nums] = "o";
      setturn("x");
    }
    checkWinner(squares);
    setcells(squares);
    console.log(squares);
  };

  const onRestart = () => {
    setcells(Array(9).fill(""));
    setWinner("");
    setturn("x");
    setDraw(false);
  };
  return (
    <div>
      TicTacToe
      <div className="mainStyle">
        Turn of: {turn}
        <div className="rowStyle">
          <Cell nums={0} />
          <Cell nums={1} />
          <Cell nums={2} />
        </div>
        <div className="rowStyle">
          <Cell nums={3} />
          <Cell nums={4} />
          <Cell nums={5} />
        </div>
        <div className="rowStyle">
          <Cell nums={6} />
          <Cell nums={7} />
          <Cell nums={8} />
        </div>
        {Winner && <h3>The Winner is {Winner}</h3>}
        {Winner && <button onClick={onRestart}>Play again</button>}
        {Draw && <h3>The game is a draw</h3>}
        {Draw && <button onClick={onRestart}>Play again</button>}
      </div>
    </div>
  );
}
