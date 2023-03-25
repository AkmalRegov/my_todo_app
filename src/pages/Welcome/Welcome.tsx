import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/Login/LoginContext";

export function Welcome() {
    const { state, dispatch } = useContext(LoginContext);
    const { username, isLoggedIn } = state;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) navigate("/");
    }, [isLoggedIn, navigate]);

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <div
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                    }}
                >
                    <h1>Welcome {username}!</h1>
                    <button
                        onClick={() => {
                            dispatch({ type: "logout", isLoggedIn: false });
                        }}
                    >
                        Log Out
                    </button>
                    <Link to={"/todoList"}>
                        <button onClick={() => {}}>Go to your todoList</button>
                    </Link>
                </div>
            </div>
        </>
    );
}
