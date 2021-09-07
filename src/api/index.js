import { gql } from "@apollo/client";

export const HELLO_QUERY = gql`
  query {
    hello
  }
`;

export const AUTH_QUERY = gql`
  query {
    auth
  }
`;
