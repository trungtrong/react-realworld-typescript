import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "./reducers";
import thunk from 'redux-thunk';

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
export default configureStore({ 
  reducer: rootReducer,
  middleware: middlewares
})