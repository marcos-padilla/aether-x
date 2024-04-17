import { getCurrentUser } from '@/controllers/user-controller'
import { redirect } from 'next/navigation'
import Header from './_components/header'

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const user = await getCurrentUser()
	if (!user) {
		return redirect('/auth/sign-in')
	}
	return (
		<>
			<Header />
			{children}
		</>
	)
}
