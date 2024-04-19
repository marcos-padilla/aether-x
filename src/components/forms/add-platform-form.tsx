'use client'

import { useForm } from 'react-hook-form'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { platformSchema } from '@/lib/schemas'
import { PlatformSchema } from '@/lib/types'
import {
	Form,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useModal } from '@/providers/modal-provider'
import { useToast } from '../ui/use-toast'

const defaultHostnames = ['*.vercel.app', '*.netlify.app']

export default function AddPlatformForm() {
	const { setClose } = useModal()
	const { toast } = useToast()

	const form = useForm({
		mode: 'onChange',
		resolver: zodResolver(platformSchema),
		defaultValues: {
			name: '',
			hostname: '',
		},
	})

	const handleSubmit = async (data: PlatformSchema) => {}

	return (
		<Card className='border-none'>
			<CardHeader>
				<CardTitle>Register your hostname</CardTitle>
				<CardDescription>
					Hostname is the URL where your platform will be hosted,
					e.g. myapp.com
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						className='space-y-5'
						onSubmit={form.handleSubmit(handleSubmit)}
					>
						<FormField
							name='name'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Platform Name
									</FormLabel>
									<Input
										{...field}
										placeholder='My App'
									/>
									<FormMessage />
									<FormDescription>
										Platform name must be unique
									</FormDescription>
								</FormItem>
							)}
						/>
						<FormField
							name='hostname'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Hostname</FormLabel>
									<Input
										{...field}
										placeholder='https://myapp.com'
									/>
									<FormMessage />
									<div className='flex items-center gap-x-4 py-2'>
										{defaultHostnames.map(
											(host) => (
												<button
													className='bg-accent text-sm rounded-full text-muted-foreground px-2 py-1 hover:bg-primary hover:text-white transition-all duration-200'
													key={host}
													type='button'
													onClick={(
														e
													) => {
														e.preventDefault()
														field.onChange(
															host
														)
													}}
												>
													{host}
												</button>
											)
										)}
									</div>
									<FormDescription>
										This is the hostname in where
										you will host your website and
										your website will use it to
										interact with AetherX
									</FormDescription>
								</FormItem>
							)}
						/>
						<div className='flex justify-end items-center gap-x-2'>
							<Button
								variant={'ghost'}
								onClick={(e) => {
									e.preventDefault()
									setClose()
								}}
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
