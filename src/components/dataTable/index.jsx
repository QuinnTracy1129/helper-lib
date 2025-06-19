// DataTable Features:
// Keyword search
// Ability to paginate data
// Sort items per column

// Cell Features:
// can pass texts to be outputted
// format outputs
// make them clickable
// can output custom components or html
// can pass custom CSS
import { useEffect, useMemo, useRef, useState } from 'react';
import Footer from './footer.jsx';
import Header from './header.jsx';
import Table from './table.jsx';
import { useDebounce } from '../useDebounce.jsx';
import { keywordSearch } from '../../utils/keywordSearch.js';

export function DataTable({
  id = '', // identifier used for html `key`'s
  payload = [], // array of data that needs to be processed
  columns = [], // columns titles to be shown
  columnConfig = {}, // column title config
  rows = [], // each rows to be shown
  rowConfig = {}, // row content config
  rowActions = [], // action buttons for each row
  pageButtonRange = 3, // page button range to be shown
  customSearch,
}) {
  const [currentPage, setCurrentPage] = useState(1),
    [maxItemPerPage, setMaxItemPerPage] = useState(() =>
      Number(localStorage.getItem('maxItemPerPage') || 10),
    ),
    [searchStr, setSearchStr] = useState(''),
    debouncedSearchStr = useDebounce(searchStr),
    isRemoteSearch = typeof customSearch === 'function',
    hasSearched = useRef(false); // this is just a trigger to NOT call search on initial render

  useEffect(() => {
    if (debouncedSearchStr.trim() !== '') hasSearched.current = true;
  }, [debouncedSearchStr]);

  useEffect(() => {
    if (!isRemoteSearch || !hasSearched.current) return;

    customSearch(debouncedSearchStr);
  }, [debouncedSearchStr, isRemoteSearch, customSearch]);

  const filteredPayload = useMemo(() => {
    if (isRemoteSearch) return payload;
    return keywordSearch(payload, debouncedSearchStr);
  }, [payload, debouncedSearchStr, isRemoteSearch]);

  const handleMaxItemPerPageChange = (value) => {
    setMaxItemPerPage(value);
    localStorage.setItem('maxItemPerPage', value);
  };

  const isPayloadEmpty = !filteredPayload.length;

  return (
    <div>
      <Header
        isPayloadEmpty={isPayloadEmpty}
        maxItemPerPage={maxItemPerPage}
        handleMaxItemPerPageChange={handleMaxItemPerPageChange}
        searchStr={searchStr}
        setSearchStr={setSearchStr}
      />
      <Table
        id={id}
        payload={filteredPayload}
        columns={columns}
        columnConfig={columnConfig}
        rows={rows}
        rowConfig={rowConfig}
        rowActions={rowActions}
        currentPage={currentPage}
        maxItemPerPage={maxItemPerPage}
        isPayloadEmpty={isPayloadEmpty}
      />
      <Footer
        pageButtonRange={pageButtonRange}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalEntries={filteredPayload.length}
        maxItemPerPage={maxItemPerPage}
        isPayloadEmpty={isPayloadEmpty}
      />
    </div>
  );
}
