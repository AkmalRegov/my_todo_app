import { useReducer } from "react";
import { LoginContext, LoginContextProps } from "./LoginContext";
import { LoginReducer, LoginState } from "./LoginReducer";

export const initialState: LoginState = {
    username: "",
    password: "",
    error: "",
    isLoading: false,
    isLoggedIn: false,
};

export interface LoginProviderProps {
    children: React.ReactNode;
}

//btw, context does not persist if user navigates through browser's URL searchbar
const LoginProvider: React.FC<LoginProviderProps> = ({ children }: LoginProviderProps) => {
    const [state, dispatch] = useReducer(LoginReducer, initialState);
    const loginValue: LoginContextProps = {
        state: state,
        dispatch: dispatch,
    };
    return <LoginContext.Provider value={loginValue}>{children}</LoginContext.Provider>;
};

export default LoginProvider;
