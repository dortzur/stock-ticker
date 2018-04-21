import { INITIALIZE_STOCKS } from "./stock-module";
import { normalize } from "normalizr";
import { Schemas } from "./schema";
import randomInt from "random-int";

const UPDATE_RANDOM_STOCK_PRICE = "UPDATE_RANDOM_STOCK_PRICE";

export const updateSingleStock = () => (dispatch, getState) => {
  const randomSymbol = getState().stocks[1];
  const randomPrice = randomInt(30, 1000);
  dispatch({
    type: UPDATE_RANDOM_STOCK_PRICE,
    payload: {
      symbol: randomSymbol,
      price: randomPrice
    }
  });
};

export default (state = { companies: {}, stocks: {} }, action) => {
  switch (action.type) {
    case INITIALIZE_STOCKS: {
      const { entities } = normalize(action.payload, Schemas.COMPANY_ARRAY);
      return { ...state, ...entities };
    }
    case UPDATE_RANDOM_STOCK_PRICE: {
      const { symbol, price } = action.payload;
      const stock = { ...state.stocks[symbol] };
      const stocks = { ...state.stocks };

      stock.price = price;
      stocks[symbol] = stock;

      return { ...state, stocks };
    }

    default: {
      return state;
    }
  }
};
