import React from "react";
import { useStartLogic } from "../biz/startLogic";
import StartView from "./StartView";
import GameView from "./GameView";

const TitleView = () => {
  const { hasStarted, onClick } = useStartLogic();
  if (hasStarted) {
    return <GameView />;
  }
  return <StartView onClick={onClick} />;
};

export default TitleView;
