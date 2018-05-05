import apiStocksResponse from "../data/api-stocks-response";
import { Schemas } from "./schema";
import { denormalize, normalize } from "normalizr";
import { createSelector } from "reselect";
import { createEntityIdSelector } from "./selectors/entity-id-selector";
import { schemaSelectorCreator } from "./selectors/schema-selector-creator";
import qs from "query-string";
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
const getEntities = state => state.entities;

const createEntitySelector = schemaSelectorCreator(Schemas.COMPANY_ARRAY);

export const companyStocksSelector = createSelector(
  getStockList,
  getCompanyEntities,
  getStockEntities,
  (stockList, companies, stocks) =>
    denormalize(stockList, Schemas.COMPANY_ARRAY, { companies, stocks })
);

const companyStocksEntitySelector = createEntitySelector(
  getStockList,
  getEntities,
  (stockList, entities) =>
    denormalize(stockList, Schemas.COMPANY_ARRAY, entities)
);
const useEntitySelector = !!qs.parse(window.location.search).entitySelector;
export const getCompanyStocks = useEntitySelector
  ? companyStocksEntitySelector
  : companyStocksSelector;
