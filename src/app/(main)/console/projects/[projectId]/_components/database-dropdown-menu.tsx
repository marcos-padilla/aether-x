'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { ExtendedProject } from '@/lib/types'
import { ChevronDown, Edit, Eye, Trash2 } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { deleteDatabase } from '@/controllers/database-controller'
import { useRouter } from 'next/navigation'
import { useModal } from '@/providers/modal-provider'
import CustomModal from '@/components/modals/custom-modal'
import CreateDatabaseForm from '@/components/forms/create-database-form'
export default function DatabaseDropdownMenu({
	project,
}: {
	project: ExtendedProject
}) {
	const { toast } = useToast()
	const router = useRouter()
	const { setOpen } = useModal()

	const handleDelete = async () => {
		const res = await deleteDatabase(project.id, project.Database.id)
		if (res.success) {
			toast({
				title: 'Database deleted',
				variant: 'success',
			})
			router.refresh()
		} else {
			toast({
				title: 'Error while deleting the database',
				description: res.message,
				variant: 'destructive',
			})
		}
	}

	return (
		<AlertDialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button className='text-sm text-muted-foreground hover:text-foreground flex items-center gap-x-1'>
						<span className='truncate'>
							{project.Database.name}
						</span>
						<ChevronDown size={18} />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem className='flex items-center gap-x-1'>
						<Eye size={16} />
						View
					</DropdownMenuItem>
					<DropdownMenuItem
						className='flex items-center gap-x-1'
						onClick={() => {
							setOpen(
								<CustomModal>
									<CreateDatabaseForm
										projectId={project.id}
										database={project.Database}
										mode='edit'
									/>
								</CustomModal>
							)
						}}
					>
						<Edit size={16} />
						Edit
					</DropdownMenuItem>
					<AlertDialogTrigger asChild>
						<DropdownMenuItem className='flex items-center gap-x-1'>
							<Trash2 size={16} />
							Delete
						</DropdownMenuItem>
					</AlertDialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Database</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete the database of
						this project? This action cannot be undone and all
						data will be lost
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className={buttonVariants({
							variant: 'destructive',
						})}
						onClick={handleDelete}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
