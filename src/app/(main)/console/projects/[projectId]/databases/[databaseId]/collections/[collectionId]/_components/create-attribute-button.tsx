'use client'

import AttributeForm from '@/components/forms/attribute-form'
import CollectionForm from '@/components/forms/collection-form'
import CustomModal from '@/components/modals/custom-modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal-provider'
import { Plus } from 'lucide-react'

export default function CreateAttributeButton({
	collectionId,
}: {
	collectionId: string
}) {
	const { setOpen } = useModal()
	return (
		<Button
			size={'sm'}
			className='gap-x-1'
			onClick={() => {
				setOpen(
					<CustomModal>
						<AttributeForm collectionId={collectionId} />
					</CustomModal>
				)
			}}
		>
			<Plus />
			Create Attribute
		</Button>
	)
}
