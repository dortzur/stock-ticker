import { createSelectorCreator } from "reselect";

import { areArgumentsShallowlyEqual, equalityCheck, toEntity } from "./utils";

export function entityMemoize(func, schema) {
  let lastArgs = null;
  let lastResult = null;
  let newResult = null;
  let resultCache = {};
  // we reference arguments instead of spreading them for performance reasons
  return function() {
    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
      // apply arguments instead of spreading for performance.
      newResult = func.apply(null, arguments);
      const newResultMap = toEntity(newResult);
      const [input, ...entities] = arguments;
      //do magic
      if (lastResult) {
        lastResult = input.map(
          id =>
            entities.reduce((didChange, entity, index) => {
              if (didChange) return didChange;
              return entity[id] !== lastArgs[index + 1][id];
            }, false)
              ? newResultMap[id]
              : resultCache[id]
        );
      } else {
        lastResult = newResult;
      }
      //hard coded update until magic works
      lastResult = newResult;

    }
    resultCache = toEntity(lastResult);
    lastArgs = arguments;
    return lastResult;
  };
}

export const schemaSelectorCreator = schema =>
  createSelectorCreator(entityMemoize, schema);
