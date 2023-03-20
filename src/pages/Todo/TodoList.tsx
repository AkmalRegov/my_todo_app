import { useContext, useEffect, useState } from "react";
import LoginContext from "../../context/LoginContext";

type todos = {
    id: number;
    desc: string;
    isChecked: boolean;
    isEditing: boolean;
};

type dispatchTodoList = React.Dispatch<React.SetStateAction<todos[]>>;

function toggleTodoEdit(todoList: todos[], item: todos, setTodoList: dispatchTodoList) {
    const newTodos = [...todoList];
    var currIndex = newTodos.findIndex((todo) => todo.id === item.id);
    newTodos[currIndex].isEditing = !newTodos[currIndex].isEditing;
    setTodoList(newTodos);
}

function handleDelete(todoList: todos[], setTodoList: dispatchTodoList, item: todos) {
    setTodoList(todoList.filter((todo) => todo.id !== item.id));
}

function handleTodoDescChange(
    todoList: todos[],
    item: todos,
    setTodoList: dispatchTodoList,
    e: React.ChangeEvent<HTMLInputElement>,
) {
    const newTodos = [...todoList];
    var currIndex = newTodos.findIndex((todo) => todo.id === item.id);
    newTodos[currIndex].desc = e.currentTarget.value;
    setTodoList(newTodos);
}

export function TodoMap(todoList: todos[], setTodoList: dispatchTodoList) {
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
                                    const newTodos = [...todoList];
                                    var currIndex = newTodos.findIndex((todo) => todo.id === item.id);
                                    newTodos[currIndex].isChecked = !newTodos[currIndex].isChecked;
                                    setTodoList(newTodos);
                                }}
                            >
                                {item.desc}
                                <input type={"checkbox"} checked={item.isChecked}></input>
                            </div>
                            {item.isEditing ? (
                                <>
                                    <form
                                        style={{ display: "flex", gap: "1em" }}
                                        onSubmit={(e) => {
                                            toggleTodoEdit(todoList, item, setTodoList);
                                        }}
                                    >
                                        <input
                                            type={"text"}
                                            value={item.desc}
                                            onChange={(e) => {
                                                handleTodoDescChange(todoList, item, setTodoList, e);
                                            }}
                                        />
                                        <button type="submit">Done</button>
                                        <button
                                            onClick={(e) => {
                                                handleDelete(todoList, setTodoList, item);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <div style={{ display: "flex", gap: "1em" }}>
                                        <button
                                            onClick={() => {
                                                toggleTodoEdit(todoList, item, setTodoList);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                handleDelete(todoList, setTodoList, item);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export function TodoList() {
    const { state } = useContext(LoginContext);
    const [counter, setCounter] = useState(0);
    const [desc, setDesc] = useState("");
    const [todoList, setTodoList] = useState<todos[]>([]);
    const { username } = state;

    useEffect(() => {}, [todoList, setTodoList]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setCounter(() => {
            return counter + 1;
        });
        setTodoList((prev) => {
            return [...prev, { id: counter + 1, desc: desc, isChecked: false, isEditing: false }];
        });
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
                        <div>{todoList.length > 0 && TodoMap(todoList, setTodoList)}</div>
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
