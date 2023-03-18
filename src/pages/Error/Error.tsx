import { useContext } from "react";
import { useRouteError } from "react-router-dom";
import LoginContext from "../../context/LoginContext";

export type RouterError = {
    statusText: string;
    message: string;
};

export default function ErrorPage() {
    const error = useRouteError() as RouterError;
    const { state } = useContext(LoginContext);
    const { username } = state;
    console.error(error);

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <div
                    id="error-page"
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                    }}
                >
                    <h1>Oops!</h1>
                    <p>Sorry, an unexpected error has occurred.</p>
                    <p>
                        <i>{error.statusText || error.message}</i>
                    </p>
                    <p>But... we know your name is {username}</p>
                </div>
            </div>
        </>
    );
}
