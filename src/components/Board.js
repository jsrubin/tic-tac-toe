import React, { useMemo } from "react";
import styled from "styled-components";
import { usePlayLogic } from "../biz/playLogic";

const Td = styled.td`
  padding: 8px;
  height: 20px;
  width: 20px;
  border-right: ${(props) => (props.borderRight ? "1px solid white" : "")};
  border-bottom: ${(props) => (props.borderBottom ? "1px solid white" : "")};
`;

const buildColumns = (row, cols, onClick, highlightCols) => {
  return cols.map((col, i) => {
    const highlight = highlightCols
      ? highlightCols.find((arr) => arr[0] === row && arr[1] === i)
      : "";
    return (
      <Td
        key={`board-col-${i}`}
        borderBottom={row < 2 ? true : false}
        borderRight={i < 2 ? true : false}
        onClick={() => onClick(col.cell)}
      >
        {highlight ? (
          <div style={{ color: "chartreuse", fontWeight: "bolder" }}>
            {col.value}
          </div>
        ) : (
          col.value
        )}
      </Td>
    );
  });
};

const buildGameBoard = ({ boardState, onClick, highlightCols }) => {
  let board = [];
  boardState.forEach((row, i) => {
    board.push(
      <tr key={`board-row-${i}`}>
        {buildColumns(i, row, onClick, highlightCols)}
      </tr>
    );
  });
  return board;
};

const Board = () => {
  const { boardState, onPlacePiece, currentPlayer, haveWinner } =
    usePlayLogic();

  const board = useMemo(
    () => {
      return buildGameBoard({
        boardState,
        onClick: onPlacePiece,
        highlightCols: haveWinner.winState
      });
    }, // eslint-disable-next-line
    [currentPlayer.id, haveWinner]
  );

  return (
    <table>
      <tbody>{board}</tbody>
    </table>
  );
};

export default Board;
