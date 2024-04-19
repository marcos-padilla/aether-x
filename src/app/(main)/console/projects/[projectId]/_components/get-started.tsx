import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import AddWebPlatformButton from './add-web-platform-button'
import { Plus } from 'lucide-react'

export default function GetStarted({ projectId }: { projectId: string }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Get Started</CardTitle>
				<CardDescription>
					Here are some next steps to start building
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Separator className='my-5' />
				<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
					<div className='flex flex-col'>
						<h2>Add a platform</h2>
						<h3 className='text-muted-foreground text-sm'>
							Speed up your web development with our SDK
						</h3>
					</div>
					<AddWebPlatformButton projectId={projectId} />
				</div>
				<div className='my-14 border-t relative'>
					<span className='absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 px-2 bg-background'>
						OR
					</span>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
					<div className='flex flex-col'>
						<h2>Integrate with your server</h2>
						<h3 className='text-muted-foreground text-sm'>
							Easy way to integrateAetherX with your
							backend code base
						</h3>
					</div>
					<button className='border rounded-md flex items-center justify-center px-2 py-2 gap-2 hover:bg-accent transition-all duration-300'>
						API key
						<Plus />
					</button>
				</div>
			</CardContent>
		</Card>
	)
}
