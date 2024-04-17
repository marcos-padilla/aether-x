import { getCurrentUser } from '@/controllers/user-controller'
import { redirect } from 'next/navigation'

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const user = await getCurrentUser()
	if (!user) {
		return redirect('/auth/sign-in')
	}
	return children
}
