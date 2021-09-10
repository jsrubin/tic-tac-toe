import React, { useContext, useMemo } from "react";
import { usePlayLogic } from "../biz/playLogic";
// import { useAiLogic } from "../biz/aiLogic";
import Modal from "../components/Modal";
import GameBoard from "../components/Board";
import Piece from "../components/Piece";
import { AppContext } from "../providers/AppProviderContext";

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
  const { draggableEnabled } = useContext(AppContext);
  const {
    haveWinner,
    winner,
    onReset,
    turnCount,
    totalTurns,
    players,
    boardState,
    onPlacePiece,
    currentPlayer,
    winState
  } = usePlayLogic();

  // useAiLogic();

  const nextPieces = useMemo(
    () => {
      if (draggableEnabled) {
        return buildGamePieces({ totalTurns, players, turnCount });
      }
      return;
    }, // eslint-disable-next-line
    [turnCount]
  );

  const boardProps = {
    boardState,
    onClick: onPlacePiece,
    currentPlayer,
    turnCount,
    ended: haveWinner,
    highlightCols: winState
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        {draggableEnabled ? (
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
        ) : null}
        <GameBoard {...boardProps} />
      </div>
      <Modal
        title="GAME OVER"
        visible={haveWinner ? true : false}
        onClose={onReset}
        buttonText="REPLAY"
      >
        {haveWinner && winner !== "tie" ? `Player ${winner} Wins!` : "TIE!"}
      </Modal>
    </div>
  );
};

export default GameBoardContainer;
