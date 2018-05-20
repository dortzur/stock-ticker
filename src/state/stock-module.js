import apiStocksResponse from "../data/api-stocks-response";
import { Schemas } from "./schema";
import { denormalize, normalize } from "normalizr";
import { createSelector } from "reselect";
import { qs } from "../utils";
import renorm from "renorm";
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

const getStockList = state => state.stocks;
const getCompanyEntities = state => state.entities.companies;
const getStockEntities = state => state.entities.stocks;
const getEarningsEntities = state => state.entities.earnings;

export const companyStocksSelector = createSelector(
  getStockList,
  getCompanyEntities,
  getStockEntities,
  getEarningsEntities,
  (stockList, companies, stocks, earnings) =>
    denormalize(stockList, Schemas.COMPANY_ARRAY, {
      companies,
      stocks,
      earnings
    })
);

const companyStocksEntitySelector = renorm(getStockList, Schemas.COMPANY_ARRAY);

const useRenorm = !!qs.parse(window.location.search).renorm;
export const getCompanyStocks = useRenorm
  ? companyStocksEntitySelector
  : companyStocksSelector;
