import { cn } from '@/lib/utils'
import { FormLabel } from '../ui/form'

interface OptionalFormLabelProps {
	label: string
	className?: string
}

export default function OptionalFormLabel({
	label,
	className,
}: OptionalFormLabelProps) {
	return (
		<FormLabel className={cn('flex items-center gap-x-2', className)}>
			{label}
			<span className='text-muted-foreground text-sm'>(optional)</span>
		</FormLabel>
	)
}
