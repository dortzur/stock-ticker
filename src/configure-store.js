import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./state";

const configureStore = preloadedState =>
  createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  );

export default configureStore;
