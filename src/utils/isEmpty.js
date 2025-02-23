// val = any value that needs to be checked if empty
// falsy value such as

export function isEmpty(val) {
  switch (typeof val) {
    case 'undefined':
      return true;
    case 'boolean':
    case 'number':
    case 'function':
      return true;
    case 'string':
      return val.length === 0;
    case 'object':
      if (!val) return true;
      if (Array.isArray(val)) return val.length === 0;
      if (val instanceof Map || val instanceof Set) return val.size === 0;
      return Object.keys(val).length === 0;
    default:
      return false;
  }
}
