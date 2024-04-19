'use server'

import { DatabaseSchema } from '@/lib/types'
import { getCurrentUser } from './user-controller'
import { redirect } from 'next/navigation'
import db from '@/lib/db'

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
			Database: true,
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

	if (project.Database) {
		return {
			success: false,
			message: 'A Database already exists for this project',
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
