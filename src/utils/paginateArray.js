export function paginateArray(array, currentPage, maxItemPerPage) {
  return array.slice(
    (currentPage - 1) * maxItemPerPage,
    maxItemPerPage + (currentPage - 1) * maxItemPerPage,
  );
}
