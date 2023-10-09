import { combineReducers } from "redux";
import VisibilityFilterReducer from "./visibilityFilter.reducer";
import TodosReducer from "./todos.reducer";
import { AppStateKeyFeatureEnum } from "../app-feature-key.enums";

export default combineReducers({ 
    [AppStateKeyFeatureEnum.ToDos]: TodosReducer,
    [AppStateKeyFeatureEnum.VisibilityFilter]: VisibilityFilterReducer
});
