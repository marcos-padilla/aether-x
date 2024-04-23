'use client'

import CustomModal from '@/components/modals/custom-modal'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import { deleteDatabase } from '@/controllers/database-controller'
import { ExtendedAttribute, ExtendedDatabase } from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import {
	ArrowUpDown,
	Edit,
	Eye,
	MoreHorizontal,
	Trash2,
	View,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const AttributeColumns: ColumnDef<ExtendedAttribute>[] = [
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
				onClick={(e) => e.stopPropagation()}
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'key',
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
					Key
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const key = row.getValue('key') as string
			return <div>{key}</div>
		},
	},
	{
		accessorKey: 'type',
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
					Type
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const type = row.getValue('type') as string
			return <div>{type}</div>
		},
	},
	{
		accessorKey: 'defaultValue',
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
					Default Value
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const defaultValue = row.getValue('defaultValue') as string
			if (!defaultValue) return <div>NULL</div>
			return <div>{defaultValue}</div>
		},
	},
	{
		accessorKey: 'isRequired',
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
					Required
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const isRequired = row.getValue('isRequired') as boolean
			return (
				<Checkbox
					disabled={true}
					checked={isRequired}
					className='!cursor-default'
				/>
			)
		},
	},
	{
		accessorKey: 'isUnique',
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
					Unique
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			)
		},
		cell: ({ row }) => {
			const isUnique = row.getValue('isUnique') as boolean
			return (
				<Checkbox
					disabled={true}
					checked={isUnique}
					className='!cursor-default'
				/>
			)
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
			return (
				<div className='flex items-center gap-x-1'>
					{/* 	<CellActions rowData={rowData} /> */}
				</div>
			)
		},
	},
]

interface CellActionsProps {
	rowData: ExtendedAttribute
}
/* 
function CellActions({ rowData }: CellActionsProps) {
	const { setOpen } = useModal()
	const { toast } = useToast()
	const router = useRouter()
	const handleDelete = async () => {
		const res = await deleteDatabase(rowData.projectId, rowData.id)
		if (res.success) {
			toast({
				title: 'Database deleted',
				variant: 'success',
			})
		} else {
			toast({
				title: 'Database could not be deleted',
				description: res.message,
				variant: 'destructive',
			})
		}
		router.refresh()
	}

	return (
		<AlertDialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' className='h-8 w-8 p-0'>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className='flex items-center gap-x-2'
						onClick={() => {
							setOpen(
								<CustomModal>
									<CreateDatabaseForm
										projectId={rowData.projectId}
										mode='edit'
										database={rowData}
									/>
								</CustomModal>
							)
						}}
					>
						<Edit size={18} />
						Edit
					</DropdownMenuItem>
					<AlertDialogTrigger asChild>
						<DropdownMenuItem className='flex items-center gap-x-2 text-destructive'>
							<Trash2 size={18} />
							Delete
						</DropdownMenuItem>
					</AlertDialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Database</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete the database? This
						action cannot be undone and all the data will be
						lost
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className={buttonVariants({
							variant: 'destructive',
						})}
						onClick={handleDelete}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
 */
