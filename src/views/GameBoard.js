import React, { useMemo } from "react";
import { usePlayLogic } from "../biz/playLogic";
import Modal from "../components/Modal";
import GameBoard from "../components/Board";
import Piece from "../components/Piece";

const buildGamePieces = ({ totalTurns, players, turnCount }) => {
  return Array(totalTurns)
    .fill(0)
    .map((b, i) => {
      return (
        <Piece
          key={`next-piece-${i}`}
          turnCount={i + 1}
          piece={players[i % 2].piece}
          draggable={true}
          visible={i === turnCount ? true : false}
        />
      );
    });
};

const GameBoardContainer = () => {
  const { haveWinner, onReset, turnCount, totalTurns, players } =
    usePlayLogic();

  const nextPieces = useMemo(
    () => {
      return buildGamePieces({ totalTurns, players, turnCount });
    }, // eslint-disable-next-line
    [turnCount]
  );

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          NEXT PIECE
          {nextPieces}
        </div>
        <GameBoard />
      </div>
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
