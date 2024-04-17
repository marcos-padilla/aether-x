'use client'

import { useModal } from '@/providers/modal-provider'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog'

interface CustomModalProps {
	title?: string
	subheading?: string
	children: React.ReactNode
	defaultOpen?: boolean
}

export default function CustomModal({
	children,
	defaultOpen,
	subheading,
	title,
}: CustomModalProps) {
	const { isOpen, setClose } = useModal()
	return (
		<Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
			<DialogContent className='overflow-y-auto h-auto max-h-dvh bg-card max-w-2xl'>
				{(title || subheading) && (
					<DialogHeader className='text-left'>
						{title && (
							<DialogTitle className='text-2xl font-bold'>
								{title}
							</DialogTitle>
						)}
						{subheading && (
							<DialogDescription>
								{subheading}
							</DialogDescription>
						)}
					</DialogHeader>
				)}
				{children}
			</DialogContent>
		</Dialog>
	)
}
