'use server'

import { DatabaseSchema } from '@/lib/types'
import { getCurrentUser } from './user-controller'
import { redirect } from 'next/navigation'
import db from '@/lib/db'
import { Database } from 'lucide-react'

export const createDatabase = async (
	projectId: string,
	data: DatabaseSchema
) => {
	const user = await getCurrentUser()
	if (!user) {
		return redirect('/auth/sign-in')
	}

	const project = await db.project.findFirst({
		where: {
			id: projectId,
		},
		include: {
			Databases: true,
		},
	})

	if (!project) {
		return redirect('/404')
	}

	if (project.userId !== user.id) {
		return {
			success: false,
			message: 'You are not authorized to perform this action',
		}
	}

	if (project.Databases.some((db) => db.name === data.name)) {
		return {
			success: false,
			message: 'A Database already exists for this project',
		}
	}

	if (!(await canCreateDatabase(projectId))) {
		return {
			success: false,
			message: 'You have reached the limit of databases in this project for your plan',
		}
	}

	const database = await db.database.create({
		data: {
			...data,
			projectId,
		},
	})

	return {
		success: true,
		data: database,
	}
}

export const deleteDatabase = async (projectId: string, databaseId: string) => {
	const user = await getCurrentUser()
	if (!user) {
		return redirect('/auth/sign-in')
	}

	const project = await db.project.findFirst({
		where: {
			id: projectId,
		},
		include: {
			Databases: true,
		},
	})

	if (!project) {
		return redirect('/404')
	}

	if (project.userId !== user.id) {
		return {
			success: false,
			message: 'You are not authorized to perform this action',
		}
	}

	if (!project.Databases.some((db) => db.id === databaseId)) {
		return {
			success: false,
			message: 'Database not found',
		}
	}

	await db.database.delete({
		where: {
			id: databaseId,
		},
	})

	return {
		success: true,
	}
}

export const updateDatabase = async (
	projectId: string,
	databaseId: string,
	data: DatabaseSchema
) => {
	const user = await getCurrentUser()
	if (!user) {
		return redirect('/auth/sign-in')
	}

	const project = await db.project.findFirst({
		where: {
			id: projectId,
		},
		include: {
			Databases: true,
		},
	})

	if (!project) {
		return redirect('/404')
	}

	if (project.userId !== user.id) {
		return {
			success: false,
			message: 'You are not authorized to perform this action',
		}
	}

	if (!project.Databases.some((db) => db.id === databaseId)) {
		return {
			success: false,
			message: 'Database not found',
		}
	}

	const database = await db.database.update({
		where: {
			id: databaseId,
		},
		data: {
			...data,
		},
	})

	return {
		success: true,
		data: database,
	}
}

export const getDatabases = async (projectId: string) => {
	const user = await getCurrentUser()
	if (!user) {
		return redirect('/auth/sign-in')
	}

	const database = await db.database.findMany({
		where: {
			projectId,
			Project: {
				userId: user.id,
			},
		},
		include: {
			Collections: true,
			Project: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	return database
}

export const deleteDatabases = async (ids: string[]) => {
	const user = await getCurrentUser()
	if (!user) {
		return redirect('/auth/sign-in')
	}

	await db.database.deleteMany({
		where: {
			id: {
				in: ids,
			},
			Project: {
				userId: user.id,
			},
		},
	})

	return {
		success: true,
	}
}

export const canCreateDatabase = async (projectId: string) => {
	const user = await getCurrentUser()
	if (!user) {
		return false
	}
	const databases = await db.database.findMany({
		where: {
			Project: {
				userId: user.id,
				id: projectId,
			},
		},
	})
	const cantDatabases = user.Plan.Features.find(
		(feat) => feat.name === 'DATABASE_PER_PROJECT_COUNT'
	)?.value

	return databases.length < (cantDatabases || 0)
}

export const getDatabase = async (databaseId: string) => {
	const user = await getCurrentUser()
	if (!user) {
		return redirect('/auth/sign-in')
	}

	const database = await db.database.findFirst({
		where: {
			id: databaseId,
			Project: {
				userId: user.id,
			},
		},
		include: {
			Collections: true,
			Project: true,
		},
	})

	if (!database) {
		return redirect('/404')
	}

	return database
}
