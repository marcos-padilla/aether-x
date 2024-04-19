'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import ProjectSidebar from './project-sidebar'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function HeaderProjectSidebarTrigger() {
	const { projectId } = useParams()
	const [open, setOpen] = useState(false)
	if (!projectId) return null
	return (
		<div className='lg:hidden'>
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<Button size={'icon'} variant={'ghost'}>
						<Menu />
					</Button>
				</SheetTrigger>
				<SheetContent side={'left'}>
					<ProjectSidebar onRedirect={() => setOpen(false)} />
				</SheetContent>
			</Sheet>
		</div>
	)
}
