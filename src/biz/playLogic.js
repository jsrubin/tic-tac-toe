import { useContext, useEffect } from "react";
import { AppContext } from "../providers/AppProviderContext";

const gameFlowLogicInit = ({
  haveWinner,
  findWinner,
  onWinner,
  currentPlayer,
  turnCount,
  totalTurns,
  GameBoard,
  switchPlayer
}) => {
  return () => {
    // if for win then end game
    const winStateFound = findWinner({ turnCount, GameBoard });
    if (winStateFound) {
      return onWinner({ winner: currentPlayer.name, winState: winStateFound });
    }
    // else is last move then end game tie
    if (turnCount === totalTurns && !haveWinner) {
      return onWinner({ winner: "tie" });
    }
    // else switch player
    switchPlayer();
  };
};

const findWinner = ({ turnCount, GameBoard }) => {
  if (turnCount >= 5) {
    return GameBoard.hasWinner();
  }
  return "";
};

const onPlacePiece = ({ GameBoard, currentPlayer, increment }) => {
  return (cell) => {
    if (GameBoard.isSpaceOpen(cell)) {
      GameBoard.update(cell, currentPlayer.piece);
      increment();
    }
  };
};

export const usePlayLogic = () => {
  const {
    currentPlayer,
    switchPlayer,
    resetPlayer,
    turnCount,
    resetCount,
    increment,
    totalTurns,
    GameBoard,
    haveWinner,
    onWinner,
    players
  } = useContext(AppContext);

  const gameLogic = gameFlowLogicInit({
    haveWinner,
    findWinner,
    onWinner,
    currentPlayer,
    turnCount,
    totalTurns,
    GameBoard,
    switchPlayer
  });

  const onReset = () => {
    resetCount();
    resetPlayer();
    GameBoard.reset();
    onWinner(false);
  };

  useEffect(
    () => {
      if (turnCount > 0) {
        gameLogic();
      }
    }, // eslint-disable-next-line
    [turnCount]
  );

  return {
    boardState: GameBoard.board,
    currentPlayer,
    onPlacePiece: onPlacePiece({
      GameBoard,
      currentPlayer,
      increment
    }),
    isBoardFilled: GameBoard.isBoardFilled(),
    onReset,
    haveWinner,
    turnCount,
    totalTurns,
    players
  };
};
