"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./Pagination";
import { cn } from "@/lib/utils";

function DataTableInner(
  {
    tWrapperClassName,
    columns,
    data,
    showPagination = true,
    loading = false,
    pageSize = 6, // Default page size
    // rowClassName can be a string or a function (row) => string
    rowClassName,
  },
  ref
) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  useImperativeHandle(ref, () => table, [table]);
  const visibleColumns = table.getVisibleFlatColumns?.()
    ? table.getVisibleFlatColumns()
    : columns;
  const currentPageSize = table.getState().pagination?.pageSize ?? pageSize;
  const currentRows = table.getRowModel().rows || [];
  const pageCount = table.getPageCount();
  return (
    <div className="space-y-4 border shadow-sm pb-4 rounded bg-white">
      <div className={cn("overflow-auto data-table-scroll", tWrapperClassName)}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="h-12 bg-primary hover:bg-primary/90"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="px-5 text-white border-r"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              // Render 5 skeleton rows while loading
              Array.from({ length: 5 }).map((_, rIdx) => (
                <TableRow className="h-12 py-2" key={`skeleton-${rIdx}`}>
                  {columns.map((col, cIdx) => (
                    <TableCell
                      className="h-12 px-5 py-2 border-r"
                      key={`skeleton-cell-${rIdx}-${cIdx}`}
                    >
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : currentRows?.length ? (
              // Render actual rows
              currentRows.map((row) => {
                const extraRowClass =
                  typeof rowClassName === "function"
                    ? rowClassName(row)
                    : rowClassName || "";
                return (
                  <TableRow
                    className={`h-12 py-2 ${extraRowClass}`}
                    key={row.id}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className="h-12 px-5 py-2 border-r"
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}

            {/* Fill remaining rows on the page with empty cells to keep row count consistent */}
            {!loading &&
              currentRows.length > 0 &&
              currentRows.length < currentPageSize &&
              Array.from({ length: currentPageSize - currentRows.length }).map(
                (_, eIdx) => (
                  <TableRow className="h-12 py-2" key={`empty-${eIdx}`}>
                    {visibleColumns.map((col, cIdx) => (
                      <TableCell
                        className="h-12 px-5 py-2 border-r"
                        key={`empty-cell-${eIdx}-${cIdx}`}
                      >
                        {/* keep cell structure, empty content */}
                        <div className="h-4 w-3/4" />
                      </TableCell>
                    ))}
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </div>
      {showPagination && pageCount > 1 && !loading && (
        <DataTablePagination table={table} />
      )}
    </div>
  );
}

const DataTable = forwardRef(DataTableInner);
export { DataTable };
