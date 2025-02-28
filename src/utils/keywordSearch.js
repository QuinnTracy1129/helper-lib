export function keywordSearch(array = [], keyword) {
  return array.filter((item) => {
    if (typeof item === 'object') {
      let _item = Array.isArray(item) ? item : Object.values(item);

      return keywordSearch(_item, keyword).length > 0;
    }

    return String(item).toLowerCase().includes(String(keyword).toLowerCase());
  });
}
