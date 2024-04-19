import NewProyectButton from '@/components/buttons/new-proyect-button'
import { Button, buttonVariants } from '@/components/ui/button'

import { Skeleton } from '@/components/ui/skeleton'
import { getProjects } from '@/controllers/project-controller'
import {
	Edit,
	Eye,
	MoreVertical,
	Plus,
	PlusCircle,
	Trash2,
	View,
} from 'lucide-react'
import ProjectDropdownMenu from '../_components/project-dropdown-menu'

export default async function ProjectsTab() {
	const projects = await getProjects()
	return (
		<div className='container flex flex-col gap-y-5'>
			<div className='flex items-center justify-between'>
				<h2 className='text-lg'>Projects</h2>
				<NewProyectButton className={buttonVariants()}>
					<Plus />
					Add Project
				</NewProyectButton>
			</div>
			<div className='flex flex-wrap gap-4 flex-col items-center md:flex-row'>
				{projects?.map((project) => (
					<div
						key={project.id}
						className='bg-accent hover:bg-accent/80 transition-all duration-200 rounded-md p-4 w-96 aspect-video flex flex-col gap-2'
					>
						<div className='flex items-center justify-between'>
							<h3>{project.name}</h3>
							<ProjectDropdownMenu project={project} />
						</div>
					</div>
				))}
				<NewProyectButton className='bg-accent hover:bg-accent/80 transition-all duration-200 rounded-md p-4 w-96 aspect-video flex items-center justify-center flex-col gap-2'>
					<PlusCircle size={40} strokeWidth={1} />
					<span className=''>Add new project</span>
				</NewProyectButton>
			</div>
		</div>
	)
}

ProjectsTab.Skeleton = function ProjectsTabSkeleton() {
	return (
		<div className='flex flex-wrap gap-4'>
			{Array.from({ length: 10 })?.map((_, index) => (
				<Skeleton
					key={index}
					className='rounded-md w-96 aspect-video'
					style={{
						animationDelay: `${index * 0.1}s`,
					}}
				/>
			))}
		</div>
	)
}
