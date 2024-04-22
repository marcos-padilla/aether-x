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

export const getCollections = async (databaseId: string) => {
	const user = await getCurrentUser()
	if (!user) {
		return redirect('/auth/sign-in')
	}
	const database = await db.database.findUnique({
		where: {
			id: databaseId,
			Project: {
				userId: user.id,
			},
		},
	})
	if (!database) {
		return redirect('/404')
	}

	const collections = await db.collection.findMany({
		where: {
			databaseId,
		},
		include: {
			Database: true,
			Attributes: true,
		},
	})

	return collections
}

export const updateCollection = async (
	databaseId: string,
	collectionId: string,
	data: CollectionSchema
): Promise<CustomServerResponse<Collection>> => {
	return null
}

export const deleteCollection = async (collectionId: string) => {
	const user = await getCurrentUser()
	if (!user) {
		return redirect('/auth/sign-in')
	}
	const collection = await db.collection.findUnique({
		where: {
			id: collectionId,
			Database: {
				Project: {
					userId: user.id,
				},
			},
		},
	})

	if (!collection) {
		return {
			success: false,
			message: 'Collection not found',
		}
	}

	await db.collection.delete({
		where: {
			id: collectionId,
		},
	})

	return {
		success: true,
	}
}

export const deleteCollections = async (ids: string[]) => {
	const user = await getCurrentUser()
	if (!user) {
		return redirect('/auth/sign-in')
	}

	await db.collection.deleteMany({
		where: {
			id: {
				in: ids,
			},
			Database: {
				Project: {
					userId: user.id,
				},
			},
		},
	})

	return {
		success: true,
	}
}
