import { Button } from "@/components/ui/button";
// import { ExportCSVButton } from "@/components/table/ExportCSVButton";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export function DataTablePagination({ table }) {
  // const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-4">
        <div className="flex-1  text-sm">
          {table.getFilteredSelectedRowModel().rows.length > 0
            ? `Selected ${table.getFilteredSelectedRowModel().rows.length} of ${
                table.getFilteredRowModel().rows.length
              }`
            : (() => {
                const pageIndex = table.getState().pagination.pageIndex;
                const pageSize = table.getState().pagination.pageSize;
                const totalRows = table.getFilteredRowModel().rows.length;
                const start = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
                const end = Math.min((pageIndex + 1) * pageSize, totalRows);
                return `Showing ${start}-${end} of ${totalRows} entries`;
              })()}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div className="flex items-center gap-2 text-sm">
          <label className="text-sm">Rows per page :</label>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50, 100].map((s) => (
                <SelectItem key={s} value={String(s)}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          {/* Page number pagination using shared Pagination components */}
          <div className="flex items-center space-x-2">
            <Pagination aria-label="Table pagination">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();
                      table.previousPage();
                    }}
                    className={
                      !table.getCanPreviousPage()
                        ? "pointer-events-none opacity-50"
                        : undefined
                    }
                  />
                </PaginationItem>

                {(() => {
                  const pageCount = table.getPageCount();
                  const pageIndex = table.getState().pagination.pageIndex;
                  const pageButtons = [];

                  // Show up to 9 page numbers around current page
                  const maxVisible = 9;
                  const start = Math.max(
                    0,
                    pageIndex - Math.floor(maxVisible / 2)
                  );
                  const end = Math.min(pageCount, start + maxVisible);

                  // Adjust start if we're near the end
                  const adjustedStart =
                    end - start < maxVisible
                      ? Math.max(0, end - maxVisible)
                      : start;

                  for (let i = adjustedStart; i < end; i++) {
                    const isActive = pageIndex === i;
                    pageButtons.push(
                      <PaginationItem key={i}>
                        <PaginationLink
                          isActive={isActive}
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            table.setPageIndex(i);
                          }}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }

                  return pageButtons;
                })()}

                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();
                      table.nextPage();
                    }}
                    className={
                      !table.getCanNextPage()
                        ? "pointer-events-none opacity-50"
                        : undefined
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
