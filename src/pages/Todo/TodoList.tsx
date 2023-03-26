import { useContext, useState, memo } from "react";
import { LoginContext } from "../../context/Login/LoginContext";
import * as TODO from "../../context/Todo";

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
            <div
                style={{ cursor: "pointer", maxWidth: "max-content" }}
                onClick={() => {
                    TodoDispatch({ type: "checked", id: item.id, isChecked: !item.isChecked, index: index });
                }}
            >
                {item.desc}
                <input type={"checkbox"} checked={item.isChecked} onChange={() => {}}></input>
            </div>
            <div style={{ display: "flex", gap: "1em" }}>
                {children}
                <button
                    onClick={() => {
                        TodoDispatch({ type: "delete", id: item.id });
                    }}
                >
                    Delete
                </button>
            </div>
        </>
    );
};

const TodoLi: React.FC<{ item: TODO.Todos; children: React.ReactNode }> = ({ item, children }) => {
    return (
        <>
            <li
                key={item.id} //use maxWidth: "max-content" to restrict size to content
                style={{ maxWidth: "max-content", display: "flex", flexDirection: "column" }}
            >
                {children}
            </li>
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
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <h1>This is your todoList</h1>
                    <p>Btw, hi there {username}!</p>

                    <div>
                        <div>
                            {TodoState.todos.length > 0 && (
                                <TodoMap todoList={TodoState.todos} TodoDispatch={TodoDispatch} />
                            )}
                        </div>
                        <form style={{ display: "flex" }} onSubmit={handleSubmit}>
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
                </div>
            </div>
        </>
    );
}
