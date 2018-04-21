import apiStocksResponse from "../../data/api-stocks-response";

export const INITIALIZE_STOCKS = "INITIALIZE_STOCKS";

export default (state = [], action) => {
  switch (action.type) {
    case INITIALIZE_STOCKS: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export const getApiStocks = () => ({
  type: INITIALIZE_STOCKS,
  payload: apiStocksResponse
});
