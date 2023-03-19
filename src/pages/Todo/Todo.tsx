import { useContext, useEffect, useState } from "react";
import LoginContext from "../../context/LoginContext";

type todos = {
    id: number;
    desc: string;
    isChecked: boolean;
};

export function TodoMap(todoList: todos[], setTodoList: React.Dispatch<React.SetStateAction<todos[]>>) {
    return (
        <>
            <ul>
                {todoList.map((item) => {
                    return (
                        <li
                            key={item.id}
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                const newTodos = [...todoList];
                                var currIndex = newTodos.findIndex((todo) => todo.id === item.id);
                                newTodos[currIndex].isChecked = !newTodos[currIndex].isChecked;
                                setTodoList(newTodos);
                            }}
                        >
                            {item.desc}
                            <input type={"checkbox"} checked={item.isChecked}></input>
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
            return [...prev, { id: counter + 1, desc: desc, isChecked: false }];
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
                                placeholder="add a todo name here!"
                                value={desc}
                                onChange={(e) => {
                                    setDesc(e.currentTarget.value);
                                }}
                            />
                            <button>Add</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
