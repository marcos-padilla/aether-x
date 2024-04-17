import * as z from 'zod'
import { signUpSchema } from './schemas'
import { Session } from 'next-auth'
import { Account, User } from '@prisma/client'

export type TODO = any

// Schemas
export type SignUpSchema = z.infer<typeof signUpSchema>

//Next auth
export type ExtendedSession = Session & {
	user: User
}

// Prisma Extended Types
export type ExtendedUser = User & {
	accounts: Account[]
}
