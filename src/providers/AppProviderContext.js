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

const addPlayers = (players) => {
  return players.map((player) => addPlayer(player));
};

const AppContextProvider = (props) => {
  const { children } = props;

  const {
    boardDimension,
    winStates,
    players: playerConfig,
    draggableEnabled
  } = config;

  const {
    count: turnCount,
    increment: incrementTurn,
    reset: resetTurn
  } = useCounter();
  const { count: gameCount, increment: incrementGame } = useCounter(1);

  const [hasStarted, onStart] = useState(false);
  const [haveWinner, onWinner] = useState(false);
  const [aiOpponent, onPlayAi] = useState(false);

  const hasAiOpponent = aiOpponent ? true : false;
  const players = useMemo(
    () => {
      if (hasAiOpponent) {
        playerConfig[1].name = "AI";
        return addPlayers(playerConfig);
      }
      return addPlayers(playerConfig);
    }, // eslint-disable-next-line
    [hasAiOpponent]
  );

  const getWinStates = ({ boardDimension, winStates }) => {
    return winStates;
  };

  const Game = useMemo(
    () => {
      if (hasStarted) {
        const initWinStates = getWinStates({ boardDimension, winStates });
        const board = new Board({ boardDimension, winStates: initWinStates });
        return new TicTacToe({
          players,
          GameBoard: board,
          incrementTurn,
          onWinner
        });
      }
    }, // eslint-disable-next-line
    [hasStarted, gameCount, hasAiOpponent]
  );

  const onReset = () => {
    onWinner(false);
    incrementGame();
    resetTurn();
  };

  const contextProps = {
    hasStarted,
    onStart,
    Game,
    players,
    turnCount,
    haveWinner,
    draggableEnabled,
    onReset,
    hasAiOpponent,
    aiOpponent,
    onPlayAi,
    boardDimension
  };

  return (
    <AppContext.Provider value={contextProps}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
