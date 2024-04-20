'use server'

import db from '@/lib/db'
import bcrypt from 'bcrypt'
import { redirect } from 'next/navigation'
import * as z from 'zod'
import { getSession } from './auth-controller'
import { ExtendedUser } from '@/lib/types'

export const getCurrentUser = async ({
	shouldRedirect = true,
}: { shouldRedirect?: boolean } = {}) => {
	const session = await getSession()
	if (!session) {
		return shouldRedirect ? redirect('/auth/sign-in') : null
	}

	const currentUser = (await db.user.findUnique({
		where: {
			id: session.user.id,
		},
		include: {
			accounts: true,
			Plan: {
				include: {
					Features: true,
				},
			},
		},
	})) as ExtendedUser

	if (!currentUser) {
		return shouldRedirect ? redirect('/auth/sign-up') : null
	}
	return currentUser
}
