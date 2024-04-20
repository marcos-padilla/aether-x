'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ExtendedDatabase } from '@/lib/types'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowUpDown } from 'lucide-react'

export const DatabaseColumns: ColumnDef<ExtendedDatabase>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
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
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(
							column.getIsSorted() === 'asc'
						)
					}
				>
					Name
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const name = row.getValue('name') as string
			return <div>{name}</div>
		},
	},
	{
		accessorKey: 'Collections',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(
							column.getIsSorted() === 'asc'
						)
					}
				>
					Collections
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const collections = row.getValue('Collections') as string[]
			return <div>{collections.length}</div>
		},
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(
							column.getIsSorted() === 'asc'
						)
					}
				>
					Created At
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const date = format(
				row.getValue('createdAt') as Date,
				'MMM d, yyy - h:mm a'
			)
			return <span className='whitespace-nowrap'>{date}</span>
		},
	},
	{
		accessorKey: 'updatedAt',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() =>
						column.toggleSorting(
							column.getIsSorted() === 'asc'
						)
					}
				>
					Updated At
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const date = format(
				row.getValue('createdAt') as Date,
				'MMM d, yyy - h:mm a'
			)
			return <span className='whitespace-nowrap'>{date}</span>
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const rowData = row.original
			return <div className='flex items-center gap-x-1'></div>
		},
	},
]

/* function CellActions({ rowData }: CellActionsProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
 */
