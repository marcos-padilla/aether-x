'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import useTable from '@/hooks/use-table'
import generateColumns from '@/lib/columns-generator'
import { GenerateColumnsProps, TableAction } from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { ColumnDef, flexRender } from '@tanstack/react-table'
import { ChevronDown, MoreVertical, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import TableActionItem from '../table-actions/table-action'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Separator } from '../ui/separator'

interface DataTableProps<TData, TValue> {
	columns?: ColumnDef<TData, TValue>[]
	generator?: GenerateColumnsProps
	data: TData[]
	actions?: TableAction<TData>[]
}

export default function DataTable<TData, TValue>({
	columns,
	data,
	generator,
	actions,
}: DataTableProps<TData, TValue>) {
	const [searchFilter, setSearchFilter] = useState('')
	const { setOpen } = useModal()
	const customColumns = useMemo(() => {
		if (generator) {
			return generateColumns<TData>({ ...generator })
		}
		if (columns) {
			return columns
		}
		return []
	}, [generator, columns])

	const { table, selected: tableSelected } = useTable({
		data,
		columns: customColumns,
		searchFilter,
	})

	const selected = useMemo(() => {
		return tableSelected.flatRows.map(
			(selectedRow) => selectedRow.original as TData
		)
	}, [tableSelected])
	return (
		<>
			<div className='border bg-background rounded-lg'>
				<div className='flex flex-col bg-accent/50'>
					<div className='flex items-center justify-between p-2'>
						<div className='flex items-center gap-x-1'>
							<div className='flex items-center gap-x-1'>
								<Search size={15} />
								<Input
									className='w-auto h-auto text-sm py-1 focus-visible:ring-1 focus-visible:ring-offset-0'
									placeholder={'Search'}
									value={searchFilter}
									onChange={(event) => {
										setSearchFilter(
											event.target.value
										)
									}}
								/>
							</div>
							{selected.length > 0 && (
								<div className='flex items-center gap-x-1'>
									<span className='text-xs text-muted-foreground whitespace-nowrap'>
										{selected.length} selected
									</span>
									{actions && actions.length > 0 && (
										<>
											<div className='lg:flex flex-wrap hidden'>
												{actions.map(
													(
														action,
														index
													) => (
														<TableActionItem
															key={
																index
															}
															action={
																action
															}
															data={
																selected
															}
														/>
													)
												)}
											</div>
											<div className='lg:hidden ml-auto'>
												<DropdownMenu>
													<DropdownMenuTrigger
														asChild
													>
														<Button
															size={
																'sm'
															}
															className='text-xs px-2 py-1 h-auto'
															variant={
																'outline'
															}
														>
															Actions
															<ChevronDown
																size={
																	18
																}
															/>
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent>
														{actions?.map(
															(
																action,
																index
															) => (
																<TableActionItem
																	isMenuItem
																	key={
																		index
																	}
																	action={
																		action
																	}
																	data={
																		selected
																	}
																/>
															)
														)}
													</DropdownMenuContent>
												</DropdownMenu>
											</div>
										</>
									)}
								</div>
							)}
						</div>
						<div className='hidden md:flex gap-x-2'>
							<Button size={'xs'} variant={'outline'}>
								Export
							</Button>
							<Button size={'xs'} variant={'outline'}>
								Edit Columns
							</Button>
						</div>
						<div className='flex md:hidden'>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										size='icon'
										variant='outline'
									>
										<MoreVertical size={18} />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align='end'>
									<DropdownMenuItem>
										Export
									</DropdownMenuItem>
									<DropdownMenuItem>
										Edit Columns
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
					<Separator />
				</div>
				<Table>
					<TableHeader className='bg-accent/50'>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header
															.column
															.columnDef
															.header,
														header.getContext()
												  )}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() &&
										'selected'
									}
								>
									{row
										.getVisibleCells()
										.map((cell) => (
											<TableCell
												key={cell.id}
												className='text-center'
											>
												{flexRender(
													cell.column
														.columnDef
														.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={customColumns.length}
									className='h-24 text-center'
								>
									{'No data'}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</>
	)
}
