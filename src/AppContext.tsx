import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import AppState from "./interfaces/app-state.interface";

let initialAppState: AppState = { isLoggedIn: false };
const storage = localStorage.getItem("appState");

if (!storage) localStorage.setItem("appState", JSON.stringify(initialAppState));
else initialAppState = JSON.parse(storage);

const AppContext = createContext(initialAppState);
const AppDispatchContext = createContext<Dispatch<SetStateAction<AppState>>>(
  () => initialAppState
);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [useAppState, setAppState] = useState(initialAppState);

  useEffect(() => {
    console.log("Im here");
    localStorage.setItem("appState", JSON.stringify(useAppState));
  }, [useAppState]);

  return (
    <AppContext.Provider value={useAppState}>
      <AppDispatchContext.Provider value={setAppState}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

export const useAppDispatchContext = () => useContext(AppDispatchContext);

export default AppProvider;
