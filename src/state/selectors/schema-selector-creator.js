import { createSelectorCreator } from "reselect";
import { areArgumentsShallowlyEqual, equalityCheck, toEntity } from "./utils";
import { traverseEntities } from "../../utils/traverseEntities";

const getEntity = (id, schema, entities) => ({
  entity: entities[schema.key][id],
  schema
});

const getAffectedEntities = (id, schema, entities) => {
  const entity = getEntity(id, schema, entities);
  const childEntities = Object.entries(schema.schema).map(
    ([childKey, childSchema]) => {
      const entityId = entity.entity[childKey];
      return getEntity(entityId, childSchema, entities);
    }
  );
  return [entity, ...childEntities];
};

export function entityMemoize(func, schema) {
  let lastArgs = null;
  let lastEntities = null;
  let lastResult = null;
  let newResult = null;
  let lastResultCache = {};
  const rootSchema = Array.isArray(schema) ? schema[0] : schema;

  // we reference arguments instead of spreading them for performance reasons
  return function() {
    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
      // apply arguments instead of spreading for performance.

      newResult = func.apply(null, arguments);
      const newResultCache = toEntity(newResult);
      const [input, entities] = arguments;
      //do magic
      if (lastResult) {
        lastResult = input.map(id => {
          const affected = getAffectedEntities(id, rootSchema, entities);
          const didChange = affected.reduce((didChange, entityObj) => {
            if (didChange) return didChange;
            return (
              entities[entityObj.schema.key][
                entityObj.entity[entityObj.schema.idAttribute]
              ] !==
              lastEntities[entityObj.schema.key][
                entityObj.entity[entityObj.schema.idAttribute]
              ]
            );
          }, false);
          return didChange ? newResultCache[id] : lastResultCache[id];
        });
      } else {
        lastResult = newResult;
      }
      lastResultCache = toEntity(lastResult);
      lastArgs = arguments;
      lastEntities = entities;
    }

    return lastResult;
  };
}

export const schemaSelectorCreator = schema =>
  createSelectorCreator(entityMemoize, schema);
