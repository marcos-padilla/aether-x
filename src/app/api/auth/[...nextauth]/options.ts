import db from '@/lib/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { Account } from '@prisma/client'
import bcrypt from 'bcrypt'
import { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(db),
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error('Invalid credentials')
				}

				const user = await db.user.findUnique({
					where: {
						email: credentials.email,
					},
				})

				if (!user || !user?.hashedPassword) {
					throw new Error('Invalid credentials')
				}

				const isCorrectPassword = await bcrypt.compare(
					credentials.password,
					user.hashedPassword
				)

				if (!isCorrectPassword) {
					throw new Error('Invalid credentials')
				}

				return user
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		//TODO: Fix link google account to user
		async signIn({ user, account, profile }) {
			if (account?.provider === 'google' && user.id) {
				await db.account.create({
					data: {
						...(account as Account),
						userId: user.id,
					},
				})
			}
			return true
		},
		async session({ session, token }) {
			const sanitizedToken = Object.keys(token).reduce((p, c) => {
				// strip unnecessary properties
				if (
					c !== 'iat' &&
					c !== 'exp' &&
					c !== 'jti' &&
					c !== 'hashedPassword'
				) {
					return { ...p, [c]: token[c] }
				} else {
					return p
				}
			}, {})
			return {
				...session,
				user: sanitizedToken,
			}
		},
		//@ts-expect-error
		async jwt({ token, user }) {
			if (typeof user !== 'undefined') {
				return user
			}
			return token
		},
	},
	pages: {
		signIn: '/auth/sign-in',
		error: '/auth/sign-in',
		newUser: '/setup',
	},
	debug: process.env.NODE_ENV === 'development',
}
