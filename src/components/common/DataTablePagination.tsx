import type { Table } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Button } from '@/shared/components/ui/button/button'

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  totalRows: number
  start: number
  end: number
}

export default function DataTablePagination<TData>({
  table,
  totalRows,
  start,
  end,
}: DataTablePaginationProps<TData>) {
  const pageCount = table.getPageCount()
  const pageIndex = table.getState().pagination.pageIndex

  return (
    <div className="text-muted-foreground flex items-center justify-between border-t px-5 py-3 text-sm">
      <span>
        {totalRows === 0 ? '0' : `${start}–${end}`} of {totalRows} row{totalRows !== 1 ? 's' : ''}{' '}
        shown.
      </span>
      {pageCount > 1 && (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            aria-label="First page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="px-3 text-sm">
            Page <strong className="text-foreground">{pageCount === 0 ? 0 : pageIndex + 1}</strong>{' '}
            of <strong className="text-foreground">{pageCount}</strong>
          </span>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={!table.getCanNextPage()}
            aria-label="Last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
