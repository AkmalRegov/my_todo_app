import React from "react";
import styled from "styled-components";
import { SiStyledcomponents as StyledComponentsLogo } from "react-icons/si";
import { IoIosArrowDown } from "react-icons/io";

const NavbarDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    padding-bottom: 0;
`;

const LogoDiv = styled.div`
    margin-left: 1rem;
    padding-bottom: 0.75rem;
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
    margin-bottom: 10px;
`;

const LoginDiv = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 4px;
    font-size: 1.5rem;
    line-height: 2rem;
`;

const ClickableDivLogin = styled.div`
    cursor: pointer;
    color: #272343;
`;

export const Navbar: React.FC<{ menu?: string }> = ({ menu }) => {
    return (
        <>
            <div>
                <NavbarDiv>
                    <LogoDiv>
                        <StyledComponentsLogo size={60} />
                    </LogoDiv>
                    <LoginDiv>
                        <ClickableDivLogin>{menu ?? "Login"}</ClickableDivLogin>
                    </LoginDiv>
                    <LanguageDiv>
                        English
                        <IoIosArrowDown />
                    </LanguageDiv>
                </NavbarDiv>
            </div>
        </>
    );
};
