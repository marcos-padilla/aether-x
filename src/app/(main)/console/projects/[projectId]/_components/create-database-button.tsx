'use client'

import CreateDatabaseForm from '@/components/forms/create-database-form'
import CustomModal from '@/components/modals/custom-modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal-provider'

export default function CreateDatabaseButton({
	projectId,
	disabled,
}: {
	projectId: string
	disabled?: boolean
}) {
	const { setOpen } = useModal()
	return (
		<Button
			disabled={disabled}
			onClick={() => {
				setOpen(
					<CustomModal>
						<CreateDatabaseForm projectId={projectId} />
					</CustomModal>
				)
			}}
		>
			Create Database
		</Button>
	)
}
