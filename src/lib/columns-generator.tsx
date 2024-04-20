'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnField, GenerateColumnsProps } from './types'
import { Button } from '@/components/ui/button'
import { ArrowUpDown } from 'lucide-react'
import { cn } from './utils'

interface ColumnsProps {
	fields: ColumnField[]
}

export default function generateColumns<TData>({
	fields,
	includeId = true,
	includeSelect = true,
}: GenerateColumnsProps): ColumnDef<TData>[] {
	const columns: ColumnDef<TData>[] = []
	if (includeId) {
		columns.push({
			accessorKey: 'id',
			header: '',
			cell: () => {
				return null
			},
		})
	}
	if (includeSelect) {
		columns.push({
			id: 'select',
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() &&
							'indeterminate')
					}
					onCheckedChange={(value) =>
						table.toggleAllPageRowsSelected(!!value)
					}
					aria-label='Select all'
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) =>
						row.toggleSelected(!!value)
					}
					aria-label='Select row'
				/>
			),
			enableSorting: false,
			enableHiding: false,
		})
	}

	fields.forEach((field) => {
		const headerName =
			field.headerName ??
			field.accessorKey.charAt(0) + field.accessorKey.slice(1)
		columns.push({
			accessorKey: field.accessorKey,
			header: ({ column }) => {
				if (field.sortable) {
					return (
						<Button
							variant='ghost'
							onClick={() =>
								column.toggleSorting(
									column.getIsSorted() === 'asc'
								)
							}
						>
							{headerName}
							<ArrowUpDown className='ml-2 h-4 w-4' />
						</Button>
					)
				} else {
					return headerName
				}
			},
			cell: ({ row }) => {
				const fieldValue = row.getValue(field.accessorKey) as string
				return (
					<div
						className={cn(
							'whitespace-nowrap',
							field.cellClassName
						)}
					>
						{fieldValue}
					</div>
				)
			},
		})
	})
	return columns
}
