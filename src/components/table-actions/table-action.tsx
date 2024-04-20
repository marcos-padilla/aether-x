import { TableAction } from '@/lib/types'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'
import { Button } from '../ui/button'
import { DropdownMenuItem } from '../ui/dropdown-menu'
import { useModal } from '@/providers/modal-provider'
import CustomModal from '../modals/custom-modal'

interface TableActionProps<TData> {
	action: TableAction<TData>
	data: TData[]
	isMenuItem?: boolean
}

export default function TableActionItem<TData>({
	action: { trigger, disabled, Modal, meta },
	data,
	isMenuItem,
}: TableActionProps<TData>) {
	const isDisabled = useMemo(() => {
		return disabled
			? typeof disabled === 'function'
				? disabled(data)
				: disabled
			: false
	}, [disabled, data])
	const { setOpen } = useModal()
	const handleAction = () => {
		if (isDisabled) return
		setOpen(
			<CustomModal
				title={meta?.modalTitle}
				subheading={meta?.modalSubheading}
			>
				<Modal data={data} />
			</CustomModal>
		)
	}
	if (isMenuItem) {
		return (
			<DropdownMenuItem
				disabled={isDisabled}
				className={cn(
					'text-sm flex items-center gap-x-1',
					trigger.variant === 'destructive' &&
						'text-destructive hover:!text-destructive hover:!bg-destructive/20'
				)}
				onClick={handleAction}
			>
				{trigger.icon && <trigger.icon size={18} />}
				{trigger.label}
			</DropdownMenuItem>
		)
	}
	return (
		<Button
			size={'sm'}
			variant={trigger.variant ?? 'ghost'}
			className={cn(
				'text-sm flex items-center gap-x-1 rounded-md border border-transparent px-2 py-1 hover:bg-accent transition-all duration-200 cursor-pointer',
				trigger.variant === 'destructive' &&
					'bg-transparent text-destructive hover:bg-destructive/20 hover:border-destructive'
			)}
			disabled={isDisabled}
			onClick={handleAction}
		>
			{trigger.icon && <trigger.icon size={18} />}
			{trigger.label}
		</Button>
	)
}
