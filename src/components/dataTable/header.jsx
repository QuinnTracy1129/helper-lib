import { useEffect, useRef } from 'react';

const paginationOptions = [5, 10, 25, 50, 100];

export default function Header({
  id,
  isLoading,
  isPayloadEmpty,
  maxItemPerPage,
  handleMaxItemPerPageChange,
  searchStr,
  setSearchStr,
  removeSearch,
}) {
  const dataTableSearchRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        dataTableSearchRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, []);

  return (
    <div className="flex flex-col-reverse sm:flex-row items-center justify-between mb-2">
      <div>
        {!removeSearch && (
          <label className="input focus-within:outline-0 w-full lg:w-96 transition-all rounded-none">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              // only disable the search if the payload is empty and we are not searching
              disabled={(isPayloadEmpty && !searchStr) || isLoading}
              ref={dataTableSearchRef}
              type="search"
              value={searchStr}
              onChange={({ target }) => setSearchStr(target.value)}
              className="grow"
              placeholder="Keyword Search..."
            />
            <kbd className="kbd kbd-sm">Ctrl</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </label>
        )}
      </div>

      <div className="flex items-center">
        <fieldset className="fieldset">
          <select
            disabled={isPayloadEmpty || isLoading}
            value={String(maxItemPerPage)}
            onChange={({ target }) => handleMaxItemPerPageChange(Number(target.value))}
            className="select rounded-none w-full focus:outline-0"
          >
            {paginationOptions.map((value, index) => (
              <option key={`page-options-${id}-${index}`} value={value}>
                {value}
              </option>
            ))}
          </select>
        </fieldset>
        <div>&nbsp;entries per page</div>
      </div>
    </div>
  );
}
