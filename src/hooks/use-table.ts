import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'

import { useEffect, useState } from 'react'

interface UseTableProps<TData, TValue> {
	data: TData[]
	columns: ColumnDef<TData, TValue>[]
	searchFilter?: string
}

export default function useTable<TData, TValue>({
	data,
	columns,
	searchFilter,
}: UseTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{}
	)
	const [rowSelection, setRowSelection] = useState({})

	const table = useReactTable({
		data,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: (e) => {
			setRowSelection(e)
		},
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	})

	useEffect(() => {
		table.setGlobalFilter(searchFilter)
	}, [searchFilter, table])

	const unselectAll = () => {
		setRowSelection([])
	}
	return {
		table,
		selected: table.getFilteredSelectedRowModel(),
		unselectAll,
	}
}
