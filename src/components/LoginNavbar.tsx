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

export const LoginNavbar: React.FC = () => {
    return (
        <>
            <div>
                <LogoLanguageDiv>
                    <LogoDiv>Logo here</LogoDiv>
                    <div className="mr-4 flex cursor-pointer items-center gap-[20px] border-2 border-solid border-black p-2 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                        English
                        <IoIosArrowDown />
                    </div>
                </LogoLanguageDiv>
                <div className="flex justify-center gap-24 text-2xl">
                    <div className="cursor-pointer text-[#00C649]">
                        Login <hr className="h-1 bg-[#00C649]" />
                    </div>
                </div>
            </div>
        </>
    );
};
