import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/Login/LoginContext";
import { Navbar } from "../../components/Navbar";
import styled from "styled-components";

const WelcomeMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f7f9fb;
    min-height: 100vh;
`;

const WelcomeDivMarginTop = styled.div`
    margin-top: 30vh;
`;

const WelcomeDiv = styled.div`
    display: flex;
    gap: 1rem;
    margin: 0 auto;
`;

const WelcomeButtons = styled.button`
    align-items: center;
    justify-content: center;
    color: white;
    padding: 0.5rem;
    gap: 20px;
    border: 2px #00c649 solid;
    background-color: #00c649;
    border-radius: 0.375rem;
    width: 200px;
    cursor: pointer;
`;

const WelcomeH1 = styled.h1`
    text-align: center;
    font-size: 30px;
    font-weight: bold;
`;

export function Welcome() {
    const { state, dispatch } = useContext(LoginContext);
    const { username, isLoggedIn } = state;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) navigate("/");
    }, [isLoggedIn, navigate]);

    return (
        <>
            <Navbar menu="Home" />
            <WelcomeMain>
                <WelcomeDivMarginTop>
                    <WelcomeH1>Welcome {username}!</WelcomeH1>
                    <WelcomeDiv>
                        <WelcomeButtons
                            onClick={() => {
                                dispatch({ type: "logout", isLoggedIn: false });
                            }}
                        >
                            Log Out
                        </WelcomeButtons>
                        <Link to={"/todoList"}>
                            <WelcomeButtons onClick={() => {}}>Go to your todoList</WelcomeButtons>
                        </Link>
                    </WelcomeDiv>
                </WelcomeDivMarginTop>
            </WelcomeMain>
        </>
    );
}
