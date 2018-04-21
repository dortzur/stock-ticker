import { combineReducers } from "redux/index";

const INITIALIZE = "INITIALIZE";

const stockReducer = (state = [], action) => {
  switch (action.type) {
    case INITIALIZE: {
      return state;
    }
    default: {
      return state;
    }
  }
};

const entityReducer = (state = { companies: {}, stocks: {} }, action) => {
  switch (action.type) {
    case INITIALIZE: {
      return state;
    }

    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  stocks: stockReducer,
  entities: entityReducer
});
