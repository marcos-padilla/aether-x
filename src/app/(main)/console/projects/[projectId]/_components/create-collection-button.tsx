'use client'

import CollectionForm from '@/components/forms/collection-form'
import CustomModal from '@/components/modals/custom-modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal-provider'
import { Plus } from 'lucide-react'

export default function CreateCollectionButton({
	databaseId,
}: {
	databaseId: string
}) {
	const { setOpen } = useModal()
	return (
		<Button
			size={'sm'}
			variant={'outline'}
			className='gap-x-1'
			onClick={() => {
				setOpen(
					<CustomModal>
						<CollectionForm databaseId={databaseId} />
					</CustomModal>
				)
			}}
		>
			<Plus />
			Create Collection
		</Button>
	)
}
