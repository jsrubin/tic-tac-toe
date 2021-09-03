import React from "react";
import PropTypes from "prop-types";

const Button = props => {
  const { onClick, label = "", styles } = props;
  return (
    <button style={styles} onClick={onClick}>
      {label}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Button;
