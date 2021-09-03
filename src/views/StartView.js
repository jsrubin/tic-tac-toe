import React from "react";
import Button from "../components/Button";

const StartView = props => {
  return (
    <div className="App">
      <header className="App-header">
        Tic Tac Toe
        <p></p>
        <Button
          onClick={props.onClick}
          label="START"
          styles={{
            width: "100px",
            height: "40px",
            borderRadius: "8px",
            backgroundColor: "#78f89f"
          }}
        />
      </header>
    </div>
  );
};

export default StartView;
