export default function Footer({
  id,
  isLoading,
  currentPage,
  setCurrentPage,
  maxItemPerPage,
  totalEntries,
  isPayloadEmpty,
  pageButtonRange = 3, // Optional: how many page buttons to show
}) {
  const totalPages = Math.ceil(totalEntries / maxItemPerPage);
  const start = (currentPage - 1) * maxItemPerPage + 1;
  const end = Math.min(currentPage * maxItemPerPage, totalEntries);

  // Pagination range (e.g., show 3 pages before/after current)
  const getVisiblePages = () => {
    const range = [];
    const startPage = Math.max(1, currentPage - pageButtonRange);
    const endPage = Math.min(totalPages, currentPage + pageButtonRange);
    for (let i = startPage; i <= endPage; i++) range.push(i);
    return range;
  };

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      return;
    }

    console.log('own page');
  };

  return (
    <div
      className={`flex items-center justify-center 
        ${isLoading || !isPayloadEmpty ? 'sm:justify-between' : ''} mt-2`}
    >
      {isLoading && (
        <div className="animate-pulse h-5 rounded-xs bg-neutral-content w-96 hidden sm:block" />
      )}
      {!isPayloadEmpty && !isLoading && (
        <div className="text-neutral hidden sm:block">
          Showing&nbsp;<span className="tabular-nums">{start}</span>&nbsp;to&nbsp;
          <span className="tabular-nums">{end}</span>&nbsp;of&nbsp;
          <span className="tabular-nums">{totalEntries}</span>
          &nbsp;entries
        </div>
      )}
      <div className="join">
        <button
          disabled={isPayloadEmpty || currentPage <= 1 || isLoading}
          onClick={() => handlePageClick(currentPage - 1)}
          className="btn join-item btn-sm btn-outline btn-primary"
        >
          &lt;
        </button>

        {getVisiblePages().map((pageNum) => (
          <button
            key={`pageNavigation-${id}-${pageNum}`}
            disabled={isPayloadEmpty || isLoading}
            onClick={() => handlePageClick(pageNum)}
            className={`btn join-item btn-sm btn-outline ${
              pageNum === currentPage ? 'btn-active btn-primary' : 'btn-primary'
            } tabular-nums`}
          >
            {pageNum}
          </button>
        ))}

        <button
          disabled={isPayloadEmpty || currentPage >= totalPages || isLoading}
          onClick={() => handlePageClick(currentPage + 1)}
          className="btn join-item btn-sm btn-outline btn-primary"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
