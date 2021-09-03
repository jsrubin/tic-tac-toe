import { useContext, useEffect } from "react";
import { AppContext } from "../providers/AppProviderContext";

const gameLogicInit = ({
  boardState,
  haveWinner,
  findWinner,
  onWinner,
  currentPlayer,
  turnCount,
  totalTurns,
  winStates,
  onSwitchPlayer
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
    onSwitchPlayer();
  };
};

export const usePlayLogic = () => {
  const {
    currentPlayer,
    setPlayer,
    players,
    boardState,
    setBoardState,
    turnCount,
    onTurnCount,
    totalTurns,
    gameBoard,
    winStates,
    haveWinner,
    onWinner
  } = useContext(AppContext);

  const findWinner = ({ turnCount, winStates, boardState }) => {
    if (turnCount >= 5) {
      return winStates.find(winCondition => {
        const pieceValue =
          boardState[winCondition[0][0]][winCondition[0][1]].value;
        const compare1 =
          boardState[winCondition[1][0]][winCondition[1][1]].value;
        const compare2 =
          boardState[winCondition[2][0]][winCondition[2][1]].value;
        if (pieceValue && pieceValue === compare1 && pieceValue === compare2) {
          console.log(`WINNER: ${pieceValue} = ${compare1} = ${compare2}`);
          return true;
        }
      });
    }
    return "";
  };

  const incrementTurn = () => {
    onTurnCount(turnCount + 1);
    console.log("turn: ", turnCount + 1);
  };

  const onSwitchPlayer = () => {
    setPlayer(currentPlayer.id === 0 ? players[1] : players[0]);
  };

  const isSpaceOpen = (cell, boardState) => {
    const dim = cell.split(",").map(val => parseInt(val));
    return !boardState[dim[0]][dim[1]].value ? true : false;
  };

  // check for no more open spaces, ie. tie, and end game
  const isBoardFilled = ({ boardState }) => {
    if (turnCount < totalTurns) {
      return false;
    }
    return boardState.reduce((acc, row) => {
      if (row.find(col => !col.value)) {
        acc = false;
      }
      return acc;
    }, true);
  };

  const place = ({ cell, boardState, value }) => {
    if (isSpaceOpen(cell, boardState)) {
      const dim = cell.split(",").map(val => parseInt(val));
      boardState[dim[0]][dim[1]].value = value;
      setBoardState(boardState);
      incrementTurn();
    }
  };

  const onPlacePiece = cell => {
    place({ cell, boardState, value: currentPlayer.piece });
  };

  const gameLogic = gameLogicInit({
    boardState,
    haveWinner,
    isSpaceOpen,
    place,
    findWinner,
    onWinner,
    currentPlayer,
    turnCount,
    totalTurns,
    winStates,
    onSwitchPlayer
  });

  const onReset = () => {
    onTurnCount(0);
    setPlayer(players[0]);
    setBoardState(gameBoard);
    onWinner(false);
  };

  useEffect(() => {
    if (turnCount > 0) {
      gameLogic();
    }
  }, [turnCount]);

  return {
    currentPlayer,
    boardState,
    onPlacePiece,
    isBoardFilled,
    onPlacePiece,
    isBoardFilled: isBoardFilled({ boardState }),
    onReset,
    haveWinner
  };
};
