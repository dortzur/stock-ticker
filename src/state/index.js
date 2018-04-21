import { combineReducers } from "redux";
import stocks from "./stock-module";
import entities from "./entity-module";
export const rootReducer = combineReducers({
  stocks,
  entities
});
