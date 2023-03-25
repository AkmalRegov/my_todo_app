import React from "react";
import { LoginActionTypes, LoginState } from "./LoginReducer";

export interface LoginContextProps {
    state: LoginState;
    dispatch: React.Dispatch<LoginActionTypes>;
}

export const LoginContext = React.createContext({} as LoginContextProps);
