import { schema } from "normalizr";

window.BABA = schema;

const earningSchema = new schema.Entity(
  "earnings",
  {},
  { idAttribute: "reportId" }
);
const stockSchema = new schema.Entity("stocks", {
  lastEarningsReport: earningSchema,
  quarterEarnings: [earningSchema]
});

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
