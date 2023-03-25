import { useReducer } from "react";
import { TodoContext, TodoContextProps } from "./TodoContext";
import { TodoReducer, TodoState } from "./TodoReducer";

export const initialState: TodoState = {
    todos: [],
};

export interface TodoProviderProps {
    children: React.ReactNode;
}

const TodoProvider: React.FC<TodoProviderProps> = ({ children }: TodoProviderProps) => {
    const [state, dispatch] = useReducer(TodoReducer, initialState);
    const todoValue: TodoContextProps = {
        state: state,
        dispatch: dispatch,
    };
    return <TodoContext.Provider value={todoValue}>{children}</TodoContext.Provider>;
};

export default TodoProvider;
