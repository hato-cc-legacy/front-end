import { ReactNode, useEffect, useState } from "react";

import * as sessionApi from "./api/session";
import {
  AppContext,
  AppDispatchContext,
  initialAppState,
} from "./AppContextConst";

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [useAppState, setAppState] = useState(initialAppState);

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(useAppState));
  }, [useAppState]);

  const checkSession = async () => {
    const user = await sessionApi.checkSession();
    if (user) {
      setAppState({ user });
    } else {
      setAppState({});
    }
  };

  return (
    <AppContext.Provider value={useAppState}>
      <AppDispatchContext.Provider value={setAppState}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export default AppProvider;
