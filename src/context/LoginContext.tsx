import React, { Dispatch } from "react";
import { LoginActionTypes, LoginState } from "./LoginReducer";

export interface LoginContextProps {
    state: LoginState;
    dispatch: Dispatch<LoginActionTypes>;
}

const LoginContext = React.createContext({} as LoginContextProps);
export default LoginContext;
