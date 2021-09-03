import React from "react";
import Button from "../common/Button";
import { useStartLogic } from "../biz/startLogic";
import { usePlayLogic } from "../biz/playLogic";
import GameBoard from "./GameBoard";

const GameView = props => {
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

const Welcome = props => {
  return (
    <div className="App">
      <header className="App-header">
        Tic Tac Toe
        <p></p>
        <Button
          onClick={props.onClick}
          label="START"
          styles={{
            width: "100px",
            height: "40px",
            borderRadius: "8px",
            backgroundColor: "#78f89f"
          }}
        />
      </header>
    </div>
  );
};

const TitleView = () => {
  const { hasStarted, onClick } = useStartLogic();
  if (hasStarted) {
    return <GameView />;
  }
  return <Welcome onClick={onClick} />;
};

export default TitleView;
