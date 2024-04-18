'use server'

import { CustomServerResponse, ProjectSchema } from '@/lib/types'
import { getCurrentUser } from './user-controller'
import { Project } from '@prisma/client'
import db from '@/lib/db'

export const createProject = async (
	data: ProjectSchema
): Promise<CustomServerResponse<Project>> => {
	const user = await getCurrentUser()
	if (!user) {
		return null
	}
	const checkIfProjectExist = await db.project.findFirst({
		where: {
			name: data.name,
			userId: user.id,
		},
	})

	if (checkIfProjectExist) {
		return {
			success: false,
			message: 'Project already exist in your profile',
		}
	}

	const project = await db.project.create({
		data: {
			...data,
			userId: user.id,
		},
	})
	return {
		success: true,
		data: project,
	}
}
export const updateProject = async (id: string, data: ProjectSchema) => {
	const user = await getCurrentUser()
	if (!user) {
		return null
	}

	const project = await db.project.findFirst({
		where: {
			id,
			userId: user.id,
		},
	})

	if (!project) {
		return {
			success: false,
			message: 'Project not found',
		}
	}

	const updatedProject = await db.project.update({
		where: {
			id,
		},
		data,
	})

	return {
		success: true,
		data: updatedProject,
	}
}
