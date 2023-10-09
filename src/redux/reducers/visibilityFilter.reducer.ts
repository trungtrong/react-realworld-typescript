import { SET_FILTER } from "../actionTypes";

export const VISIBILITY_FILTERS: Record<string, string> = {
  ALL: "all",
  COMPLETED: "completed",
  INCOMPLETE: "incomplete"
};

const initialState = VISIBILITY_FILTERS.ALL;

const VisibilityFilterReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
};

export default VisibilityFilterReducer;
