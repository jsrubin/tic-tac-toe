import React, { useState, useMemo } from "react";

export const AppContext = React.createContext({});

const boardDimension = [3, 3];
const players = [
  {
    id: 0,
    name: "1",
    piece: "X"
  },
  {
    id: 1,
    name: "2",
    piece: "O"
  }
];

const winStatesV = [
  [
    [0, 0],
    [1, 1],
    [2, 0]
  ],
  [
    [0, 0],
    [1, 1],
    [0, 2]
  ],
  [
    [0, 1],
    [1, 0],
    [2, 1]
  ],
  [
    [0, 1],
    [1, 0],
    [1, 2]
  ]
];
const winStates = [
  [
    [0, 0],
    [0, 1],
    [0, 2]
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2]
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2]
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0]
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1]
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2]
  ],
  [
    [0, 0],
    [1, 1],
    [2, 2]
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0]
  ]
];

const initBoard = (boardDimension = [3, 3]) => {
  const board = [];
  for (let row = 0; row < boardDimension[0]; row++) {
    const cols = [];
    for (let col = 0; col < boardDimension[1]; col++) {
      cols.push({ cell: `${row},${col}`, value: "" });
    }
    board.push(cols);
  }
  return board;
};

const AppContextProvider = props => {
  const { children } = props;

  const gameBoard = useMemo(() => {
    return initBoard();
  }, []);

  const [turnCount, onTurnCount] = useState(0);
  const [hasStarted, onStart] = useState(false);
  const [currentPlayer, setPlayer] = useState(players[0]);
  const [boardState, setBoardState] = useState(gameBoard);
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
    gameBoard: initBoard(),
    winStates,
    haveWinner,
    onWinner
  };

  return (
    <AppContext.Provider value={contextProps}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
