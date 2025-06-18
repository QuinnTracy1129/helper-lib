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
import { useState } from 'react';
import Footer from './footer.jsx';
import Header from './header.jsx';
import Table from './table.jsx';

export default function DataTable({
  id = '', // identifier used for html `key`'s
  payload = [], // array of data that needs to be processed
  columns = [], // columns titles to be shown
  columnConfig = {}, // column title config
  rows = [], // each rows to be shown
  rowConfig = {}, // row content config
  rowActions = [], // action buttons for each row
  pageButtonRange = 3, // page button range to be shown
}) {
  const [currentPage, setCurrentPage] = useState(1),
    [maxItemPerPage, setMaxItemPerPage] = useState(() =>
      Number(localStorage.getItem('maxItemPerPage') || 10),
    );

  const handleMaxItemPerPageChange = (value) => {
    setMaxItemPerPage(value);
    localStorage.setItem('maxItemPerPage', value);
  };

  const isPayloadEmpty = !payload.length;

  return (
    <div>
      <Header
        isPayloadEmpty={isPayloadEmpty}
        maxItemPerPage={maxItemPerPage}
        handleMaxItemPerPageChange={handleMaxItemPerPageChange}
      />
      <Table
        id={id}
        payload={payload}
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
        totalEntries={payload.length}
        maxItemPerPage={maxItemPerPage}
        isPayloadEmpty={isPayloadEmpty}
      />
    </div>
  );
}
