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
	Attribute,
	Collection,
	Database,
	Feature,
	Plan,
	Platform,
	Project,
	User,
} from '@prisma/client'
import { LucideIcon } from 'lucide-react'
import { Attributes } from 'react'

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
	Plan: ExtendedPlan
}

export type ExtendedPlan = Plan & {
	Features: Feature[]
}

export type ExtendedDatabase = Database & {
	Collections: Collection[]
}

export type ExtendedProject = Project & {
	Platforms: Platform[]
	Databases: ExtendedDatabase[]
}

export type ExtendedCollection = Collection & {
	Attributes: Attribute[]
	Database: Database
}

export type CustomServerResponse<T> =
	| {
			success: boolean
			message?: string
			data?: T
	  }
	| null
	| undefined

// TABLE

export type ColumnField = {
	accessorKey: string
	headerName?: string
	sortable?: boolean
	cellClassName?: string
}

export type GenerateColumnsProps = {
	fields: ColumnField[]
	includeId?: boolean
	includeSelect?: boolean
}

type TableActionTrigger = {
	label: string
	icon?: LucideIcon
	variant?: 'default' | 'destructive'
}

export type TableAction<TData> = {
	trigger: TableActionTrigger
	disabled?: boolean | ((data: TData[]) => boolean)
	Modal: React.FC<{ data: TData[] }>
	meta?: {
		modalTitle?: string
		modalSubheading?: string
	}
}
