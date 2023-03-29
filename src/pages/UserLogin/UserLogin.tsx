// import LoginForm from "../../components/LoginForm";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { LoginContext } from "../../context/Login";
import styled from "styled-components";
import { TodoContext } from "../../context/Todo";

const LoginMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #bae8e8;
    min-height: 100vh;
`;

const LoginDivForm = styled.div`
    margin-top: 118px;
`;

const LoginPadding = styled.div`
    padding: 1rem;
`;

const LoginAccountText = styled.p`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #2d334a;
`;

const LoginUsernamePasswordDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    gap: 10px;
`;

const LoginFieldDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const LoginInputBox = styled.input`
    height: 45px;
    width: 363px;
    border-radius: 0.375rem;
    font-size: medium;
    padding-left: 0.375rem;
`;

const LoginTCDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 2.5rem;
`;

const LoginContinueButton = styled.button`
    align-items: center;
    justify-content: center;
    color: #272343;
    padding: 0.5rem;
    gap: 20px;
    border: 2px #ffd803 solid;
    background-color: #ffd803;
    border-radius: 0.375rem;
    width: 363px;
    cursor: pointer;
    font-weight: 600;

    &:hover {
        background-color: #ffe803;
        border: 2px #ffe803 solid;
    }
`;

const LoginTCPara = styled.p`
    margin-top: 11px;
    font-size: 12px;
    color: #2d334a;
`;

const LoginTCAnchor = styled.a`
    font-size: 12px;
    font-size: 500;
    color: #3e51fa;
`;

const LoginLabelText = styled.label`
    color: #2d334a;
    font-weight: 500;
`;

export const UserLogin: React.FC = () => {
    //*HOOKS and VARIABLES
    const { state, dispatch } = useContext(LoginContext);
    const { username, password, error, isLoggedIn } = state;
    const { dispatch: TodoDispatch } = useContext(TodoContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/welcome");
        } else {
            TodoDispatch({ type: "userLogOut" });
        }
    }, [isLoggedIn, navigate, TodoDispatch]);

    //*FUNCTIONS
    async function login() {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                if (password === "password") {
                    resolve();
                    dispatch({ type: "success", error: "", isLoggedIn: true, isLoading: false });
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
            <Navbar />
            <LoginMain>
                <LoginDivForm>
                    <LoginPadding>
                        <form onSubmit={handleSubmit}>
                            {error !== "" && (
                                <p className="error" style={{ color: "red" }}>
                                    {error}
                                </p>
                            )}
                            <LoginAccountText>Login to your account</LoginAccountText>
                            <LoginUsernamePasswordDiv>
                                <LoginFieldDiv>
                                    <LoginLabelText htmlFor="username">Username</LoginLabelText>
                                    <LoginInputBox
                                        type="text"
                                        name="username"
                                        value={username}
                                        onChange={(e) => {
                                            dispatch({
                                                type: "field",
                                                fieldName: "username",
                                                payload: e.currentTarget.value,
                                            });
                                        }}
                                    />
                                </LoginFieldDiv>
                                <LoginFieldDiv>
                                    <LoginLabelText htmlFor="password">Password</LoginLabelText>
                                    <LoginInputBox
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => {
                                            dispatch({
                                                type: "field",
                                                fieldName: "password",
                                                payload: e.currentTarget.value,
                                            });
                                        }}
                                    />
                                </LoginFieldDiv>
                            </LoginUsernamePasswordDiv>
                            <LoginTCDiv>
                                <LoginContinueButton>Continue</LoginContinueButton>
                                <LoginTCPara>
                                    By continuing, you agree to the{" "}
                                    <LoginTCAnchor href={""}>Terms of Service</LoginTCAnchor> and{" "}
                                    <LoginTCAnchor href={""}>Privacy Policy</LoginTCAnchor>
                                </LoginTCPara>
                            </LoginTCDiv>
                        </form>
                    </LoginPadding>
                </LoginDivForm>
            </LoginMain>
        </>
    );
};
