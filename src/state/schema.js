import { schema } from "normalizr";

const stockSchema = new schema.Entity("stocks", {});

const companySchema = new schema.Entity("companies", {
  stock: stockSchema
});

// Schemas for Github API responses.
export const Schemas = {
  STOCK: stockSchema,
  STOCK_ARRAY: [stockSchema],
  COMPANY: companySchema,
  COMPANY_ARRAY: [companySchema]
};
