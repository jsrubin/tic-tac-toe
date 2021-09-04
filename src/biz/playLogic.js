import { useContext, useEffect } from "react";
import { AppContext } from "../providers/AppProviderContext";

const gameFlowLogicInit = ({
  boardState,
  haveWinner,
  findWinner,
  onWinner,
  currentPlayer,
  turnCount,
  totalTurns,
  winStates,
  switchPlayer
}) => {
  return () => {
    // if for win then end game
    const winStateFound = findWinner({ turnCount, winStates, boardState });
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

const findWinner = ({ turnCount, winStates, boardState }) => {
  if (turnCount >= 5) {
    return winStates.find((winCondition) => {
      const pieceValue =
        boardState[winCondition[0][0]][winCondition[0][1]].value;
      const compare1 = boardState[winCondition[1][0]][winCondition[1][1]].value;
      const compare2 = boardState[winCondition[2][0]][winCondition[2][1]].value;
      if (pieceValue && pieceValue === compare1 && pieceValue === compare2) {
        return true;
      }
      return false;
    });
  }
  return "";
};

const onPlacePiece = ({
  GameBoard,
  boardState,
  setBoardState,
  currentPlayer,
  increment
}) => {
  return (cell) => {
    if (GameBoard.isSpaceOpen(cell)) {
      const dim = cell.split(",").map((val) => parseInt(val));
      boardState[dim[0]][dim[1]].value = currentPlayer.piece;
      setBoardState(boardState);
      increment();
    }
  };
};

export const usePlayLogic = () => {
  const {
    currentPlayer,
    switchPlayer,
    resetPlayer,
    boardState,
    setBoardState,
    turnCount,
    resetCount,
    increment,
    totalTurns,
    GameBoard,
    winStates,
    haveWinner,
    onWinner
  } = useContext(AppContext);

  const gameLogic = gameFlowLogicInit({
    boardState,
    haveWinner,
    findWinner,
    onWinner,
    currentPlayer,
    turnCount,
    totalTurns,
    winStates,
    switchPlayer
  });

  const onReset = () => {
    resetCount();
    resetPlayer();
    GameBoard.reset();
    // setBoardState(GameBoard.board);
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
    currentPlayer,
    boardState,
    onPlacePiece: onPlacePiece({
      GameBoard,
      boardState,
      setBoardState,
      currentPlayer,
      increment
    }),
    isBoardFilled: GameBoard.isBoardFilled(),
    onReset,
    haveWinner
  };
};
