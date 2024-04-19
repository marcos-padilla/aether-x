'use server'

import { CollectionSchema, CustomServerResponse } from '@/lib/types'
import { Collection } from '@prisma/client'

export const createCollection = async (
	databaseId: string,
	data: CollectionSchema
): Promise<CustomServerResponse<Collection>> => {
	return null
}

export const updateCollection = async (
	databaseId: string,
	collectionId: string,
	data: CollectionSchema
): Promise<CustomServerResponse<Collection>> => {
	return null
}
