import apiStocksResponse from "../data/api-stocks-response";
import { Schemas } from "./schema";
import { denormalize, normalize } from "normalizr";
import { createSelector } from "reselect";
import { schemaSelectorCreator } from "./selectors/schema-selector-creator";
import qs from "query-string";
import { createDenormalizeSelector } from "./selectors/create-denormalize-selector";
window.Schemas = Schemas;
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

const getCompanyStockEntities = state => ({
  companies: state.entities.companies,
  stocks: state.entities.stocks,
  earnings: state.entities.earnings
});

const createEntitySelector = schemaSelectorCreator(Schemas.COMPANY_ARRAY);

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

const companyStocksEntitySelector = createDenormalizeSelector(
  getStockList,
  Schemas.COMPANY_ARRAY,
  "companies",
  "stocks",
  "earnings"
);
const useEntitySelector = !!qs.parse(window.location.search).entitySelector;
export const getCompanyStocks = useEntitySelector
  ? companyStocksEntitySelector
  : companyStocksSelector;
