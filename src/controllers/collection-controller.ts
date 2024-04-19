'use server'

import { CollectionSchema, CustomServerResponse } from '@/lib/types'
import { Collection } from '@prisma/client'
import { getCurrentUser } from './user-controller'
import { redirect } from 'next/navigation'
import db from '@/lib/db'

export const createCollection = async (
	databaseId: string,
	data: CollectionSchema
): Promise<CustomServerResponse<Collection>> => {
	const user = await getCurrentUser()
	if (!user) {
		return redirect('/auth/sign-in')
	}

	const database = await db.database.findUnique({
		where: {
			id: databaseId,
		},
		include: {
			Project: true,
		},
	})

	if (!database) {
		return {
			success: false,
			message: 'Database not found',
		}
	}

	if (database.Project.userId !== user.id) {
		return {
			success: false,
			message: 'You are not authorized to create a collection in this database',
		}
	}

	const existCollection = await db.collection.findFirst({
		where: {
			name: data.name,
			databaseId,
		},
	})

	if (existCollection) {
		return {
			success: false,
			message: 'Collection already exists',
		}
	}

	const collection = await db.collection.create({
		data: {
			...data,
			databaseId,
		},
	})

	return redirect(
		`/console/projects/${database.projectId}/databases/${databaseId}/collections/${collection.id}`
	)
}

export const updateCollection = async (
	databaseId: string,
	collectionId: string,
	data: CollectionSchema
): Promise<CustomServerResponse<Collection>> => {
	return null
}
