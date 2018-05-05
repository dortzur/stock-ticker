import { schema } from "normalizr";

export function traverseEntities(process, data) {
  if (data instanceof schema.Entity) {
    process(data);
  }
  if (isArray(data)) {
    traverseArray(process, data);
  } else if (typeof data === "object" && data !== null) {
    traverseObject(process, data);
  }
}

function traverseArray(process, arr) {
  arr.forEach(function(x) {
    traverseEntities(process, x);
  });
}

function traverseObject(process, obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      traverseEntities(process, obj[key]);
    }
  }
}

function isArray(o) {
  return Object.prototype.toString.call(o) === "[object Array]";
}
