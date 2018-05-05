import { schemaSelectorCreator } from "./schema-selector-creator";
import { denormalize } from "normalizr";

export const createDenormalizeSelector = (getInput, getEntities, schema) => {
  const createEntitySelector = schemaSelectorCreator(schema);
  return createEntitySelector(getInput, getEntities, (input, entities) =>
    denormalize(input, schema, entities)
  );
};
