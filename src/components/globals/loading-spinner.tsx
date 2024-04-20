import { Loader2Icon } from 'lucide-react'

export default function LoadingSpinner({ size }: { size?: number }) {
	return (
		<div className='animate-spin'>
			<Loader2Icon size={size ?? 20} />
		</div>
	)
}
