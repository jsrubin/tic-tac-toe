import React from "react";
import { usePlayLogic } from "../biz/playLogic";
import GameBoard from "./GameBoard";

const GameView = (props) => {
  const { currentPlayer, isBoardFilled } = usePlayLogic();
  return (
    <div className="App">
      <header className="App-header">
        Tic Tac Toe
        <p>
          <div style={{ fontSize: "1.2rem" }}>
            {isBoardFilled
              ? "Game Over"
              : `Turn: Player ${currentPlayer.name} (${currentPlayer.piece})`}
          </div>
        </p>
        <GameBoard />
      </header>
    </div>
  );
};

export default GameView;
