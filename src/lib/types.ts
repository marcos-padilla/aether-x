import * as z from 'zod'
import { projectSchema, signInSchema, signUpSchema } from './schemas'
import { Session } from 'next-auth'
import { Account, User } from '@prisma/client'

export type TODO = any

// Schemas
export type SignUpSchema = z.infer<typeof signUpSchema>
export type SignInSchema = z.infer<typeof signInSchema>
export type ProjectSchema = z.infer<typeof projectSchema>

//Next auth
export type ExtendedSession = Session & {
	user: User
}

// Prisma Extended Types
export type ExtendedUser = User & {
	accounts: Account[]
}

export type CustomServerResponse<T> =
	| {
			success: boolean
			message?: string
			data?: T
	  }
	| null
	| undefined
