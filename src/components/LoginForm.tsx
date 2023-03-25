import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/Login/LoginContext";

const LoginForm: React.FC = () => {
    //*HOOKS and VARIABLES
    const { state, dispatch } = useContext(LoginContext);
    const { username, password, error, isLoading, isLoggedIn } = state;
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn) navigate("/welcome");
    }, [isLoggedIn, navigate]);

    //*FUNCTIONS
    async function login() {
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

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        dispatch({ type: "login" });
        try {
            await login();
        } catch (error) {
            dispatch({
                type: "failure",
                error: "Incorrect username or password!",
                isLoggedIn: false,
                isLoading: false,
            });
        }
    }

    //*FC
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div
                    id="error-page"
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        height: "100vh",
                    }}
                >
                    <form className="form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
                        {error && <p className="error">{error}</p>}
                        <p>Please Login!</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
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
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
