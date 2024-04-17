import * as z from 'zod'
import { signInSchema, signUpSchema } from './schemas'
import { Session } from 'next-auth'
import { Account, User } from '@prisma/client'

export type TODO = any

// Schemas
export type SignUpSchema = z.infer<typeof signUpSchema>
export type SignInSchema = z.infer<typeof signInSchema>

//Next auth
export type ExtendedSession = Session & {
	user: User
}

// Prisma Extended Types
export type ExtendedUser = User & {
	accounts: Account[]
}
