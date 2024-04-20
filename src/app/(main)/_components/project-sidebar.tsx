'use client'

import {
	Box,
	ChevronRight,
	Database,
	GanttChart,
	LucideIcon,
	Settings2,
	Users,
} from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface SidebarLinkProps {
	icon: LucideIcon
	label: string
	href: string
	onRedirect?: () => void
}

const SidebarLink = ({
	href,
	icon: Icon,
	label,
	onRedirect,
}: SidebarLinkProps) => {
	return (
		<Link
			href={href}
			className='flex items-center justify-between text-muted-foreground hover:text-foreground transition-all duration-200 rounded-md hover:bg-accent px-2 py-1 group'
			onClick={() => {
				if (onRedirect) onRedirect()
			}}
		>
			<div className='flex items-center gap-x-2'>
				<Icon size={20} />
				<span>{label}</span>
			</div>
			<ChevronRight
				size={20}
				className='transition-all duration-200 -translate-x-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
			/>
		</Link>
	)
}

export default function ProjectSidebar({
	onRedirect,
}: {
	onRedirect?: () => void
}) {
	const { projectId } = useParams()
	return (
		<div className='flex flex-col h-full gap-y-2'>
			<SidebarLink
				href={`/console/projects/${projectId}`}
				icon={GanttChart}
				label='Overview'
				onRedirect={onRedirect}
			/>
			<SidebarLink
				href={`/console/projects/${projectId}/auth`}
				icon={Users}
				label='Auth'
				onRedirect={onRedirect}
			/>
			<SidebarLink
				href={`/console/projects/${projectId}/databases`}
				icon={Database}
				label='Databases'
				onRedirect={onRedirect}
			/>
			<SidebarLink
				href={`/console/projects/${projectId}/storage`}
				icon={Box}
				label='Storage'
				onRedirect={onRedirect}
			/>
			<div className='mt-auto mb-4'>
				<SidebarLink
					href={`/console/projects/${projectId}/settings`}
					icon={Settings2}
					label='Settings'
					onRedirect={onRedirect}
				/>
			</div>
		</div>
	)
}
