'use client'

import ActionTooltip from '@/components/globals/action-tooltip'
import { useToast } from '@/components/ui/use-toast'

export default function IdSpan({ id }: { id: string }) {
	const { toast } = useToast()

	const handleCopy = () => {
		navigator.clipboard.writeText(id)
		toast({
			title: 'ID Copied',
			variant: 'success',
		})
	}

	return (
		<ActionTooltip label='Copy ID'>
			<button
				onClick={handleCopy}
				className='bg-accent rounded-lg px-2 py-1 text-muted-foreground cursor-pointer hover:bg-background hover:text-foreground transition-all duration-150 truncate'
			>
				{id}
			</button>
		</ActionTooltip>
	)
}
