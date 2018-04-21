import { INITIALIZE_STOCKS } from "./stock-module";
import { normalize } from "normalizr";
import { Schemas } from "./schema";

export default (state = { companies: {}, stocks: {} }, action) => {
  switch (action.type) {
    case INITIALIZE_STOCKS: {
      const { entities } = normalize(action.payload, Schemas.COMPANY_ARRAY);
      return { ...state, ...entities };
    }
    default: {
      return state;
    }
  }
};
