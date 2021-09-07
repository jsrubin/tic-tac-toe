import React from "react";
import Layout from "../components/Layout";
import Button from "../components/Button";
import styled from "styled-components";

const DivFlex = styled.div`
  display: flex;
`;

const Spacer = styled.div`
  padding: 4px;
`;

const StartView = (props) => {
  return (
    <Layout title="Tic Tac Toe" subTitle={props.titleMsg}>
      <DivFlex>
        <Button
          onClick={props.onClick}
          label="LOCAL PLAY"
          styles={{
            width: "10rem",
            height: "4rem",
            borderRadius: "5px",
            border: "1px solid lightgrey",
            backgroundColor: "#78f89f",
            fontSize: "1.2rem"
          }}
        />
        {props.onlineEnabled ? (
          <>
            <Spacer />
            <Button
              onClick={props.onClick}
              label="ONLINE PLAY"
              styles={{
                width: "10rem",
                height: "4rem",
                borderRadius: "5px",
                border: "1px solid lightgrey",
                backgroundColor: "#78f89f",
                fontSize: "1.2rem"
              }}
            />
          </>
        ) : null}
      </DivFlex>
    </Layout>
  );
};

export default StartView;
