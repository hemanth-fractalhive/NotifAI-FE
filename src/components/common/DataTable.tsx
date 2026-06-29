import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type GlobalFilterTableState,
} from '@tanstack/react-table'
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { Input } from '@/shared/components/ui/input/input'
import { cn } from '@/shared/lib/utils'
import DataTablePagination from './DataTablePagination'

interface DataTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData, unknown>[]
  title?: string
  searchPlaceholder?: string
  pageSize?: number
  toolbar?: React.ReactNode
  onRowClick?: (row: TData) => void
  getRowClassName?: (row: TData) => string
  emptyState?: React.ReactNode
}

export default function DataTable<TData>({
  data,
  columns,
  title,
  searchPlaceholder = 'Search',
  pageSize = 10,
  toolbar,
  onRowClick,
  getRowClassName,
  emptyState,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState<GlobalFilterTableState['globalFilter']>('')

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  })

  const { pageIndex, pageSize: currentPageSize } = table.getState().pagination
  const totalRows = table.getFilteredRowModel().rows.length
  const start = totalRows === 0 ? 0 : pageIndex * currentPageSize + 1
  const end = Math.min((pageIndex + 1) * currentPageSize, totalRows)

  return (
    <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
      {title && (
        <div className="px-5 pt-5 pb-0">
          <h2 className="text-base font-semibold">{title}</h2>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 px-5 pt-5 pb-4">
        <Input
          placeholder={searchPlaceholder}
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="h-9 w-60 text-sm"
        />
        {toolbar}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-muted/30 border-y">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort()
                  const sorted = header.column.getIsSorted()
                  return (
                    <th
                      key={header.id}
                      className={cn(
                        'text-muted-foreground px-5 py-3 text-left text-xs font-semibold tracking-wide uppercase',
                        canSort && 'hover:text-foreground cursor-pointer select-none',
                      )}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      {header.isPlaceholder ? null : (
                        <span className="inline-flex items-center gap-1.5">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort &&
                            (sorted === 'asc' ? (
                              <ArrowUp className="text-foreground h-3.5 w-3.5" />
                            ) : sorted === 'desc' ? (
                              <ArrowDown className="text-foreground h-3.5 w-3.5" />
                            ) : (
                              <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                            ))}
                        </span>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          <tbody className="divide-border divide-y">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-muted-foreground py-16 text-center text-sm"
                >
                  {emptyState ?? 'No results found.'}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={cn(
                    'bg-card transition-colors',
                    onRowClick && 'hover:bg-muted/40 cursor-pointer',
                    getRowClassName?.(row.original),
                  )}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-5 py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DataTablePagination table={table} totalRows={totalRows} start={start} end={end} />
    </div>
  )
}
