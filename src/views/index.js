import React from "react";
import { useStartLogic } from "../biz/startLogic";
import StartView from "./StartView";
import GameView from "./GameView";
import { userCan } from "../helpers/auth";

const TitleView = () => {
  const { hasStarted, onClick, onlineEnabled, titleMsg } = useStartLogic();

  if (hasStarted) {
    return <GameView />;
  }
  return (
    <StartView
      onClick={onClick}
      onlineEnabled={onlineEnabled}
      titleMsg={titleMsg}
    />
  );
};

export default userCan(TitleView);
