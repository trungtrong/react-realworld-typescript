import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
//
import { AppStateKeyFeatureEnum } from './app-feature-key.enums';
import todosReducer from './todos/todos.reducer';
import visibilityFilterReducer from './visibilityHandler/visibilityFilter.reducer';

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


// Way 2:
// ...
const store =  configureStore({ 
  reducer: { 
    [AppStateKeyFeatureEnum.ToDos]: todosReducer,
    [AppStateKeyFeatureEnum.VisibilityFilter]: visibilityFilterReducer
  },
  middleware: middlewares
})

export type RootState = ReturnType<typeof store.getState>;
export default store;
