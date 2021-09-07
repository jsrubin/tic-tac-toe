import React, { useMemo } from "react";
import styled from "styled-components";
import { usePlayLogic } from "../biz/playLogic";

const Table = styled.table`
  font-size: 2.5rem;
`;

const Td = styled.td`
  padding: 8px;
  height: 5rem;
  width: 5rem;
  border-right: ${(props) => (props.borderRight ? "1px solid white" : "")};
  border-bottom: ${(props) => (props.borderBottom ? "1px solid white" : "")};
`;

function allowDrop(ev) {
  ev.preventDefault();
}

const onDrop = (onClick) => {
  return (ev, cell) => {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    const elem = document.getElementById(data);
    elem.style.width = null;
    elem.style.height = null;
    elem.setAttribute("draggable", false);
    ev.target.appendChild(elem);
    onClick(cell);
  };
};

const buildColumns = (row, cols, onClick, onDrop, highlightCols) => {
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
        onDragOver={allowDrop}
        onDrop={(e) => onDrop(e, col.cell)}
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

const buildGameBoard = ({ boardState, onClick, onDrop, highlightCols }) => {
  let board = [];
  boardState.forEach((row, i) => {
    board.push(
      <tr key={`board-row-${i}`}>
        {buildColumns(i, row, onClick, onDrop, highlightCols)}
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
        onDrop: onDrop(onPlacePiece),
        highlightCols: haveWinner.winState
      });
    }, // eslint-disable-next-line
    [currentPlayer.id, haveWinner]
  );

  return (
    <Table>
      <tbody>{board}</tbody>
    </Table>
  );
};

export default Board;
