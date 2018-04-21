import apiStocksResponse from "../data/api-stocks-response";
import { Schemas } from "./schema";
import { denormalize, normalize } from "normalizr";
import { createSelector, createSelectorCreator } from "reselect";

function areArgumentsShallowlyEqual(cache, args) {
  // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
  const length = args.length;
  for (let i = 0; i < length; i++) {
    if (!cache.has(args[i])) {
      return false;
    }
  }
  return true;
}

function entityMemoize(func) {
  const cache = new Map();
  window.__CACHE__ = cache;
  // we reference arguments instead of spreading them for performance reasons
  return function() {
    if (!areArgumentsShallowlyEqual(cache, arguments)) {
      // apply arguments instead of spreading for performance.
      const result = func.apply(null, arguments);
      [...arguments].forEach(arg => {
        cache.set(arg, result);
      });
    }
    return cache.get(arguments[0]);
  };
}

const createEntitySelector = createSelectorCreator(entityMemoize);

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

const getStockById = (state, id) => state.entities.stocks[id];
const getCompanyById = (state, id) => state.entities.companies[id];

const getCompanyStock = createEntitySelector(
  getCompanyById,
  getStockById,
  (company, stock) => {
    return denormalize(company.symbol, Schemas.COMPANY, {
      companies: { [company.symbol]: company },
      stocks: { [company.symbol]: stock }
    });
  }
);
export const getCompanyStocks = createSelector(
  getStockList,
  getCompanyEntities,
  getStockEntities,
  (stockList, companies, stocks) =>
    stockList.map(symbol =>
      getCompanyStock({ entities: { companies, stocks } }, symbol)
    )
);
