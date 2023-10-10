import { createSelector } from 'reselect'
import { AppStateKeyFeatureEnum } from "./app-feature-key.enums";
import { VISIBILITY_FILTERS } from "./visibilityHandler/visibilityFilter.reducer";

const getTodosState = (store: any) => store[AppStateKeyFeatureEnum.ToDos];
export const getVisibilityFilterState = (state: any) => state[AppStateKeyFeatureEnum.VisibilityFilter];

export const getTodoLists = createSelector(
  [getTodosState],
  (todos) => {
    console.log(getTodosState(todos));
    console.log(getTodosState(todos).addIds);
    return !!todos.addIds?.length ? todos.addIds : []
  }
)

export const getTodoById = (todos: any[], id: string) => {
    // @ts-ignore
    return todos ? { ...todos.byIds[id], id } : {};
}
/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getTodos = createSelector(
  [getTodosState],
  (todos) => {
    console.log(getTodosState(todos));

    return !!todos.addIds?.length 
      ? todos.addIds.map((id: string) => getTodoById(todos, id))
      : []
  }
)

export const getVisibilityFilter = createSelector(
  [getVisibilityFilterState],
  (visibilityFilter) => {
    return visibilityFilter;
  }
)

// A library for creating memoized "selector" functions
export const getTodosByVisibilityFilter = createSelector(
  [getVisibilityFilterState, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case VISIBILITY_FILTERS.COMPLETED:
        return todos.filter((todo: any) => todo.completed);
      case VISIBILITY_FILTERS.INCOMPLETE:
        return todos.filter((todo: any) => !todo.completed);
      case VISIBILITY_FILTERS.ALL:
      default:
        return todos;
    }
  }
)