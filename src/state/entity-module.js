import { INITIALIZE_STOCKS } from "./stock-module";

export default (state = { companies: {}, stocks: {} }, action) => {
  switch (action.type) {
    case INITIALIZE_STOCKS: {
      return state;
    }

    default: {
      return state;
    }
  }
};
