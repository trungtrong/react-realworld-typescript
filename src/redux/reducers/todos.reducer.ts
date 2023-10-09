import { ADD_TODO, TOGGLE_TODO } from "../actionTypes";

const initialState = {
    addIds: [],
    byIds: {}
} as {
    addIds: string[],
    byIds: Record<string, { completed: boolean }>
}

export default function TodosReducer(state = initialState, action: { type: string; payload: any }) {
    switch (action.type) {
        case ADD_TODO: {
            const { id, content } = action.payload;
            return {
                ...state,
                addIds: [ ...state.addIds, id ],
                byIds: {
                    ...state.byIds,
                    [id]: {
                        content,
                        completed: false
                    }
                }
            };
        }
        case TOGGLE_TODO: {
            const { id } = action.payload;
            return {
                    ...state,
                    byIds: {
                        ...state.byIds,
                        [id]: {
                            ...state.byIds[id],
                            completed: !state.byIds[id].completed
                        }
                    }
            }
        }
        default:
            return state;
    }
}