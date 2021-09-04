import { useState, useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      throw new Error();
  }
}

export const useCounter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    turnCount: state.count,
    increment: () => dispatch({ type: "increment" }),
    reset: () => dispatch({ type: "reset" })
  };
};

export const usePlayerState = (players) => {
  const [currentPlayer, setPlayer] = useState(players[0]);

  const nextPlayer = () => {
    return players.find((player) => player.id !== currentPlayer.id);
  };

  return {
    currentPlayer,
    switchPlayer: () => setPlayer(nextPlayer()),
    resetPlayer: () => setPlayer(players[0])
  };
};
