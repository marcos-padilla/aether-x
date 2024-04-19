import ProjectSidebar from '../../_components/project-sidebar'

export default function ProjectLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className=''>
			<aside className='fixed left-0 top-20 bottom-0 w-60 hidden lg:block bg-accent/20 border-r p-4'>
				<ProjectSidebar />
			</aside>
			<main className='lg:ml-60'>{children}</main>
		</div>
	)
}
