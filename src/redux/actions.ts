import { ADD_TODO, SET_FILTER, TOGGLE_TODO } from "./actionTypes";

let nextTodoId = 0;
// Actions
export const addTodo = (content: string) => ({
    type: ADD_TODO,
    payload: {
        id: ++nextTodoId,
        content
    }
})

export const toggleTodo = (id: string) => ({
    type: TOGGLE_TODO,
    payload: { id }
});

export const setFilter = (filter: any) => ({ 
    type: SET_FILTER, 
    payload: { filter } 
});
