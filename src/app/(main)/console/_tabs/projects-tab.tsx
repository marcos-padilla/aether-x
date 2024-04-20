import NewProjectButton from '@/components/buttons/new-project-button'
import { buttonVariants } from '@/components/ui/button'

import { Skeleton } from '@/components/ui/skeleton'
import { canCreateProject, getProjects } from '@/controllers/project-controller'
import { cn } from '@/lib/utils'
import { Plus, PlusCircle } from 'lucide-react'
import Link from 'next/link'
import ProjectDropdownMenu from '../_components/project-dropdown-menu'

export default async function ProjectsTab() {
	const projects = await getProjects()
	const _canCreateProject = await canCreateProject()
	return (
		<div className='container flex flex-col gap-y-5'>
			<div className='flex items-center justify-between'>
				<h2 className='text-lg'>Projects</h2>
				<NewProjectButton
					className={cn(
						buttonVariants(),
						!_canCreateProject &&
							'opacity-50 pointer-events-none'
					)}
				>
					<Plus />
					Add Project
				</NewProjectButton>
			</div>
			<div className='flex flex-wrap gap-4 flex-col items-center md:flex-row'>
				{projects?.map((project) => (
					<Link
						key={project.id}
						className='bg-accent hover:bg-accent/80 transition-all duration-200 rounded-md p-4 w-96 aspect-video flex flex-col gap-2'
						href={`/console/projects/${project.id}`}
					>
						<div className='flex items-center justify-between'>
							<h3>{project.name}</h3>
							<ProjectDropdownMenu project={project} />
						</div>
					</Link>
				))}
				<NewProjectButton
					className={cn(
						'bg-accent hover:bg-accent/80 transition-all duration-200 rounded-md p-4 w-96 aspect-video flex items-center justify-center flex-col gap-2',
						!_canCreateProject &&
							'opacity-50 pointer-events-none'
					)}
				>
					<PlusCircle size={40} strokeWidth={1} />
					<span className=''>Add new project</span>
				</NewProjectButton>
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
