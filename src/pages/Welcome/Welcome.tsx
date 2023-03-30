import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../context/Login/LoginContext";
import { Navbar } from "../../components/Navbar";
import styled, { keyframes } from "styled-components";

const WelcomeMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #bae8e8;
    min-height: 100vh;
`;

const WelcomeDivMarginTop = styled.div`
    margin-top: 30vh;
`;

const WelcomeDiv = styled.div`
    display: flex;
    gap: 1rem;
    margin: 0 auto;
    margin-top: 2rem;
`;

const WelcomeButtons = styled.button`
    align-items: center;
    justify-content: center;
    color: #272343;
    padding: 0.5rem;
    gap: 20px;
    border: 2px #ffd803 solid;
    background-color: #ffd803;
    border-radius: 0.375rem;
    width: 200px;
    cursor: pointer;
    font-weight: 600;

    &:hover {
        background-color: #ffe803;
        border: 2px #ffe803 solid;
    }
`;

const WelcomeH1 = styled.h1`
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    color: #272343;
    margin: 0;
`;

const StrikethroughAnimation = keyframes`
	from {
		transform: scaleX(0);
	}
	to {
		transform: scaleX(1);
	}
`;

const WelcomeHr = styled.hr`
    border-width: 0;
    &:after {
        content: "";
        position: absolute;
        display: block;
        width: 416px;
        height: 2px;
        background: #fffffe;
        border: 1px solid #fffffe;
        transform-origin: center left;
        animation: ${StrikethroughAnimation} 0.5s 0s cubic-bezier(0.55, 0, 0.1, 1) 1;
        transition: transform 0.2s cubic-bezier(0.55, 0, 0.1, 1);
    }
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
                    <WelcomeHr />
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
