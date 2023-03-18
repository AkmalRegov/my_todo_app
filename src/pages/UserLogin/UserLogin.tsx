import LoginForm from "../../components/LoginForm";
import { useContext } from "react";
import { LoginState } from "../../context/LoginReducer";

export function UserLogin() {
    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", padding: "20px", paddingBottom: "200px" }}>
                <LoginForm />
            </div>
        </>
    );
}
