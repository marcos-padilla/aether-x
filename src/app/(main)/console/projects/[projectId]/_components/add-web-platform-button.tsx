'use client'

import AddPlatformForm from '@/components/forms/add-platform-form'
import CustomModal from '@/components/modals/custom-modal'
import { useModal } from '@/providers/modal-provider'
import { Plus } from 'lucide-react'

export default function AddWebPlatformButton({
	projectId,
}: {
	projectId: string
}) {
	const { setOpen } = useModal()

	return (
		<button
			className='border rounded-md flex items-center justify-center px-2 py-2 gap-2 hover:bg-accent transition-all duration-300'
			onClick={() => {
				setOpen(
					<CustomModal>
						<AddPlatformForm projectId={projectId} />
					</CustomModal>
				)
			}}
		>
			Web
			<Plus />
		</button>
	)
}
