import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Div = styled.div`
  font-size: 2rem;
`;

function drag(ev) {
  console.log("drag piece: ", ev);
  ev.dataTransfer.setData("text", ev.target.id);
}

const Piece = ({ piece, draggable = false }) => {
  return (
    <Div id="game-piece" draggable={draggable} onDragStart={drag}>
      {piece}
    </Div>
  );
};

Piece.propTypes = {
  piece: PropTypes.string.isRequired
};

export default Piece;
