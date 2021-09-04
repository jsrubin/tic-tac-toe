import React, { useState, useMemo } from "react";
import Board from "../class/Board";
import Player, { PlayerMoves } from "../class/Player";
import { useCounter, usePlayerState } from "../helpers/hooks";
import config from "../config/default.json";

export const AppContext = React.createContext({});

const addPlayer = (player) => {
  const p = new Player(player);
  return new PlayerMoves(p);
};

const setupPlayers = (players) => {
  return players.map((player) => addPlayer(player));
};

const AppContextProvider = (props) => {
  const { children } = props;

  const { boardDimension, players, winStates } = config;
  const playerList = setupPlayers(players);

  const GameBoard = useMemo(() => {
    return new Board();
  }, []);

  const { turnCount, increment, reset } = useCounter();
  const { currentPlayer, switchPlayer, resetPlayer } =
    usePlayerState(playerList);

  const [hasStarted, onStart] = useState(false);
  const [boardState, setBoardState] = useState(GameBoard.board);
  const [haveWinner, onWinner] = useState(false);

  const totalTurns = boardDimension[0] * boardDimension[1];

  const contextProps = {
    hasStarted,
    onStart,
    currentPlayer,
    switchPlayer,
    resetPlayer,
    players: playerList,
    boardState,
    setBoardState,
    turnCount,
    resetCount: reset,
    increment,
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
