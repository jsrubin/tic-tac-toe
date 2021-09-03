import React from "react";
import { usePlayLogic } from "../biz/playLogic";
import Modal from "../components/Modal";
import GameBoard from "../components/Board";

const GameBoardContainer = () => {
  const { haveWinner, onReset } = usePlayLogic();

  return (
    <div>
      <GameBoard />
      <Modal
        title="GAME OVER"
        visible={haveWinner ? true : false}
        onClose={onReset}
        buttonText="REPLAY"
      >
        {haveWinner && haveWinner.winner !== "tie"
          ? `Player ${haveWinner.winner} Wins!`
          : "TIE!"}
      </Modal>
    </div>
  );
};

export default GameBoardContainer;
