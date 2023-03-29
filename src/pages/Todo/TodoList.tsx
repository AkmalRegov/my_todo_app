import { useContext, useState, memo, useRef, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

import { LoginContext } from "../../context/Login/LoginContext";
import * as TODO from "../../context/Todo";
import * as ROUTE from "../../routes";
import { Navbar } from "../../components/Navbar";
import { Link } from "react-router-dom";
import { MdMode as EditIcon, MdEditOff as DoneEditIcon, MdDelete as DeleteIcon } from "react-icons/md";

//*STYLING
const StrikethroughAnimation = keyframes`
	from {
		transform: scaleX(0);
	}
	to {
		transform: scaleX(1);
	}
`;

const StrikethroughMixin = css`
    &:after {
        content: "";
        position: absolute;
        display: block;
        width: 100%;
        height: 2px;
        box-shadow: 0 1px rgba(255, 255, 255, 0.6);
        margin-top: -0.7em;
        background: #ffd803;
        transform-origin: center left;
        animation: ${StrikethroughAnimation} 0.5s 0s cubic-bezier(0.55, 0, 0.1, 1) 1;
        transition: transform 0.2s cubic-bezier(0.55, 0, 0.1, 1);
    }
`;

const TodoStrikethrough = styled.p`
    display: inline-block;
    position: relative;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    ${(props) => (props.className !== "strikethrough" ? 0 : StrikethroughMixin)}
`;

const Button = styled.button`
    cursor: pointer;
    height: 30px;
    background-color: #ffd803;
    border: 1px solid #ffc203;
    color: #272343;
    font-weight: 600;

    &:hover {
        background-color: #ffe803;
        border: 1px #ffe803 solid;
    }
`;

const TodoFormDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 0.75rem;
`;

const TodoInput = styled.input`
    text-align: center;
    font-size: medium;
    border-radius: 0;
    border: 1px solid #fffffe;
    width: ${(props) => props.width ?? "340px"};
`;

const TodoForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TodoDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
`;

const TodoButtonsDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 0 auto;
    margin-top: 4rem;
`;

const TodoButtons = styled.button`
    align-items: center;
    justify-content: center;
    color: #2d334a;
    padding: 0.5rem;
    font-weight: 600;
    gap: 20px;
    border: 2px #ffd803 solid;
    background-color: #ffd803;
    border-radius: 0.375rem;
    width: 200px;
    cursor: pointer;

    &:hover {
        background-color: #ffe803;
        border: 2px #ffe803 solid;
    }
`;

const TextCenter = styled.p`
    text-align: center;
    margin: 0;
    color: #2d334a;
`;

const H1Center = styled.h1`
    text-align: center;
    margin: 0;
    color: #2d334a;
`;

const TodoMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #bae8e8;
    min-height: 100vh;
`;

const TodoDivMarginTop = styled.div`
    margin-top: 60px;
`;

const TodoClickDeleteDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ClickableTodoDiv = styled.div`
    display: flex;
    cursor: pointer;
    max-width: max-content;
    align-items: center;
    justify-content: center;
`;

//use maxWidth: "max-content" to restrict size to content
const TodoListDiv = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-top: 0px solid black;
    background-color: #fffffe;
    :first-child {
        border: 1px solid black;
    }
`;

const ToggleEditButton: React.FC<{
    item: TODO.Todos;
    index: number;
    TodoDispatch: TODO.TodoContextProps["dispatch"];
}> = ({ item, index, TodoDispatch }) => {
    return (
        <>
            <Button
                onClick={() => {
                    TodoDispatch({ type: "toggleEdit", id: item.id, isEditing: !item.isEditing, index: index });
                }}
                type={!item.isEditing ? "submit" : "button"}
            >
                {!item.isEditing ? <EditIcon size={16} /> : <DoneEditIcon size={16} />}
            </Button>
        </>
    );
};

const TodoCheckDelete: React.FC<{
    item: TODO.Todos;
    index: number;
    TodoDispatch: TODO.TodoContextProps["dispatch"];
    children: React.ReactNode;
}> = ({ item, index, TodoDispatch, children }) => {
    return (
        <>
            <TodoClickDeleteDiv>
                <ClickableTodoDiv
                    onClick={() => {
                        if (!item.isEditing) {
                            TodoDispatch({ type: "checked", id: item.id, isChecked: !item.isChecked, index: index });
                        }
                    }}
                >
                    <input
                        type={"checkbox"}
                        checked={item.isChecked}
                        onChange={() => {
                            TodoDispatch({ type: "checked", id: item.id, isChecked: !item.isChecked, index: index });
                        }}
                        style={{
                            margin: "0",
                            padding: "0",
                            width: "22px",
                            height: "22px",
                            marginRight: "6px",
                            marginLeft: "6px",
                        }}
                    ></input>
                    {item.isEditing ? (
                        <input
                            type={"text"}
                            value={item.desc}
                            style={{ fontSize: "medium", width: "300px", padding: "4px" }}
                            onChange={(e) => {
                                TodoDispatch({
                                    type: "editDesc",
                                    id: item.id,
                                    desc: e.currentTarget.value,
                                    index: index,
                                });
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    TodoDispatch({
                                        type: "toggleEdit",
                                        id: item.id,
                                        isEditing: !item.isEditing,
                                        index: index,
                                    });
                                }
                            }}
                        />
                    ) : (
                        <TodoStrikethrough
                            className={item.isChecked ? "strikethrough" : ""}
                            style={{
                                padding: "0",
                                paddingBottom: "2px",
                                margin: "0",
                                textAlign: "center",
                                color: "#2d334a",
                                userSelect: "none",
                            }}
                        >
                            {item.desc}
                        </TodoStrikethrough>
                    )}
                </ClickableTodoDiv>
                <span style={{ display: "flex", gap: "0.5rem", marginRight: "6px" }}>
                    {children}
                    <Button
                        onClick={() => {
                            TodoDispatch({ type: "delete", id: item.id });
                        }}
                    >
                        <DeleteIcon size={16} />
                    </Button>
                </span>
            </TodoClickDeleteDiv>
        </>
    );
};

const TodoItem: React.FC<{ item: TODO.Todos; children: React.ReactNode }> = ({ item, children }) => {
    return (
        <>
            <TodoListDiv style={{ width: "480px", height: "40px", justifyContent: "center", padding: "4px" }}>
                {children}
            </TodoListDiv>
        </>
    );
};

const TodoMap: React.FC<{ todoList: TODO.Todos[]; TodoDispatch: TODO.TodoContextProps["dispatch"] }> = ({
    todoList,
    TodoDispatch,
}) => {
    return (
        <>
            <div style={{ backgroundColor: "#468189", color: "white" }}>
                {todoList.map((item, index) => {
                    return (
                        <TodoItem item={item} key={item.id}>
                            <TodoCheckDelete item={item} TodoDispatch={TodoDispatch} index={index}>
                                <ToggleEditButton item={item} index={index} TodoDispatch={TodoDispatch} />
                            </TodoCheckDelete>
                        </TodoItem>
                    );
                })}
            </div>
        </>
    );
};
memo(TodoMap);

export function TodoList() {
    //*HOOKS and VARIABLES
    const { state: loginState, dispatch: UserDispatch } = useContext(LoginContext);
    const { username } = loginState;
    const { state: TodoState, dispatch: TodoDispatch } = useContext(TODO.TodoContext);
    const [desc, setDesc] = useState("");
    const LoginH1TextRef = useRef() as React.MutableRefObject<HTMLHeadingElement>;
    const [widthLoginH1Text, setWidthLoginH1Text] = useState(0);
    const TodoInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [heightTodoInput, setHeightTodoInput] = useState(0);

    useEffect(() => {
        if (LoginH1TextRef.current !== undefined && setWidthLoginH1Text !== undefined) {
            setWidthLoginH1Text(LoginH1TextRef.current.clientWidth);
        }
        if (TodoInputRef.current !== undefined && setHeightTodoInput !== undefined) {
            setHeightTodoInput(TodoInputRef.current.clientHeight);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("resize", () => {
            if (LoginH1TextRef.current !== undefined && setWidthLoginH1Text !== undefined) {
                setWidthLoginH1Text(LoginH1TextRef.current.clientWidth);
            }
            if (TodoInputRef.current !== undefined && setHeightTodoInput !== undefined) {
                setHeightTodoInput(TodoInputRef.current.clientHeight);
            }
        });
    }, []);

    //*FUNCTIONS
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        TodoDispatch({
            type: "add",
            id: `${crypto.randomUUID()}`,
            desc: desc,
            isChecked: false,
            isEditing: false,
        });
        console.log(`The length of state.todos is: ${TodoState.todos.length}`);
        setDesc("");
    }

    //*FC
    return (
        <>
            <Navbar menu="Todo List" />
            <TodoMain>
                <TodoDivMarginTop>
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <H1Center ref={LoginH1TextRef}>This is your todoList</H1Center>
                        <TextCenter>Btw, hi there {username}!</TextCenter>
                        <hr
                            style={{ width: `${widthLoginH1Text + 100}px`, margin: "0", border: "0.1px solid #fffffe" }}
                        />
                    </div>

                    <TodoFormDiv>
                        <TodoForm onSubmit={handleSubmit} style={{ width: `${widthLoginH1Text - 20}px` }}>
                            <TodoInput
                                ref={TodoInputRef}
                                type="text"
                                placeholder="add a todo here!"
                                width={`${widthLoginH1Text - 50}px`}
                                value={desc}
                                style={{
                                    borderWidth: "1px",
                                    padding: "0",
                                    height: "30px",
                                }}
                                onChange={(e) => {
                                    setDesc(e.currentTarget.value);
                                }}
                            />
                            <Button
                                type="submit"
                                style={{
                                    height: `${heightTodoInput + 2}px`,
                                    borderRadius: "0",
                                    borderWidth: "1px",
                                    cursor: "pointer",
                                }}
                            >
                                Create
                            </Button>
                        </TodoForm>
                        <TodoDiv>
                            {TodoState.todos.length > 0 && (
                                <TodoMap todoList={TodoState.todos} TodoDispatch={TodoDispatch} />
                            )}
                        </TodoDiv>
                    </TodoFormDiv>
                    <TodoButtonsDiv>
                        <Link to={ROUTE.welcome}>
                            <TodoButtons onClick={() => {}}>Go back to Welcome page</TodoButtons>
                        </Link>
                        <Link to={ROUTE.signIn}>
                            <TodoButtons
                                onClick={() => {
                                    UserDispatch({ type: "logout", isLoggedIn: false });
                                }}
                            >
                                Log Out
                            </TodoButtons>
                        </Link>
                    </TodoButtonsDiv>
                </TodoDivMarginTop>
            </TodoMain>
        </>
    );
}
