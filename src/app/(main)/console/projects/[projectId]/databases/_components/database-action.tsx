'use client'

import {
	deleteDatabase,
	deleteDatabases,
} from '@/controllers/database-controller'
import CreateDatabaseForm from '@/components/forms/create-database-form'
import LoadingSpinner from '@/components/globals/loading-spinner'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { ExtendedDatabase, TableAction } from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { Edit2, Merge, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const DatabaseActions: TableAction<ExtendedDatabase>[] = [
	{
		trigger: {
			label: 'Delete',
			icon: Trash2,
			variant: 'destructive',
		},
		Modal: ({ data }) => {
			const { toast } = useToast()
			const router = useRouter()
			const [loading, setLoading] = useState(false)
			const { setClose } = useModal()

			const handleDeleteDatabases = async () => {
				try {
					setLoading(true)
					if (data.length === 0) {
						toast({
							title: 'No databases selected',
						})
						return
					}
					const res = await deleteDatabases(
						data.map((c) => c.id)
					)
					if (res.success) {
						toast({
							title: `${data.length} databases deleted successfully`,
							variant: 'success',
						})
					} else {
						toast({
							title: `Error deleting databases`,
							variant: 'destructive',
						})
					}
				} catch (e) {
					console.error(e)
				} finally {
					setLoading(false)
					router.refresh()
					setClose()
				}
			}

			return (
				<Card className='border-none'>
					<CardHeader className='p-0'>
						<CardTitle>
							{data.length > 1
								? `Delete ${data.length} databases`
								: 'Delete database'}
						</CardTitle>
						<CardDescription className='text-destructive font-bold gap-x-1'>
							{data.length > 1 ? (
								<div className=''>
									Are you sure you want to delete
									these {data.length} databases?
									<br /> This action cannot be
									undone.
								</div>
							) : (
								<div className=''>
									Are you sure you want to delete the
									database{' '}
									<button className='text-primary hover:text-primary-accent hover:underline cursor-pointer'>
										{data[0].name}
									</button>
									? <br /> This action cannot be
									undone.
								</div>
							)}
						</CardDescription>
					</CardHeader>
					<CardContent className='p-0'>
						<CardFooter className='flex gap-x-2 items-center justify-end'>
							<Button variant={'ghost'} onClick={setClose}>
								Cancel
							</Button>
							<Button
								variant='destructive'
								onClick={handleDeleteDatabases}
								disabled={loading}
							>
								{loading ? (
									<LoadingSpinner />
								) : (
									'Delete'
								)}
							</Button>
						</CardFooter>
					</CardContent>
				</Card>
			)
		},
	},
	{
		trigger: {
			label: 'Edit',
			icon: Edit2,
		},
		disabled: (data) => data.length !== 1,
		Modal: ({ data }) => {
			return (
				<CreateDatabaseForm
					database={data[0]}
					projectId={data[0].projectId}
					mode='edit'
				/>
			)
		},
	},
]
