import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AppStateKeyFeatureEnum } from '../app-feature-key.enums';

// Define a type for the slice state
interface ITodosState {
    addIds: string[];
    byIds: Record<string, { content: string; completed: boolean }>
}
  
// Define the initial state using that type
const initialState: ITodosState = {
    addIds: [],
    byIds: {}
}

export const TodosSlice = createSlice({
    name: AppStateKeyFeatureEnum.ToDos,
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const id = (Math.random() * 10).toString();
            const content = action.payload;
            state.addIds = [ ...state.addIds, id ];
            state.byIds = {
                ...state.byIds,
                [id]: {
                    content: content,
                    completed: false
                }
            }
        },
        toggleTodo: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.byIds[id] = {
                ...state.byIds[id],
                completed: !state.byIds[id].completed
            }
        }
    }
})


export default TodosSlice.reducer;