'use client'

import ProjectForm from '@/components/forms/project-form'
import CustomModal from '@/components/modals/custom-modal'
import { Button, buttonVariants } from '@/components/ui/button'
import { useModal } from '@/providers/modal-provider'
import { Plus, PlusCircle } from 'lucide-react'
import Link from 'next/link'

export default function ProjectsTab() {
	const { setOpen } = useModal()
	return (
		<div className='container flex flex-col gap-y-5'>
			<div className='flex items-center justify-between'>
				<h2 className='text-lg'>Projects</h2>
				<Link href={'/new-project'} className={buttonVariants()}>
					<Plus />
					Add Project
				</Link>
			</div>
			<div className='flex flex-wrap gap-4'>
				<button
					className='bg-accent hover:bg-accent/80 transition-all duration-200 rounded-md p-4 w-96 aspect-video flex items-center justify-center flex-col gap-2'
					onClick={() => {
						setOpen(
							<CustomModal>
								<ProjectForm />
							</CustomModal>
						)
					}}
				>
					<PlusCircle size={40} strokeWidth={1} />
					<span className=''>Add new project</span>
				</button>
			</div>
		</div>
	)
}
