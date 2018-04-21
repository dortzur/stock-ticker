import { combineReducers } from "redux/index";

export const rootReducer = combineReducers({
  stocks: stockReducer,
  entities: entityReducer
});
