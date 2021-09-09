import React from "react";
import Layout from "../components/Layout";
import GameBoard from "./GameBoard";
import { usePlayLogic } from "../biz/playLogic";

const SubTitle = ({ isBoardFilled, currentPlayer }) => {
  return (
    <React.Fragment>
      {isBoardFilled
        ? "Game Over"
        : `Turn: Player ${currentPlayer.name} (${currentPlayer.piece})`}
    </React.Fragment>
  );
};

const GameView = (props) => {
  const { currentPlayer, isBoardFilled, name } = usePlayLogic();
  return (
    <Layout title={name} subTitle={SubTitle({ isBoardFilled, currentPlayer })}>
      <GameBoard />
    </Layout>
  );
};

export default GameView;
