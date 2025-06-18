export function paginateArray(array, currentPage, maxPage) {
  return array.slice((currentPage - 1) * maxPage, maxPage + (currentPage - 1) * maxPage);
}
