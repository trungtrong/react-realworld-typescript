import { AppStateKeyFeatureEnum } from "./app-feature-key.enums";
import { VISIBILITY_FILTERS } from "./reducers/visibilityFilter.reducer";

export const getTodosState = (store: any) => {
    return store[AppStateKeyFeatureEnum.ToDos];
};

export const getTodoList = (store: any) => {
    console.log(getTodosState(store));
    console.log(getTodosState(store).addIds);
    return !!getTodosState(store)?.addIds?.length ? getTodosState(store).addIds : []
}

export const getTodoById = (store: any, id: string) => {
    return getTodosState(store) ? { ...getTodosState(store).byIds[id], id } : {};
}
/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */

export const getTodos = (store: any) => {
    return getTodoList(store).map((id: string) => getTodoById(store, id))
};

  export const getTodosByVisibilityFilter = (store: any, visibilityFilter: any) => {
    const allTodos = getTodos(store);
    switch (visibilityFilter) {
      case VISIBILITY_FILTERS.COMPLETED:
        return allTodos.filter((todo: any) => todo.completed);
      case VISIBILITY_FILTERS.INCOMPLETE:
        return allTodos.filter((todo: any) => !todo.completed);
      case VISIBILITY_FILTERS.ALL:
      default:
        return allTodos;
    }
  };