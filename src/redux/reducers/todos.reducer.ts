import { createSlice } from '@reduxjs/toolkit'
import { AppStateKeyFeatureEnum } from '../app-feature-key.enums';

export const TodosSlice = createSlice({
    name: AppStateKeyFeatureEnum.ToDos,
    initialState: {
        addIds: [],
        byIds: {}
    } as {
        addIds: string[],
        byIds: Record<string, { content: string; completed: boolean }>
    },
    reducers: {
        addTodo: (state, action) => {
            const id = (Math.random() * 10).toString();
            const content = action.payload as string;
            state.addIds = [ ...state.addIds, id ];
            state.byIds = {
                ...state.byIds,
                [id]: {
                    content: content,
                    completed: false
                }
            }
            return state;
        },
        toggleTodo: (state, action) => {
            const id = action.payload;
            state.byIds = {
                ...state.byIds,
                [id]: {
                    ...state.byIds[id],
                    completed: !state.byIds[id].completed
                }
            }
            return state;
        }
    }
})

export const { addTodo, toggleTodo } = TodosSlice.actions

export default TodosSlice.reducer;