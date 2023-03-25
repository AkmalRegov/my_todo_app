import { useContext, useState, memo, useEffect } from "react";
import { LoginContext } from "../../context/Login/LoginContext";
import * as TODO from "../../context/Todo";

// type todos = {
//     id: number;
//     desc: string;
//     isChecked: boolean;
//     isEditing: boolean;
// };

// type dispatchTodoList = React.Dispatch<React.SetStateAction<todos[]>>;

// function toggleTodoEdit(todoList: todos[], item: todos, setTodoList: dispatchTodoList) {
//     const newTodos = [...todoList];
//     var currIndex = newTodos.findIndex((todo) => todo.id === item.id);
//     newTodos[currIndex].isEditing = !newTodos[currIndex].isEditing;
//     setTodoList(newTodos);
// }

// function handleDelete(todoList: todos[], setTodoList: dispatchTodoList, item: todos) {
//     setTodoList(todoList.filter((todo) => todo.id !== item.id));
// }

// function handleTodoDescChange(
//     todoList: todos[],
//     item: todos,
//     setTodoList: dispatchTodoList,
//     e: React.ChangeEvent<HTMLInputElement>,
// ) {
//     const newTodos = [...todoList];
//     var currIndex = newTodos.findIndex((todo) => todo.id === item.id);
//     newTodos[currIndex].desc = e.currentTarget.value;
//     setTodoList(newTodos);
// }

// type EditTodoProps = {
//     todoList: todos[];
//     item: todos;
//     setTodoList: dispatchTodoList;
// };

interface TodoProps {
    item: TODO.Todos;
    TodoDispatch: TODO.TodoContextProps["dispatch"];
}

const EditTodo: React.FC<TodoProps> = ({ item, TodoDispatch }) => {
    return (
        <>
            <form
                style={{ display: "flex", gap: "1em" }}
                onSubmit={(e) => {
                    TodoDispatch({ type: "toggleEdit", id: item.id, isEditing: !item.isEditing });
                }}
            >
                <input
                    type={"text"}
                    value={item.desc}
                    onChange={(e) => {
                        TodoDispatch({ type: "editDesc", id: item.id, desc: e.currentTarget.value });
                    }}
                />
                <button type="submit">Done</button>
                <button
                    onClick={(e) => {
                        TodoDispatch({ type: "delete", id: item.id });
                    }}
                >
                    Delete
                </button>
            </form>
        </>
    );
};

const DefaultTodo: React.FC<TodoProps> = ({ item, TodoDispatch }) => {
    return (
        <>
            <div style={{ display: "flex", gap: "1em" }}>
                <button
                    onClick={() => {
                        TodoDispatch({ type: "toggleEdit", id: item.id, isEditing: !item.isEditing });
                    }}
                >
                    Edit
                </button>
                <button
                    onClick={(e) => {
                        TodoDispatch({ type: "delete", id: item.id });
                    }}
                >
                    Delete
                </button>
            </div>
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
                {todoList.map((item) => {
                    return (
                        <li
                            key={item.id} //use maxWidth: "max-content" to restrict size to content
                            style={{ maxWidth: "max-content", display: "flex", flexDirection: "column" }}
                        >
                            <div
                                style={{ cursor: "pointer", maxWidth: "max-content" }}
                                onClick={() => {
                                    TodoDispatch({ type: "checked", id: item.id, isChecked: !item.isChecked });
                                }}
                            >
                                {item.desc}
                                <input type={"checkbox"} defaultChecked={item.isChecked}></input>
                            </div>
                            {item.isEditing ? (
                                <EditTodo item={item} TodoDispatch={TodoDispatch} />
                            ) : (
                                <DefaultTodo item={item} TodoDispatch={TodoDispatch} />
                            )}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};
memo(TodoMap);

export function TodoList() {
    const { state: loginState } = useContext(LoginContext);
    const { username } = loginState;
    const { state: TodoState, dispatch: TodoDispatch } = useContext(TODO.TodoContext);
    const [counter, setCounter] = useState(0);
    const [desc, setDesc] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setCounter(() => {
            return counter + 1;
        });
        TodoDispatch({ type: "add", id: counter, desc: desc, isChecked: false, isEditing: false });
        console.log(`The length of state.todos is: ${TodoState.todos.length}`);
        setDesc("");
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div
                    id="error-page"
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
                        <form
                            style={{ display: "flex" }}
                            onSubmit={(e) => {
                                e.preventDefault();
                                TodoDispatch({
                                    type: "add",
                                    id: counter,
                                    desc: desc,
                                    isChecked: false,
                                    isEditing: false,
                                });
                            }}
                        >
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
