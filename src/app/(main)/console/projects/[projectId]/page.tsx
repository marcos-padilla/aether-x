import ActionTooltip from '@/components/globals/action-tooltip'
import { getProject } from '@/controllers/project-controller'
import { redirect } from 'next/navigation'
import ProjectIdSpan from './_components/project-id-span'

export default async function ProjectIdPage({
	params,
}: {
	params: { projectId: string }
}) {
	const project = await getProject(params.projectId)
	if (!project) {
		return redirect('/console')
	}
	return (
		<div>
			<div className='bg-accent/60 py-8 px-4'>
				<div className='flex items-center gap-x-2'>
					<h1 className='text-xl'>{project.name}</h1>
					<ProjectIdSpan id={project.id} />
				</div>
			</div>
		</div>
	)
}
