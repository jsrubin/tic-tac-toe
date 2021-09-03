import React, { useMemo } from "react";
import styled from "styled-components";
import { usePlayLogic } from "../biz/playLogic";
import Modal from "../common/Modal";

const Table = styled.table``;

const Tr = styled.tr``;

const Td = styled.td`
  padding: 8px;
  height: 20px;
  width: 20px;
  border-right: ${props => (props.borderRight ? "1px solid white" : "")};
  border-bottom: ${props => (props.borderBottom ? "1px solid white" : "")};
`;

const buildColumns = (row, cols, onClick, winState) => {
  return cols.map((col, i) => {
    const highlight = winState
      ? winState.find(arr => arr[0] === row && arr[1] === i)
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

const buildGameBoard = ({ boardState, onClick, winState }) => {
  let board = [];
  boardState.forEach((row, i) => {
    board.push(
      <Tr key={`board-row-${i}`}>{buildColumns(i, row, onClick, winState)}</Tr>
    );
  });
  return board;
};

const GameBoard = () => {
  const { boardState, onPlacePiece, currentPlayer, haveWinner } =
    usePlayLogic();

  const board = useMemo(() => {
    return buildGameBoard({
      boardState,
      onClick: onPlacePiece,
      winState: haveWinner.winState
    });
  }, [currentPlayer.id, haveWinner]);

  return (
    <Table>
      <tbody>{board}</tbody>
    </Table>
  );
};

const GameBoardContainer = () => {
  const { haveWinner, onReset } = usePlayLogic();

  return (
    <div>
      <GameBoard />
      <Modal
        title="GAME OVER"
        visible={haveWinner ? true : false}
        onClose={onReset}
        buttonText="REPLAY"
      >
        {haveWinner && haveWinner.winner != "tie"
          ? `Player ${haveWinner.winner} Wins!`
          : "TIE!"}
      </Modal>
    </div>
  );
};

export default GameBoardContainer;
