'use server'

import db from '@/lib/db'
import { SignUpSchema } from '@/lib/types'
import bcrypt from 'bcrypt'

import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { ExtendedSession } from '@/lib/types'
import { getServerSession } from 'next-auth'

export const getSession = async (): Promise<ExtendedSession | null> => {
	return await getServerSession(authOptions)
}

export const signUp = async (data: SignUpSchema) => {
	// check if email is already in use
	const existingUser = await db.user.findFirst({
		where: {
			email: data.email,
		},
	})
	if (existingUser) {
		return {
			success: false,
			message: 'Email is already in use',
		}
	}

	const hashedPassword = bcrypt.hashSync(data.password, 12)
	const user = await db.user.create({
		data: {
			email: data.email,
			firstName: data.firstName,
			lastName: data.lastName,
			hashedPassword,
		},
	})

	return {
		success: true,
	}
}
