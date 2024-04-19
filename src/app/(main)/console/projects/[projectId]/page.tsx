import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getProject } from '@/controllers/project-controller'
import { Plus } from 'lucide-react'
import { redirect } from 'next/navigation'
import ProjectIdSpan from './_components/project-id-span'
import AddWebPlatformButton from './_components/add-web-platform-button'
import GetStartedComponent from './_components/get-started-component'

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
						<ProjectIdSpan id={project.id} />
					</div>
				</div>
			</div>
			{project.Platforms.length === 0 ? (
				<GetStartedComponent projectId={project.id} />
			) : (
				<div>Hello World</div>
			)}
		</div>
	)
}
