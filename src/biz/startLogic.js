import { useContext } from "react";
import { AppContext } from "../providers/AppProviderContext";

export const useStartLogic = () => {
  const { hasStarted, onStart } = useContext(AppContext);
  return {
    hasStarted,
    onClick: () => {
      onStart(true);
    }
  };
};
