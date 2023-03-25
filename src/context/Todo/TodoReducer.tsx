export type Todos = {
    id: number;
    desc: string;
    isChecked: boolean;
    isEditing: boolean;
};

export type TodoState = {
    todos: Todos[];
};

export type TodoActionTypes =
    | { type: "add"; id: number; desc: string; isChecked: boolean; isEditing: boolean }
    | { type: "delete"; id: number }
    | { type: "checked"; id: number; isChecked: boolean }
    | { type: "toggleEdit"; id: number; isEditing: boolean }
    | { type: "editDesc"; id: number; desc: string };

export function TodoReducer(state: TodoState, action: TodoActionTypes): TodoState {
    switch (action.type) {
        case "add":
            const newTodos: Todos = {
                id: action.id,
                desc: action.desc,
                isChecked: action.isChecked,
                isEditing: action.isEditing,
            };
            console.log(`todos is: ${newTodos}`);
            state.todos = [...state.todos, newTodos];
            return state;
        case "delete":
            state.todos = state.todos.filter((item) => item.id !== action.id);
            return state;
        case "checked":
            state.todos.map((item) => (item.id === action.id ? (item.isChecked = action.isChecked) : 0));
            return state;
        case "toggleEdit":
            state.todos.map((item) => (item.id === action.id ? (item.isEditing = action.isEditing) : 0));
            return state;
        case "editDesc":
            state.todos.map((item) => (item.id === action.id ? (item.desc = action.desc) : 0));
            return state;
        default:
            return state;
    }
}
