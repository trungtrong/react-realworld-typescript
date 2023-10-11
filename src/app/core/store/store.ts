import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
//
import { AppStateKeyFeatureEnum } from './app-feature-key.enums';
import todosReducer from './todos/todos.reducer';
import visibilityFilterReducer from './visibilityHandler/visibilityFilter.reducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const middlewares = [ thunk ];
 
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
 
  middlewares.push(logger);
}
/**
Way 1:
import { applyMiddleware, createStore } from "redux";

export default createStore(
    rootReducer,
    applyMiddleware(...middlewares)
);

*/


// Way 2: https://github.com/HospitalRun/hospitalrun-frontend/blob/master/src/shared/store/index.ts
// ...
const store =  configureStore({ 
  reducer: { 
    [AppStateKeyFeatureEnum.ToDos]: todosReducer,
    [AppStateKeyFeatureEnum.VisibilityFilter]: visibilityFilterReducer
  },
  middleware: middlewares
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
