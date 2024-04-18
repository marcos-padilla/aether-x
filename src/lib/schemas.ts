import * as z from 'zod'

export const signUpSchema = z
	.object({
		firstName: z.string().min(1, { message: 'First name is required' }),
		lastName: z.string().min(1, { message: 'Last name is required' }),
		email: z
			.string()
			.min(1, { message: 'Email is required' })
			.email({ message: 'Invalid email' }),
		password: z.string().min(8, {
			message: 'Password must be greather than 8 characteres',
		}),
		confirmPassword: z.string().min(8, {
			message: 'Password must be greather than 8 characteres',
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

export const signInSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email is required' })
		.email({ message: 'Invalid email' }),
	password: z.string().min(8, {
		message: 'Password must be greather than 8 characteres',
	}),
})

export const projectSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
})
