import React, { useContext, useReducer } from "react";
import { LoginState, LoginReducer, LoginActionTypes } from "../context/LoginReducer";
import { Link } from "react-router-dom";
import LoginContext from "../context/LoginContext";

export async function login({ username, password }: LoginState, dispatch: (value: LoginActionTypes) => void) {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            if (password === "password") {
                resolve();
                dispatch({ type: "success", isLoggedIn: true, isLoading: false });
            } else {
                reject();
            }
        }, 200);
    });
}

const LoginForm: React.FC = () => {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    // const [state, dispatch] = useReducer(LoginReducer, initialState);
    // const { username, password, error, isLoading, isLoggedIn } = state; //Make sure over here is correct!
    const { state, dispatch } = useContext(LoginContext);
    const { username, password, error, isLoading, isLoggedIn } = state;
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch({ type: "login" });
        try {
            await login(state, dispatch);
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
                <div>
                    <h1>Welcome {username}!</h1>
                    <button onClick={() => dispatch({ type: "logout", isLoggedIn: false })}>Log Out</button>
                    <Link to={"/todoList"}>
                        <button onClick={() => {}}>Go to your todoList</button>
                    </Link>
                </div>
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
                            console.log(`username is: ${username}`);
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
                            console.log(`password is: ${password}`);
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
