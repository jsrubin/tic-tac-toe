import { useContext, useMemo } from "react";
import { AppContext } from "../providers/AppProviderContext";
import { useAiLogic } from "./aiLogic";

const findOpponentPiece = ({ players, currentPlayer }) => {
  return players.reduce((acc, player) => {
    if (player.id !== currentPlayer.id) {
      acc = player.piece;
    }
    return acc;
  }, "");
};

const moveAI = ({
  algoDefensive,
  Game,
  findOpponentPiece,
  players,
  turnCount
}) => {
  return algoDefensive({
    board: Game.GameBoard.board,
    winConditions: Game.GameBoard.winConditions,
    oppoenentPiece: findOpponentPiece({
      players,
      currentPlayer: Game.currentPlayer
    }),
    boardDimension: Game.GameBoard.boardDimension,
    isSpaceOpen: (cell) => Game.GameBoard.isSpaceOpen(cell),
    turnCount
  });
};

export const usePlayLogic = () => {
  const {
    Game,
    turnCount,
    haveWinner,
    onReset,
    hasAiOpponent,
    players,
    boardDimension
  } = useContext(AppContext);
  const { algoDefensive } = useAiLogic();

  const onPlacePiece = useMemo(
    () => {
      return async (cell) => {
        if (Game.GameBoard.isSpaceOpen(cell)) {
          await Game.turn(cell);
          // if playing against AI then, do AI turn
          if (hasAiOpponent) {
            setTimeout(() => {
              const aiCell = moveAI({
                algoDefensive,
                Game,
                findOpponentPiece,
                players,
                turnCount
              });
              Game.turn(aiCell);
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
    name: `${Game.name} ${boardDimension[0]}x${boardDimension[1]}`
  };
};
