import React from "react";
import { usePlayLogic } from "../biz/playLogic";
import Modal from "../components/Modal";
import GameBoard from "../components/Board";
import Piece from "../components/Piece";

const GameBoardContainer = () => {
  const { haveWinner, onReset, currentPlayer } = usePlayLogic();

  return (
    <div>
      {/* <Piece piece={currentPlayer.piece} draggable={true} /> */}
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
