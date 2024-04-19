'use server'

import db from '@/lib/db'
import { CustomServerResponse, PlatformSchema } from '@/lib/types'
import { Platform } from '@prisma/client'
import { getCurrentUser } from './user-controller'
import { redirect } from 'next/navigation'

export const createPlatform = async (
	projectId: string,
	data: PlatformSchema
): Promise<CustomServerResponse<Platform>> => {
	const user = await getCurrentUser()
	if (!user) {
		return redirect('/auth/sign-in')
	}

	const project = await db.project.findFirst({
		where: {
			id: projectId,
		},
		include: {
			Platforms: true,
		},
	})

	if (!project) {
		return redirect('/404')
	}

	if (project.userId !== user.id) {
		return {
			success: false,
			message: 'You do not have permission to create a platform for this project',
		}
	}

	if (project.Platforms.length >= 1) {
		return {
			success: false,
			message: 'You can only have one platform per project in your current plan. Upgrade to add more platforms',
		}
	}

	const platform = await db.platform.create({
		data: {
			...data,
			projectId,
		},
	})

	return {
		success: true,
		data: platform,
	}
}
