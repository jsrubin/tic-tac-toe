import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Div = styled.div`
  font-size: 2rem;
  height: 40px;
  width: 40px;
  ${(props) => (props.visible ? "" : "display: none;")}
`;

const drag = (ev) => {
  ev.dataTransfer.setData("text", ev.target.id);
};

const Piece = ({ turnCount, piece, draggable = false, visible = false }) => {
  return (
    <Div
      id={`game-piece-${turnCount}`}
      draggable={draggable}
      onDragStart={drag}
      visible={visible}
    >
      {piece}
    </Div>
  );
};

Piece.propTypes = {
  piece: PropTypes.string.isRequired
};

export default Piece;
