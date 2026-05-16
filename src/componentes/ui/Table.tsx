import React from "react";

export type Column<T> = {
  key: string;
  header: React.ReactNode;
  width?: string;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  className?: string;
  rowKey?: (row: T) => string | number;
  onRowClick?: (row: T) => void;
  emptyPlaceholder?: React.ReactNode;
};

export function Table<T>({
  columns,
  data,
  className = "",
  rowKey,
  onRowClick,
  emptyPlaceholder = <div className="p-6 text-center text-gray-400">Sem dados</div>,
}: TableProps<T>) {
  return (
    <div className={`w-full overflow-auto ${className}`}>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left text-sm text-gray-600 border-b">
            {columns.map((col) => (
              <th key={col.key} style={{ width: col.width }} className={`p-3 ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length}>{emptyPlaceholder}</td>
            </tr>
          )}

          {data.map((row, idx) => {
            const key = rowKey ? rowKey(row) : (idx as any);
            return (
              <tr
                key={String(key)}
                className={`hover:bg-gray-50 cursor-pointer ${onRowClick ? 'hover:shadow-sm' : ''}`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td key={col.key} className={`p-3 align-middle ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}`}>
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
