import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import styled from "styled-components";

const LogoLanguageDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    padding-bottom: 0;
`;

const LogoDiv = styled.div`
    margin-left: 1rem;
`;

const LanguageDiv = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
    gap: 20px;
    border: 2px solid black;
    filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
    padding: 0.5rem;
    margin-right: 1rem;
`;

const LoginDiv = styled.div`
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    line-height: 2rem;
`;

const ClickableDivLogin = styled.div`
    cursor: pointer;
    color: #00c649;
`;

const Loginhr = styled.hr`
    height: 0.25rem;
    margin: 0;
    background-color: #00c649;
`;

export const Navbar: React.FC<{ menu?: string }> = ({ menu }) => {
    return (
        <>
            <div>
                <LogoLanguageDiv>
                    <LogoDiv>Logo here</LogoDiv>
                    <LanguageDiv>
                        English
                        <IoIosArrowDown />
                    </LanguageDiv>
                </LogoLanguageDiv>
                <LoginDiv>
                    <ClickableDivLogin>
                        {menu ?? "Login"} <Loginhr />
                    </ClickableDivLogin>
                </LoginDiv>
            </div>
        </>
    );
};
