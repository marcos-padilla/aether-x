'use server'

import { redirect } from 'next/navigation'
import { getCurrentUser } from './user-controller'
import db from '@/lib/db'
import { AttributeSchema, CustomServerResponse } from '@/lib/types'
import { Attribute } from '@prisma/client'
import { cookies } from 'next/headers'

export const getAttributes = async (collectionId: string) => {
	cookies()
	const user = await getCurrentUser()
	if (!user) {
		return redirect('/auth/sign-in')
	}

	const attributes = await db.attribute.findMany({
		where: {
			Collection: {
				id: collectionId,
				Database: {
					Project: {
						userId: user.id,
					},
				},
			},
		},
	})

	return attributes
}

export const createAttribute = async (
	collectionId: string,
	data: AttributeSchema
): Promise<CustomServerResponse<Attribute>> => {
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

	const existAttribute = await db.attribute.findFirst({
		where: {
			key: data.key,
			collectionId,
		},
	})

	if (existAttribute) {
		return {
			success: false,
			message: 'Attribute already exists',
		}
	}

	const attribute = await db.attribute.create({
		data: {
			...data,
			collectionId,
		},
	})

	return {
		success: true,
		data: attribute,
	}
}

export const updateAttribute = async (
	collectionId: string,
	attributeId: string,
	data: AttributeSchema
): Promise<CustomServerResponse<Attribute>> => {
	return null
}

export const deleteAttributes = async (ids: string[]) => {
	const user = await getCurrentUser()
	if (!user) {
		return redirect('/auth/sign-in')
	}

	await db.attribute.deleteMany({
		where: {
			id: {
				in: ids,
			},
			Collection: {
				Database: {
					Project: {
						userId: user.id,
					},
				},
			},
		},
	})

	return {
		success: true,
	}
}
