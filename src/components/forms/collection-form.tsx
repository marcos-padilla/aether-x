import { useForm } from 'react-hook-form'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card'
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { collectionSchema, databaseSchema } from '@/lib/schemas'
import { CollectionSchema, DatabaseSchema } from '@/lib/types'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useModal } from '@/providers/modal-provider'
import {
	createDatabase,
	updateDatabase,
} from '@/controllers/database-controller'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { filterUndefiedValues } from '@/lib/utils'
import {
	createCollection,
	updateCollection,
} from '@/controllers/collection-controller'

interface CollectionFormProps {
	databaseId: string
	mode?: 'create' | 'edit'
	collection?: { name: string; id: string }
}

export default function CollectionForm({
	databaseId,
	collection,
	mode = 'create',
}: CollectionFormProps) {
	const { setClose } = useModal()
	const { toast } = useToast()
	const router = useRouter()

	const form = useForm({
		mode: 'onChange',
		resolver: zodResolver(collectionSchema),
		defaultValues: {
			name: '',
		},
	})

	useEffect(() => {
		if (collection && mode === 'edit') {
			form.reset(filterUndefiedValues(collection) as CollectionSchema)
		}
	}, [collection, mode])

	const handleSubmit = async (data: CollectionSchema) => {
		if (mode === 'create') {
			const res = await createCollection(databaseId, data)
			if (res?.success === false) {
				toast({
					title: 'Error while creating the collection',
					description: res?.message ?? 'An error occurred',
					variant: 'destructive',
				})
			}
			setClose()
		} else if (mode === 'edit') {
			if (collection?.id) {
				const res = await updateCollection(
					databaseId,
					collection.id,
					data
				)
				if (res?.success) {
					toast({
						title: 'Collection Updated',
						description: `The collection ${data.name} has been updated successfully`,
						variant: 'success',
					})
					setClose()
					form.reset()
					router.refresh()
				} else {
					toast({
						title: 'Error',
						description:
							'An error occurred while updating the collecction',
						variant: 'destructive',
					})
				}
			}
		}
	}

	return (
		<Card className='border-none'>
			<CardHeader>
				<CardTitle>
					{mode === 'create'
						? 'Create Collection'
						: 'Edit Collection'}
				</CardTitle>
				<CardDescription>
					{mode === 'create'
						? 'Create a new collection for this project'
						: 'Edit the collection'}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className='space-y-5'
					>
						<FormField
							name='name'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Collection Name
									</FormLabel>
									<Input
										{...field}
										placeholder='posts, images, applications...'
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex items-center justify-end gap-x-2'>
							<Button
								type='button'
								onClick={(e) => {
									e.preventDefault()
									setClose()
								}}
								variant={'ghost'}
							>
								Cancel
							</Button>
							<Button
								disabled={form.formState.isSubmitting}
							>
								{mode === 'create'
									? 'Create Collection'
									: 'Update Collection'}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
