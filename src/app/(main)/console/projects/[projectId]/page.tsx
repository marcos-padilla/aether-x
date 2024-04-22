import { getProject } from '@/controllers/project-controller'
import { redirect } from 'next/navigation'
import GetStarted from './_components/get-started'
import IdSpan from '@/components/globals/id-span'
import Overview from './_components/overview'

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
			<div className='bg-accent/60 h-40 pt-5 px-4'>
				<div className='container'>
					<div className='flex items-center gap-x-2'>
						<h1 className='text-xl'>{project.name}</h1>
						<IdSpan id={project.id} />
					</div>
				</div>
			</div>
			<div className='container -mt-5'>
				{project.Platforms.length === 0 ? (
					<GetStarted projectId={project.id} />
				) : (
					<Overview project={project} />
				)}
			</div>
		</div>
	)
}
