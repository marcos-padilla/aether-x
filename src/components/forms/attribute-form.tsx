import {
	createAttribute,
	updateAttribute,
} from '@/controllers/attributes-controller'
import { attributeSchema } from '@/lib/schemas'
import { AttributeSchema } from '@/lib/types'
import { filterUndefiedValues } from '@/lib/utils'
import { useModal } from '@/providers/modal-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'
import { Attribute, AttributeType } from '@prisma/client'
import { Checkbox } from '../ui/checkbox'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'

interface AttributeFormProps {
	collectionId: string
	mode?: 'create' | 'edit'
	attribute?: Attribute
}

const attributeTypes = [
	'String',
	'Number',
	'Boolean',
	'DateTime',
	'URL',
	'Email',
] as string[]

export default function AttributeForm({
	collectionId,
	attribute,
	mode = 'create',
}: AttributeFormProps) {
	const { setClose } = useModal()
	const { toast } = useToast()
	const router = useRouter()

	const form = useForm({
		mode: 'onChange',
		resolver: zodResolver(attributeSchema),
		defaultValues: {
			key: '',
			type: '' as AttributeType,
			defaultValue: '',
			isRequired: false,
			isUnique: false,
		},
	})

	useEffect(() => {
		if (attribute && mode === 'edit') {
			form.reset(filterUndefiedValues(attribute) as AttributeSchema)
		}
	}, [attribute, mode])

	const handleSubmit = async (data: AttributeSchema) => {
		if (mode === 'create') {
			const res = await createAttribute(collectionId, data)
			if (res?.success === false) {
				toast({
					title: 'Error while creating the attribute',
					description: res?.message ?? 'An error occurred',
					variant: 'destructive',
				})
			}
			setClose()
			router.refresh()
		} else if (mode === 'edit') {
			if (attribute?.id) {
				const res = await updateAttribute(
					collectionId,
					attribute.id,
					data
				)
				if (res?.success) {
					toast({
						title: 'Attribute Updated',
						description: `The attribute ${data.key} has been updated successfully`,
						variant: 'success',
					})
					setClose()
					form.reset()
					router.refresh()
				} else {
					toast({
						title: 'Error',
						description:
							'An error occurred while updating the attribute',
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
						? 'Create Attribute'
						: 'Edit Attribute'}
				</CardTitle>
				<CardDescription>
					{mode === 'create'
						? 'Create a new attribute for this collection'
						: 'Edit the attribute'}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className='space-y-5'
					>
						<FormField
							name='key'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Attribute key
									</FormLabel>
									<Input
										{...field}
										placeholder='name, email, age, url...'
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='type'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Attribute Type
									</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder='Select the attribute type' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{attributeTypes.map(
												(type) => (
													<SelectItem
														key={type}
														value={
															type
														}
													>
														{type}
													</SelectItem>
												)
											)}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='defaultValue'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Default Value
									</FormLabel>
									<Input
										{...field}
										placeholder='Empty to set null'
									/>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
							<FormField
								control={form.control}
								name='isRequired'
								render={({ field }) => (
									<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
										<FormControl>
											<Checkbox
												checked={
													field.value
												}
												onCheckedChange={
													field.onChange
												}
											/>
										</FormControl>
										<div className='space-y-1 leading-none'>
											<FormLabel>
												Required
											</FormLabel>
											<FormDescription></FormDescription>
										</div>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='isUnique'
								render={({ field }) => (
									<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
										<FormControl>
											<Checkbox
												checked={
													field.value
												}
												onCheckedChange={
													field.onChange
												}
											/>
										</FormControl>
										<div className='space-y-1 leading-none'>
											<FormLabel>
												Unique
											</FormLabel>
											<FormDescription></FormDescription>
										</div>
									</FormItem>
								)}
							/>
						</div>

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
									? 'Create Attribute'
									: 'Update Attribute'}
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
