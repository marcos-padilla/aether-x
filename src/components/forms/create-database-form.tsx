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
import { createDatabase } from '@/controllers/database-controller'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'

export default function CreateDatabaseForm({
	projectId,
}: {
	projectId: string
}) {
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

	const handleSubmit = async (data: DatabaseSchema) => {
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
	}

	return (
		<Card className='border-none'>
			<CardHeader>
				<CardTitle>Create Database</CardTitle>
				<CardDescription>
					Create a new database for this project
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
							<Button>Create</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
