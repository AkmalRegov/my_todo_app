import React, { useReducer } from "react";
import { LoginState, LoginReducer } from "../context/LoginReducer";

export const initialState: LoginState = {
    username: "",
    password: "",
    error: "",
    isLoading: false,
    isLoggedIn: false,
};

const LoginForm: React.FC = () => {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    const [state, dispatch] = useReducer(LoginReducer, initialState);
    const { username, password, error, isLoading, isLoggedIn } = state; //Make sure over here is correct!

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        async function login({ username, password }: LoginState) {
            return new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    if (username === "akmal" && password === "password") {
                        resolve();
                        dispatch({ type: "success", isLoggedIn: true, isLoading: false });
                    } else {
                        reject();
                    }
                }, 200);
            });
        }
        dispatch({ type: "login" });
        try {
            await login(state);
        } catch (error) {
            dispatch({
                type: "failure",
                error: "Incorrect username or password!",
                isLoggedIn: false,
                isLoading: false,
            });
        }
    };
    return (
        <>
            {isLoggedIn ? (
                <>
                    <h1>Welcome {username}!</h1>
                    <button onClick={() => dispatch({ type: "logout", isLoggedIn: false })}>Log Out</button>
                </>
            ) : (
                <form className="form" onSubmit={handleSubmit}>
                    {error && <p className="error">{error}</p>}
                    <p>Please Login!</p>
                    <input
                        type="text"
                        placeholder="username"
                        value={username}
                        onChange={(e) => {
                            dispatch({
                                type: "field",
                                fieldName: "username",
                                payload: e.currentTarget.value,
                            });
                        }}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => {
                            dispatch({
                                type: "field",
                                fieldName: "password",
                                payload: e.currentTarget.value,
                            });
                        }}
                    />
                    <button className="submit" type="submit" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Log In"}
                    </button>
                </form>
            )}
        </>
    );
};

export default LoginForm;
