import React from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import styled from "styled-components";

const DivFlex = styled.div`
  display: flex;
`;

const StartView = (props) => {
  return (
    <Layout title="Tic Tac Toe" subTitle={props.titleMsg}>
      <DivFlex>
        <Button
          onClick={props.onClick}
          label="LOCAL PLAY"
          styles={{
            width: "100px",
            height: "40px",
            borderRadius: "8px",
            backgroundColor: "#78f89f"
          }}
        />
        {props.onlineEnabled ? (
          <Button
            onClick={props.onClick}
            label="ONLINE PLAY"
            styles={{
              width: "100px",
              height: "40px",
              borderRadius: "8px",
              backgroundColor: "#78f89f"
            }}
          />
        ) : null}
      </DivFlex>
    </Layout>
  );
};

export default StartView;
