import React from "react";
import { useQuery } from "@apollo/client";
import Layout from "../components/Layout";
import { AUTH_QUERY } from "../api";

export const userCan = (WrapperComponent) => (props) => {
  const { data, loading, error } = useQuery(AUTH_QUERY);

  if (loading) {
    return <Layout title="Loading..." />;
  }
  if (data && !data.auth) {
    console.log("user auth: ", data);
    return <Layout title="Tic Tac Toe" subTitle="unauthorized" />;
  }
  return <WrapperComponent props={props} />;
};
