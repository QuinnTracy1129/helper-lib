import map1 from './map1.json' assert { type: 'json' };
import map2 from './map2.json' assert { type: 'json' };

export function _objectMapper(type) {
  const mappings = {
    map1,
    map2,
  };

  return mappings[type] || null;
}
