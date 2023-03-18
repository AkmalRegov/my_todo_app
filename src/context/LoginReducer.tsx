export type LoginActionTypes =
    | { type: "field"; fieldName: string; payload: string }
    | { type: "login" }
    | { type: "failure"; error: "Incorrect username or password!"; isLoggedIn: boolean; isLoading: boolean }
    | { type: "success"; isLoggedIn: boolean; isLoading: boolean }
    | { type: "logout"; isLoggedIn: boolean };

export type LoginState = {
    username: string;
    password: string;
    error: string;
    isLoading: boolean;
    isLoggedIn: boolean;
};

export function LoginReducer(state: LoginState, action: LoginActionTypes): LoginState {
    switch (action.type) {
        case "field":
            return { ...state, [action.fieldName]: action.payload };
        case "login":
            return { ...state };
        case "failure":
            return { ...state, error: action.error, isLoggedIn: action.isLoggedIn, isLoading: action.isLoading };
        case "success":
            return { ...state, isLoggedIn: action.isLoggedIn, isLoading: action.isLoading };
        case "logout":
            return { ...state, isLoggedIn: action.isLoggedIn };
        default:
            return state;
    }
}
