import ActionTooltip from '@/components/globals/action-tooltip'
import { getProject } from '@/controllers/project-controller'
import { redirect } from 'next/navigation'
import ProjectIdSpan from './_components/project-id-span'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'

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
			<div className='container'>
				<Card className='-mt-5'>
					<CardHeader>
						<CardTitle>Get Started</CardTitle>
						<CardDescription>
							Here are some next steps to start building
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Separator className='my-5' />
						<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
							<div className='flex flex-col'>
								<h2>Add a platform</h2>
								<h3 className='text-muted-foreground text-sm'>
									Speed up your web development with
									our SDK
								</h3>
							</div>
							<button className='border rounded-md flex items-center justify-center px-2 py-2 gap-2 hover:bg-accent transition-all duration-300'>
								Web
								<Plus />
							</button>
						</div>
						<div className='my-14 border-t relative'>
							<span className='absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 px-2 bg-background'>
								OR
							</span>
						</div>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
							<div className='flex flex-col'>
								<h2>Integrate with your server</h2>
								<h3 className='text-muted-foreground text-sm'>
									Easy way to integrateAetherX with
									your backend code base
								</h3>
							</div>
							<button className='border rounded-md flex items-center justify-center px-2 py-2 gap-2 hover:bg-accent transition-all duration-300'>
								API key
								<Plus />
							</button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
