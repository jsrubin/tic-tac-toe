import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ModalDiv = styled.div`
  position: fixed;
  top: 180px;
  left: 30%;
  width: 500px;
  background: white;
  border: 1px solid #ccc;
  transition: 1.1s ease-out;
  filter: blur(0);
  transform: scale(1);
  opacity: 1;
  visibility: visible;
  box-shadow: 0 5px 15px rgb(255 255 255 / 50%);
`;

const Header = styled.div`
  color: #000;
  border-bottom: 1px solid #ccc;
  padding: 1rem;
  margin: 0;
`;
const Body = styled.div`
  color: #000;
  padding: 1rem;
`;
const Footer = styled.div`
  border-top: 1px solid #ccc;
  background: #eee;
  padding: 0.5rem 1rem;
`;

const CloseBtn = styled.button`
  border: 0;
  background: #78f89f;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  line-height: 1;
`;

class Modal extends React.Component {
  render() {
    if (!this.props.visible) {
      return null;
    }
    return (
      <ModalDiv>
        <Header>{this.props.title}</Header>
        {this.props.children ? <Body>{this.props.children}</Body> : null}
        <Footer>
          <CloseBtn onClick={this.props.onClose}>
            {this.props.buttonText || "CLOSE"}
          </CloseBtn>
        </Footer>
      </ModalDiv>
    );
  }
}

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Modal;
