import { useContext } from "react";
import { AppContext } from "../providers/AppProviderContext";

const onPlacePiece = ({ Game }) => {
  return (cell) => {
    Game.turn(cell);
  };
};

export const usePlayLogic = () => {
  const { Game, turnCount, haveWinner, onReset } = useContext(AppContext);

  return {
    boardState: Game.GameBoard.board,
    currentPlayer: Game.currentPlayer,
    onPlacePiece: onPlacePiece({
      Game
    }),
    isBoardFilled: Game.GameBoard.isBoardFilled(),
    onReset,
    haveWinner,
    winState: Game.winState,
    winner: Game.winner,
    turnCount,
    totalTurns: Game.GameBoard.totalTurns,
    players: Game.players,
    name: Game.name
  };
};
