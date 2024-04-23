'use client'

import AttributeForm from '@/components/forms/attribute-form'
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
import { deleteAttributes } from '@/controllers/attributes-controller'
import { deleteCollections } from '@/controllers/collection-controller'
import { ExtendedAttribute, TableAction } from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { Edit2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const AttributeActions: TableAction<ExtendedAttribute>[] = [
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

			const handleDeleteAttributes = async () => {
				try {
					setLoading(true)
					if (data.length === 0) {
						toast({
							title: 'No attributes selected',
						})
						return
					}
					const res = await deleteAttributes(
						data.map((c) => c.id)
					)
					if (res.success) {
						toast({
							title: `${data.length} attributes deleted successfully`,
							variant: 'success',
						})
					} else {
						toast({
							title: `Error deleting attributes`,
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
								? `Delete ${data.length} attributes`
								: 'Delete attribute'}
						</CardTitle>
						<CardDescription className='text-destructive font-bold gap-x-1'>
							{data.length > 1 ? (
								<div className=''>
									Are you sure you want to delete
									these {data.length} attributes?
									<br /> This action cannot be
									undone.
								</div>
							) : (
								<div className=''>
									Are you sure you want to delete the
									attribute{' '}
									<button className='text-primary hover:text-primary-accent hover:underline cursor-pointer'>
										{data[0].key}
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
								onClick={handleDeleteAttributes}
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
				<AttributeForm
					collectionId={data[0].collectionId}
					mode='edit'
					attribute={data[0]}
				/>
			)
		},
	},
]
