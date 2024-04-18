'use client'

import { createProject, updateProject } from '@/controllers/project-controller'
import { projectSchema } from '@/lib/schemas'
import { CustomServerResponse, ProjectSchema } from '@/lib/types'
import { filterUndefiedValues } from '@/lib/utils'
import { useModal } from '@/providers/modal-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Loading from '../globals/loading'
import { Button } from '../ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'

interface ProjectFormProps {
	mode?: 'create' | 'edit'
	project?: { name: string; id: string }
}
export default function ProjectForm({
	mode = 'create',
	project,
}: ProjectFormProps) {
	const { toast } = useToast()
	const router = useRouter()
	const form = useForm<ProjectSchema>({
		mode: 'onChange',
		resolver: zodResolver(projectSchema),
		defaultValues: {
			name: '',
		},
	})

	useEffect(() => {
		if (project && mode === 'edit') {
			form.reset(filterUndefiedValues(project) as ProjectSchema)
		}
	}, [project, mode])

	const { setClose } = useModal()

	const handleSubmit = async (data: ProjectSchema) => {
		if (mode === 'create') {
			const res = await createProject(data)
			if (res?.success) {
				toast({
					title: 'Project Created',
					variant: 'success',
				})
				setClose()
				form.reset()
				router.push(`/projects/${res.data!.id}`)
			} else {
				toast({
					title: 'Error',
					description:
						res?.message ||
						'An error occurred while creating the project',
					variant: 'destructive',
				})
			}
		} else if (mode === 'edit') {
			if (project?.id) {
				const res = await updateProject(project.id, data)
				if (res?.success) {
					toast({
						title: 'Project Updated',
						description: `The project ${data.name} has been updated successfully`,
						variant: 'success',
					})
					setClose()
					form.reset()
					router.refresh()
				} else {
					toast({
						title: 'Error',
						description:
							'An error occurred while updating the project',
						variant: 'destructive',
					})
				}
			}
		}
	}

	return (
		<Card className='border-none'>
			<CardHeader>
				<CardTitle>
					{mode === 'create' ? 'Create Project' : 'Edit Project'}
				</CardTitle>
				<CardDescription>
					{mode === 'create'
						? 'Enter the project name'
						: 'Edit the project information'}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className='flex flex-col gap-6'
					>
						<FormField
							name='name'
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='Type the name of the project'
										/>
									</FormControl>
									<FormMessage />
									<FormDescription>
										The name of the project must
										to be unique
									</FormDescription>
								</FormItem>
							)}
						/>
						<Button
							disabled={
								form.formState.isSubmitting ||
								(mode === 'edit' &&
									!form.formState.isDirty)
							}
							type='submit'
						>
							{form.formState.isSubmitting ? (
								<Loading />
							) : mode === 'create' ? (
								'Create Project'
							) : (
								'Edit Project'
							)}
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
