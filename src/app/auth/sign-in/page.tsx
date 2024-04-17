'use client'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { signInSchema } from '@/lib/schemas'
import { SignInSchema } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import BottomGradient from '../_components/bottom-gradient'
import { CustomInput } from '../_components/custom-input'
import LabelInputContainer from '../_components/label-input-container'

export default function SignInPage() {
	const form = useForm({
		mode: 'onChange',
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const handleSubmit = async (data: SignInSchema) => {
		const res = await signIn('credentials', {
			email: data.email,
			password: data.password,
			callbackUrl: '/console',
		})
	}

	return (
		<Card className='max-w-md w-full'>
			<CardHeader>
				<CardTitle>Welcome to Aether-X</CardTitle>
				<CardDescription>Sign in to get started</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						className='my-8 space-y-6'
						onSubmit={form.handleSubmit(handleSubmit)}
					>
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
						<button
							className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
							type='submit'
						>
							<div className='flex items-center justify-center gap-x-2'>
								Sign in <ArrowRight />
							</div>
							<BottomGradient />
						</button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
