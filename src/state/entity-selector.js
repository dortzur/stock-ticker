import { createSelectorCreator } from "reselect";

function defaultEqualityCheck(a, b) {
  return a === b;
}
function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
  if (prev === null || next === null || prev.length !== next.length) {
    return false;
  }

  // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
  const length = prev.length;
  for (let i = 0; i < length; i++) {
    if (!equalityCheck(prev[i], next[i])) {
      return false;
    }
  }

  return true;
}

const toEntity = arr =>
  arr.reduce((entityMap, item) => {
    entityMap[item.id] = item;
    return entityMap;
  }, {});

export function entityMemoize(func, equalityCheck = defaultEqualityCheck) {
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
    }
    resultCache = toEntity(lastResult);
    lastArgs = arguments;
    return lastResult;
  };
}

// const createEntitySelector = createSelectorCreator(entityMemoize);
export const createEntitySelector = createSelectorCreator(entityMemoize);
