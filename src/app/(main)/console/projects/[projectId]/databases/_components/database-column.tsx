'use client'

import CreateDatabaseForm from '@/components/forms/create-database-form'
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
import { ExtendedDatabase } from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ArrowUpDown, Edit, MoreHorizontal, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
			return (
				<div className='flex items-center gap-x-1'>
					<CellActions rowData={rowData} />
				</div>
			)
		},
	},
]

interface CellActionsProps {
	rowData: ExtendedDatabase
}

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
