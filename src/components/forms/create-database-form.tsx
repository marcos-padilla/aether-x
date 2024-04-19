'use client'

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
import { databaseSchema } from '@/lib/schemas'
import { DatabaseSchema } from '@/lib/types'
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

interface CreateDatabaseFormProps {
	projectId: string
	mode?: 'create' | 'edit'
	database?: { name: string; id: string }
}

export default function CreateDatabaseForm({
	projectId,
	database,
	mode = 'create',
}: CreateDatabaseFormProps) {
	const { setClose } = useModal()
	const { toast } = useToast()
	const router = useRouter()

	const form = useForm({
		mode: 'onChange',
		resolver: zodResolver(databaseSchema),
		defaultValues: {
			name: '',
		},
	})

	useEffect(() => {
		if (database && mode === 'edit') {
			form.reset(filterUndefiedValues(database) as DatabaseSchema)
		}
	}, [database, mode])

	const handleSubmit = async (data: DatabaseSchema) => {
		if (mode === 'create') {
			const res = await createDatabase(projectId, data)
			if (res.success) {
				setClose()
				router.refresh()
			} else {
				toast({
					title: 'Error while creating the database',
					description: res.message,
					variant: 'destructive',
				})
			}
		} else if (mode === 'edit') {
			if (database?.id) {
				const res = await updateDatabase(
					projectId,
					database.id,
					data
				)
				if (res?.success) {
					toast({
						title: 'Database Updated',
						description: `The database ${data.name} has been updated successfully`,
						variant: 'success',
					})
					setClose()
					form.reset()
					router.refresh()
				} else {
					toast({
						title: 'Error',
						description:
							'An error occurred while updating the database',
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
						? 'Create Database'
						: 'Edit Database'}
				</CardTitle>
				<CardDescription>
					{mode === 'create'
						? 'Create a new database for this project'
						: 'Edit the database'}
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
										Database Name
									</FormLabel>
									<Input
										{...field}
										placeholder='myapp_db'
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
							<Button>
								{mode === 'create'
									? 'Create Database'
									: 'Update Database'}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
