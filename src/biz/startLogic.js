import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { AppContext } from "../providers/AppProviderContext";
import { HELLO_QUERY } from "../api";

export const useStartLogic = () => {
  const { hasStarted, onStart } = useContext(AppContext);

  const { data, loading } = useQuery(HELLO_QUERY);

  let onlineEnabled = false;
  if (data) {
    onlineEnabled = true;
  }

  return {
    hasStarted,
    onClick: () => {
      onStart(true);
    },
    onlineEnabled,
    titleMsg: loading
      ? "loading..."
      : data
      ? "online mode available"
      : "online mode not available"
  };
};
