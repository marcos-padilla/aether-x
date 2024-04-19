'use server'

import { CustomServerResponse, ProjectSchema } from '@/lib/types'
import { getCurrentUser } from './user-controller'
import { Project } from '@prisma/client'
import db from '@/lib/db'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

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

export const getProjects = async () => {
	cookies()
	const user = await getCurrentUser()
	if (!user) {
		return null
	}

	const projects = await db.project.findMany({
		where: {
			userId: user.id,
		},
	})

	return projects
}

export const getProject = async (id: string) => {
	const user = await getCurrentUser()
	if (!user) {
		return null
	}
	const project = await db.project.findFirst({
		where: {
			id,
		},
		include: {
			Platforms: true,
			Database: {
				include: {
					Collections: true,
				},
			},
		},
	})

	if (!project) {
		return redirect('/404')
	}

	if (project.userId !== user.id) {
		return redirect('/403')
	}

	return project
}

export const deleteProject = async (id: string) => {
	const user = await getCurrentUser()
	if (!user) {
		return null
	}
	const projectToDelete = await db.project.findFirst({
		where: {
			id,
		},
	})

	if (!projectToDelete) {
		return {
			success: false,
			message: 'Project not found',
		}
	}

	if (projectToDelete.userId !== user.id) {
		return {
			success: false,
			message: 'You are not allowed to delete this project',
		}
	}

	await db.project.delete({
		where: {
			id,
		},
	})

	return {
		success: true,
	}
}
