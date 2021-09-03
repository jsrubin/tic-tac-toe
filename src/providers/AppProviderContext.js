import React, { useState, useMemo } from "react";
import Board from "../class/Board";
import config from "../config/default.json";

export const AppContext = React.createContext({});

const AppContextProvider = (props) => {
  const { children } = props;

  const { boardDimension, players, winStates } = config;

  const GameBoard = useMemo(() => {
    return new Board();
  }, []);

  const [turnCount, onTurnCount] = useState(0);
  const [hasStarted, onStart] = useState(false);
  const [currentPlayer, setPlayer] = useState(players[0]);
  const [boardState, setBoardState] = useState(GameBoard.board);
  const [haveWinner, onWinner] = useState(false);

  const totalTurns = boardDimension[0] * boardDimension[1];

  const contextProps = {
    hasStarted,
    onStart,
    currentPlayer,
    setPlayer,
    players,
    boardState,
    setBoardState,
    turnCount,
    onTurnCount,
    totalTurns,
    GameBoard,
    winStates,
    haveWinner,
    onWinner
  };

  return (
    <AppContext.Provider value={contextProps}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
