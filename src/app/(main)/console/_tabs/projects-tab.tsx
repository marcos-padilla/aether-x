import { Button } from '@/components/ui/button'
import { Plus, PlusCircle } from 'lucide-react'

export default function ProjectsTab() {
	return (
		<div className='flex flex-col gap-y-5'>
			<div className='flex items-center justify-between'>
				<h2 className='text-lg'>Projects</h2>
				<Button>
					<Plus />
					Add Project
				</Button>
			</div>
			<div className='flex flex-wrap gap-4'>
				<button className='bg-accent hover:bg-accent/80 transition-all duration-200 rounded-md p-4 w-96 aspect-video flex items-center justify-center flex-col gap-2'>
					<PlusCircle size={40} strokeWidth={1} />
					<span className=''>Add new project</span>
				</button>
			</div>
		</div>
	)
}
