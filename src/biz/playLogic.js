import { useContext, useMemo } from "react";
import { AppContext } from "../providers/AppProviderContext";
import { useAiLogic } from "./aiLogic";

export const usePlayLogic = () => {
  const { Game, turnCount, haveWinner, onReset, hasAiOpponent } =
    useContext(AppContext);
  const { algoRandom } = useAiLogic();

  const onPlacePiece = useMemo(
    () => {
      return async (cell) => {
        if (Game.GameBoard.isSpaceOpen(cell)) {
          await Game.turn(cell);
          // if playing against AI then, do AI turn
          if (hasAiOpponent) {
            setTimeout(() => {
              const cellAI = algoRandom({
                boardDimension: Game.GameBoard.boardDimension,
                isSpaceOpen: (cell) => Game.GameBoard.isSpaceOpen(cell)
              });
              Game.turn(cellAI);
            }, 500);
          }
        }
      };
    }, // eslint-disable-next-line
    [hasAiOpponent, haveWinner]
  );

  return {
    boardState: Game.GameBoard.board,
    currentPlayer: Game.currentPlayer,
    onPlacePiece,
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
