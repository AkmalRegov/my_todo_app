import { useContext, useState, memo } from "react";
import { LoginContext } from "../../context/Login/LoginContext";
import * as TODO from "../../context/Todo";
import styled from "styled-components";
import { Navbar } from "../../components/Navbar";

const TextCenter = styled.p`
    text-align: center;
`;

const H1Center = styled.h1`
    text-align: center;
`;

const TodoMain = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f7f9fb;
    min-height: 100vh;
`;

const TodoDivMarginTop = styled.div`
    margin-top: 60px;
`;

const TodoClickDeleteDiv = styled.div`
    display: flex;
    gap: 1rem;
`;

const ClickableTodoDiv = styled.div`
    display: flex;
    cursor: pointer;
    max-width: max-content;
`;

const DeleteDiv = styled.div`
    display: flex;
    gap: 1rem;
`;

//use maxWidth: "max-content" to restrict size to content
const Li = styled.li`
    display: flex;
    flex-direction: column;
    max-width: max-content;
`;

const ToggleEditButton: React.FC<{
    item: TODO.Todos;
    index: number;
    TodoDispatch: TODO.TodoContextProps["dispatch"];
}> = ({ item, index, TodoDispatch }) => {
    return (
        <>
            <button
                onClick={() => {
                    TodoDispatch({ type: "toggleEdit", id: item.id, isEditing: !item.isEditing, index: index });
                }}
                type={!item.isEditing ? "submit" : "button"}
            >
                {!item.isEditing ? "Edit" : "Done"}
            </button>
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
                        TodoDispatch({ type: "checked", id: item.id, isChecked: !item.isChecked, index: index });
                    }}
                >
                    {item.desc}
                    <input type={"checkbox"} checked={item.isChecked} onChange={() => {}}></input>
                </ClickableTodoDiv>
                <DeleteDiv>
                    {children}
                    <button
                        onClick={() => {
                            TodoDispatch({ type: "delete", id: item.id });
                        }}
                    >
                        Delete
                    </button>
                </DeleteDiv>
            </TodoClickDeleteDiv>
        </>
    );
};

const TodoLi: React.FC<{ item: TODO.Todos; children: React.ReactNode }> = ({ item, children }) => {
    return (
        <>
            <Li key={item.id}>{children}</Li>
        </>
    );
};

const TodoMap: React.FC<{ todoList: TODO.Todos[]; TodoDispatch: TODO.TodoContextProps["dispatch"] }> = ({
    todoList,
    TodoDispatch,
}) => {
    return (
        <>
            <ul>
                {todoList.map((item, index) => {
                    return (
                        <TodoLi item={item} key={item.id}>
                            <TodoCheckDelete item={item} TodoDispatch={TodoDispatch} index={index}>
                                {item.isEditing && (
                                    <input
                                        type={"text"}
                                        value={item.desc}
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
                                )}
                                <ToggleEditButton item={item} index={index} TodoDispatch={TodoDispatch} />
                            </TodoCheckDelete>
                        </TodoLi>
                    );
                })}
            </ul>
        </>
    );
};
memo(TodoMap);

export function TodoList() {
    //*HOOKS and VARIABLES
    const { state: loginState } = useContext(LoginContext);
    const { username } = loginState;
    const { state: TodoState, dispatch: TodoDispatch } = useContext(TODO.TodoContext);
    const [counter, setCounter] = useState(0);
    const [desc, setDesc] = useState("");

    //*FUNCTIONS
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setCounter(() => {
            return counter + 1;
        });
        TodoDispatch({
            type: "add",
            id: counter,
            desc: desc,
            isChecked: false,
            isEditing: false,
            index: TodoState.todos.length - 1,
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
                    <H1Center>This is your todoList</H1Center>
                    <TextCenter>Btw, hi there {username}!</TextCenter>

                    <div>
                        <div>
                            {TodoState.todos.length > 0 && (
                                <TodoMap todoList={TodoState.todos} TodoDispatch={TodoDispatch} />
                            )}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="add a todo here!"
                                value={desc}
                                onChange={(e) => {
                                    setDesc(e.currentTarget.value);
                                }}
                            />
                            <button type="submit">Add</button>
                        </form>
                    </div>
                </TodoDivMarginTop>
            </TodoMain>
        </>
    );
}
