import React from "react";
import styled from "styled-components";
import config from "../config/default.json";

const { gitHubUrl } = config;

const A = styled.a`
  text-decoration: none;
  :link {
    color: white;
  }
  :hover {
    color: white;
  }
  :visited {
    color: white;
  }
`;

const Layout = (props) => {
  const { title, subTitle, children } = props;

  return (
    <div className="App">
      <header className="App-header">
        {title}
        <p style={{ fontSize: ".8rem" }}>{subTitle}</p>
        {children}
      </header>
      <footer className="App-footer">
        view code on{" "}
        <A href={gitHubUrl} target="_blank">
          GitHub
        </A>
      </footer>
    </div>
  );
};

export default Layout;
