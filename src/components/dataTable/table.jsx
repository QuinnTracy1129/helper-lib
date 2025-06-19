import { paginateArray } from 'helper-lib/utils';
import { useMemo } from 'react';

const Head = ({ id = '', columns = [], columnConfig, showAction = false }) => {
  const {
    textColor = '', // custom text color for whole header
    bgColor = 'bg-secondary', // custom bg color for whole header
    showIndex = false, // identifies if we will show index
    globalColClassname = '', // applied for each `th`
  } = columnConfig;

  return (
    <thead>
      <tr className={`${bgColor} ${textColor}`}>
        {showIndex && <th className={`${globalColClassname} tabular-nums`} />}
        {columns.map(({ text = '', style = {}, className = '', condition = () => true }, index) => {
          if (!condition()) return null;

          return (
            <th
              key={`col-${id}-${index}`}
              style={style}
              className={`${globalColClassname} ${className}`}
            >
              {text}
            </th>
          );
        })}
        {showAction && <th className={globalColClassname} />}
      </tr>
    </thead>
  );
};

const Body = ({
  isLoading = false,
  id = '',
  showIndex = false,
  payload = [],
  headerCount,
  rows = [],
  rowConfig = {},
  rowActions = [],
  showAction = false,
  currentPage,
  maxItemPerPage,
  isPayloadEmpty,
}) => {
  const paginatedData = useMemo(
    () => paginateArray(payload, currentPage, maxItemPerPage),
    [payload, currentPage, maxItemPerPage],
  );

  const expectedColumnSpan = headerCount + (showIndex ? 1 : 0) + (rowActions.length ? 1 : 0);

  if (isLoading)
    return Array.from({ length: maxItemPerPage }).map((_, index) => {
      return (
        <tr key={`skeleton-${id}-${index}`} className="animate-pulse">
          <td colSpan={expectedColumnSpan}>
            <div className="h-4 md:h-6 rounded bg-neutral-content w-full" />
          </td>
        </tr>
      );
    });

  if (isPayloadEmpty)
    return (
      <tr>
        <td colSpan={expectedColumnSpan} className="text-center border-b border-gray-300">
          No recent entries for <span className="font-semibold">{id}</span>
        </td>
      </tr>
    );

  const {
    textColor = '', // custom text color for each row
    bgColor = '', // custom bg color for each row
    globalRowClassname = '', // applied for each `td`
  } = rowConfig;

  return paginatedData.map((obj, x) => {
    const globalIndex = (currentPage - 1) * maxItemPerPage + x;

    const renderCell = (_, objKey, format, isOptional) => {
      const keyExists = Object.prototype.hasOwnProperty.call(obj, objKey);

      // if key does not exist and is required, return fallback
      if (!keyExists && !isOptional)
        return <kbd className="kbd kbd-sm">{objKey} does not exist</kbd>;

      // if key does not exist but its optional, just return empty string
      if (!keyExists && isOptional) return '';

      const objValue = obj[objKey];

      const safeFormat = format ?? ((val) => val);

      return safeFormat(objValue, obj, globalIndex);
    };

    return (
      <tr
        key={`row-${id}-${globalIndex}`}
        className={`${bgColor} ${textColor} last:border-b last:border-gray-300`}
      >
        {showIndex && <td className={`${globalRowClassname} tabular-nums`}>{globalIndex + 1}</td>}
        {rows.map(
          (
            {
              objKey,
              format,
              isOptional = false,
              condition = () => true,
              style = {},
              className = '',
              // if `customRender` is passed `objKey`, `format` and `isOptional` are obsolete
              customRender,
            },
            y,
          ) => {
            if (!condition(obj)) return null;

            const safeRender = customRender ?? renderCell;

            return (
              <td
                key={`cell-${id}-${globalIndex}-${y}`}
                style={style}
                className={`${globalRowClassname} ${className}`}
              >
                {safeRender(obj, objKey, format, isOptional)}
              </td>
            );
          },
        )}
        {showAction &&
          rowActions.map(({ icon: Icon, text, onClick, className, condition = () => true }, y) => {
            if (!condition(obj)) return null;

            return (
              <td key={`action-${id}-${globalIndex}-${y}`} className={globalRowClassname}>
                <button
                  onClick={() => onClick(obj)}
                  className={`btn btn-sm lg:btn-md ${className}`}
                >
                  <Icon />
                  {text && <span className="hidden lg:block">{text}</span>}
                </button>
              </td>
            );
          })}
      </tr>
    );
  });
};

export default function Table({
  isLoading,
  id,
  payload,
  columns = [],
  columnConfig,
  rows,
  rowConfig,
  rowActions = [],
  currentPage,
  maxItemPerPage,
  isPayloadEmpty,
  zebra,
}) {
  const showAction = Boolean(rowActions.length);

  return (
    <table className={`table table-auto table-md ${zebra && 'table-zebra'}`}>
      <Head id={id} columns={columns} columnConfig={columnConfig} showAction={showAction} />
      <tbody>
        <Body
          isLoading={isLoading}
          id={id}
          headerCount={columns.length}
          showIndex={columnConfig.showIndex}
          payload={payload}
          rows={rows}
          rowConfig={rowConfig}
          rowActions={rowActions}
          showAction={showAction}
          currentPage={currentPage}
          maxItemPerPage={maxItemPerPage}
          isPayloadEmpty={isPayloadEmpty}
        />
      </tbody>
    </table>
  );
}
