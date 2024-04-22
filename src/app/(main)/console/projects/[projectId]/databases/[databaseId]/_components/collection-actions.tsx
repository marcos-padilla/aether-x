'use client'

import CollectionForm from '@/components/forms/collection-form'
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
import { deleteCollections } from '@/controllers/collection-controller'
import { ExtendedCollection, TableAction } from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { Edit2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const CollectionActions: TableAction<ExtendedCollection>[] = [
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

			const handleDeleteCollections = async () => {
				try {
					setLoading(true)
					if (data.length === 0) {
						toast({
							title: 'No databases selected',
						})
						return
					}
					const res = await deleteCollections(
						data.map((c) => c.id)
					)
					if (res.success) {
						toast({
							title: `${data.length} collections deleted successfully`,
							variant: 'success',
						})
					} else {
						toast({
							title: `Error deleting collections`,
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
								? `Delete ${data.length} collections`
								: 'Delete collection'}
						</CardTitle>
						<CardDescription className='text-destructive font-bold gap-x-1'>
							{data.length > 1 ? (
								<div className=''>
									Are you sure you want to delete
									these {data.length} collections?
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
								onClick={handleDeleteCollections}
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
				<CollectionForm
					databaseId={data[0].Database.id}
					mode='edit'
					collection={data[0]}
				/>
			)
		},
	},
]
