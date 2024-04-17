'use client'

import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { signUpSchema } from '@/lib/schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpSchema } from '@/lib/types'
import LabelInputContainer from '../_components/label-input-container'
import { Input } from '@/components/ui/input'
import { CustomInput } from '../_components/custom-input'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import BottomGradient from '../_components/bottom-gradient'
import { ArrowRight } from 'lucide-react'

export default function SignUpPage() {
	const form = useForm({
		mode: 'onChange',
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	const handleSubmit = (data: SignUpSchema) => {}

	return (
		<Card className='max-w-md w-full'>
			<CardHeader>
				<CardTitle>Welcome to Aether-X</CardTitle>
				<CardDescription>Sign up to get started</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						className='my-8 space-y-6'
						onSubmit={form.handleSubmit(handleSubmit)}
					>
						<div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4'>
							<FormField
								name='firstName'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<LabelInputContainer>
											<FormLabel>
												First Name
											</FormLabel>
											<CustomInput
												{...field}
												placeholder='First Name'
											/>
										</LabelInputContainer>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								name='lastName'
								control={form.control}
								render={({ field }) => (
									<FormItem>
										<LabelInputContainer>
											<FormLabel>
												Last Name
											</FormLabel>
											<CustomInput
												{...field}
												placeholder='Last Name'
											/>
										</LabelInputContainer>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							name='email'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<LabelInputContainer>
										<FormLabel>Email</FormLabel>
										<CustomInput
											{...field}
											type='email'
											placeholder='youremail@example.com'
										/>
									</LabelInputContainer>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='password'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<LabelInputContainer>
										<FormLabel>
											Password
										</FormLabel>
										<CustomInput
											{...field}
											type='password'
											placeholder='********'
										/>
									</LabelInputContainer>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name='confirmPassword'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<LabelInputContainer>
										<FormLabel>
											Confirm Password
										</FormLabel>
										<CustomInput
											{...field}
											type='password'
											placeholder='********'
										/>
									</LabelInputContainer>
									<FormMessage />
								</FormItem>
							)}
						/>
						<button
							className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
							type='submit'
						>
							<div className='flex items-center justify-center gap-x-2'>
								Sign up <ArrowRight />
							</div>
							<BottomGradient />
						</button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
