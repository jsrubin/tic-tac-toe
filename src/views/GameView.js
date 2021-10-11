import React, { useMemo } from "react";
import Layout from "../components/Layout";
import GameBoard from "./GameBoard";
import { usePlayLogic } from "../biz/playLogic";
import styled from "styled-components";

const DivCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 6rem;
`;

const Title = styled.div`
  font-weight: ${(props) => (props.highlight ? "bolder" : "bold")};
  ${(props) => (props.highlight ? "color: orange;" : "")}
  padding-bottom: 4px;
`;

const DivRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 20rem;
  padding-bottom: 10px;
  align-items: flex-end;
`;

const ScoreBoxDiv = styled.div`
  padding: 8px;
  border: 1px solid white;
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.2rem;
`;

const ScoreBox = ({ player, highlight }) => {
  return (
    <DivCol>
      <Title highlight={highlight}>
        {player.name === "Tie"
          ? player.name
          : `Player ${player.name} (${player.piece})`}
      </Title>
      <ScoreBoxDiv>{player.wins}</ScoreBoxDiv>
    </DivCol>
  );
};

const Score = (props) => {
  const { players, currentPlayer } = props;

  return (
    <DivRow>
      {players.map((player, i) => {
        return (
          <ScoreBox
            key={`player-${i}`}
            player={player}
            highlight={currentPlayer.id === player.id}
          />
        );
      })}
    </DivRow>
  );
};

const GameView = () => {
  const { name, subTitle, players, haveWinner, currentPlayer, turnCount } =
    usePlayLogic();

  const playerCount = players && players.length > 0 ? players.length : 0;
  const scoreData = useMemo(
    () => {
      const scores = [...players];
      if (scores.length === 2) {
        scores.splice(1, 0, { name: "Tie", wins: scores[0].ties || 0 });
      }
      return scores;
    }, // eslint-disable-next-line
    [playerCount, haveWinner, turnCount, currentPlayer.id]
  );

  return (
    <Layout title={name} subTitle={subTitle}>
      <Score players={scoreData} currentPlayer={currentPlayer} />
      <GameBoard />
    </Layout>
  );
};

export default GameView;
