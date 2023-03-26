export type Todos = {
    id: number;
    desc: string;
    isChecked: boolean;
    isEditing: boolean;
};

export type TodoState = {
    todos: Todos[];
    // id: number;
    // desc: string;
    // isChecked: boolean;
    // isEditing: boolean;
    // isDeleted: boolean;
};

export type TodoActionTypes =
    | { type: "add"; id: number; desc: string; isChecked: boolean; isEditing: boolean; index: number }
    | { type: "delete"; id: number }
    | { type: "checked"; id: number; isChecked: boolean; index: number }
    | { type: "toggleEdit"; id: number; isEditing: boolean; index: number }
    | { type: "editDesc"; id: number; desc: string; index: number };

export function TodoReducer(state: TodoState, action: TodoActionTypes): TodoState {
    switch (action.type) {
        case "add":
            //! idk what cause something to call this 2 times, hence the below code to prevent that
            if (state.todos.length - 1 !== action.index) return state;
            const newTodos: Todos = {
                id: action.id,
                desc: action.desc,
                isChecked: action.isChecked,
                isEditing: action.isEditing,
            };
            var tempTodos = state.todos;
            tempTodos.push(newTodos);
            return { ...state, todos: tempTodos }; //need to return shallow copy of state to re-render!
        case "delete":
            tempTodos = state.todos.filter((item) => item.id !== action.id);
            return { ...state, todos: tempTodos };
        case "checked":
            // state.todos.forEach((item) => (item.id === action.id ? (item.isChecked = action.isChecked) : 0));
            tempTodos = state.todos;
            tempTodos[action.index].isChecked = action.isChecked;
            return { ...state, todos: tempTodos };
        case "toggleEdit":
            // state.todos.forEach((item) => (item.id === action.id ? (item.isEditing = action.isEditing) : 0));
            tempTodos = state.todos;
            tempTodos[action.index].isEditing = action.isEditing;
            return { ...state, todos: tempTodos };
        case "editDesc":
            // state.todos.forEach((item) => (item.id === action.id ? (item.desc = action.desc) : 0));
            tempTodos = state.todos;
            tempTodos[action.index].desc = action.desc;
            return { ...state, todos: tempTodos };
        default:
            return state;
    }
}
