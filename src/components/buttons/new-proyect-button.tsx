'use client'

import { useModal } from '@/providers/modal-provider'
import CustomModal from '../modals/custom-modal'
import ProjectForm from '../forms/project-form'

export default function NewProyectButton({
	children,
	className,
}: {
	children: React.ReactNode
	className?: string
}) {
	const { setOpen } = useModal()

	return (
		<button
			className={className}
			onClick={() => {
				setOpen(
					<CustomModal>
						<ProjectForm />
					</CustomModal>
				)
			}}
		>
			{children}
		</button>
	)
}
