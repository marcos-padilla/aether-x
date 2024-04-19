'use client'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button, buttonVariants } from '@/components/ui/button'
import { Edit, Eye, MoreVertical, Trash2 } from 'lucide-react'
import { Project } from '@prisma/client'
import { useModal } from '@/providers/modal-provider'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import CustomModal from '@/components/modals/custom-modal'
import ProjectForm from '@/components/forms/project-form'
export default function ProjectDropdownMenu({ project }: { project: Project }) {
	const { setOpen } = useModal()

	const handleDelete = () => {}

	return (
		<AlertDialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size={'icon'} variant={'ghost'}>
						<MoreVertical />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem className='flex gap-x-1'>
						<Eye size={15} />
						View
					</DropdownMenuItem>
					<DropdownMenuItem
						className='flex gap-x-1'
						onClick={() => {
							console.log('View project')

							setOpen(
								<CustomModal>
									<ProjectForm
										mode='edit'
										project={project}
									/>
								</CustomModal>
							)
						}}
					>
						<Edit size={15} />
						Edit
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<AlertDialogTrigger asChild>
						<DropdownMenuItem className='text-destructive hover:!text-destructive flex gap-x-1'>
							<Trash2 size={15} />
							Delete
						</DropdownMenuItem>
					</AlertDialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialogContent>
				<AlertDialogTitle>Delete Project</AlertDialogTitle>
				<AlertDialogDescription>
					Are you sure you want to delete this project? This
					action cannot be undone.
				</AlertDialogDescription>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction
					className={cn(
						buttonVariants({
							variant: 'destructive',
						})
					)}
					onClick={handleDelete}
				>
					Delete
				</AlertDialogAction>
			</AlertDialogContent>
		</AlertDialog>
	)
}
