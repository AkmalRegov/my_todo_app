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
    | { type: "add"; id: number; desc: string; isChecked: boolean; isEditing: boolean; index: number }
    | { type: "delete"; id: number }
    | { type: "checked"; id: number; isChecked: boolean; index: number }
    | { type: "toggleEdit"; id: number; isEditing: boolean; index: number }
    | { type: "editDesc"; id: number; desc: string; index: number }
    | { type: "userLogOut" };

export function TodoReducer(state: TodoState, action: TodoActionTypes): TodoState {
    switch (action.type) {
        case "add":
            //! idk what cause something to call this 2 times, hence the below code to prevent that
            // if (state.todos.length - 1 !== action.index) return state;
            //! my idea is that a creation of Todos object here causes it to be called 2 times
            // const newTodos: Todos = {
            //     id: action.id,
            //     desc: action.desc,
            //     isChecked: action.isChecked,
            //     isEditing: action.isEditing,
            // };
            // console.log(`action.id passed was: ${action.id}`);
            // var tempTodos = state.todos;
            // tempTodos.push(newTodos);
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: action.id,
                        desc: action.desc,
                        isChecked: action.isChecked,
                        isEditing: action.isEditing,
                    },
                ],
            }; //need to return shallow copy of state to re-render!
        case "delete":
            var tempTodos = state.todos.filter((item) => item.id !== action.id);
            return { ...state, todos: tempTodos };
        case "checked":
            tempTodos = state.todos;
            tempTodos[action.index].isChecked = action.isChecked;
            return { ...state, todos: tempTodos };
        case "toggleEdit":
            tempTodos = state.todos;
            tempTodos[action.index].isEditing = action.isEditing;
            return { ...state, todos: tempTodos };
        case "editDesc":
            tempTodos = state.todos;
            tempTodos[action.index].desc = action.desc;
            return { ...state, todos: tempTodos };
        case "userLogOut":
            tempTodos = [];
            return { ...state, todos: tempTodos };
        default:
            return state;
    }
}
