import React from "react";
import { TodoActionTypes, TodoState } from "./TodoReducer";

export interface TodoContextProps {
    state: TodoState;
    dispatch: React.Dispatch<TodoActionTypes>;
}

export const TodoContext = React.createContext({} as TodoContextProps);
