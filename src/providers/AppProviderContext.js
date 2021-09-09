import React, { useState, useMemo } from "react";
import Board from "../class/Board";
import TicTacToe from "../class/TicTacToe";
import Player from "../class/Player";
import { useCounter } from "../helpers/hooks";
import config from "../config/default.json";

export const AppContext = React.createContext({});

const addPlayer = (player) => {
  return new Player({ user: player, ...player });
};

const setupPlayers = (players) => {
  return players.map((player) => addPlayer(player));
};

const AppContextProvider = (props) => {
  const { children } = props;

  const { boardDimension, players, winStates, draggableEnabled } = config;
  const playerList = setupPlayers(players);

  const { count: turnCount, increment: incrementTurn, reset } = useCounter();
  const { count, increment } = useCounter();

  const [hasStarted, onStart] = useState(false);
  const [haveWinner, onWinner] = useState(false);

  const Game = useMemo(
    () => {
      const board = new Board({ boardDimension });
      return new TicTacToe({
        players: playerList,
        GameBoard: board,
        incrementTurn,
        onWinner
      });
    }, // eslint-disable-next-line
    [count]
  );

  const onReset = () => {
    onWinner(false);
    increment();
    reset();
  };

  const contextProps = {
    hasStarted,
    onStart,
    Game,
    turnCount,
    winStates,
    haveWinner,
    draggableEnabled,
    onReset
  };

  return (
    <AppContext.Provider value={contextProps}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
