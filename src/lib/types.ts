import * as z from 'zod'
import {
	collectionSchema,
	databaseSchema,
	platformSchema,
	projectSchema,
	signInSchema,
	signUpSchema,
} from './schemas'
import { Session } from 'next-auth'
import {
	Account,
	Collection,
	Database,
	Platform,
	Project,
	User,
} from '@prisma/client'

export type TODO = any

// Schemas
export type SignUpSchema = z.infer<typeof signUpSchema>
export type SignInSchema = z.infer<typeof signInSchema>
export type ProjectSchema = z.infer<typeof projectSchema>
export type PlatformSchema = z.infer<typeof platformSchema>
export type DatabaseSchema = z.infer<typeof databaseSchema>
export type CollectionSchema = z.infer<typeof collectionSchema>

//Next auth
export type ExtendedSession = Session & {
	user: User
}

// Prisma Extended Types
export type ExtendedUser = User & {
	accounts: Account[]
}

export type ExtendedDatabase = Database & {
	Collections: Collection[]
}

export type ExtendedProject = Project & {
	Platforms: Platform[]
	Database: ExtendedDatabase | null
}

export type CustomServerResponse<T> =
	| {
			success: boolean
			message?: string
			data?: T
	  }
	| null
	| undefined
