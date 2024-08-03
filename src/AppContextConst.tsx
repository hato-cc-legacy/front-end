import { createContext, Dispatch, SetStateAction, useContext } from "react";
import AppState from "./interfaces/AppStateType";

export const initialAppState: AppState = {};

export const AppContext = createContext(initialAppState);
export const AppDispatchContext = createContext<Dispatch<SetStateAction<AppState>>>(
  () => initialAppState
);

export const useAppContext = () => useContext(AppContext);

export const useAppDispatchContext = () => useContext(AppDispatchContext);
