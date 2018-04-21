import apiStocksResponse from "../data/api-stocks-response";
import { Schemas } from "./schema";
import { denormalize, normalize } from "normalizr";
import { createSelector } from "reselect";

export const INITIALIZE_STOCKS = "INITIALIZE_STOCKS";

export default (state = [], action) => {
  switch (action.type) {
    case INITIALIZE_STOCKS: {
      return normalize(action.payload, Schemas.COMPANY_ARRAY).result;
    }
    default: {
      return state;
    }
  }
};

export const fetchApiStocks = () => ({
  type: INITIALIZE_STOCKS,
  payload: apiStocksResponse
});

const getCompanyEntities = state => state.entities.companies;
const getStockEntities = state => state.entities.stocks;
const getStockList = state => state.stocks;

export const getCompanyStocks = createSelector(
  getCompanyEntities,
  getStockEntities,
  getStockList,
  (companies, stocks, stockList) =>
    denormalize(stockList, Schemas.COMPANY_ARRAY, { companies, stocks })
);
