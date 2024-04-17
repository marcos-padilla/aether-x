import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

export default function Header() {
	return (
		<header className='sticky inset-x-0 top-0 border-b p-4 bg-background z-50 flex items-center justify-between'>
			<div className='flex items-center gap-x-2'>
				<div className='lg:hidden'>
					<Sheet>
						<SheetTrigger asChild>
							<Button size={'icon'} variant={'ghost'}>
								<Menu />
							</Button>
						</SheetTrigger>
						<SheetContent side={'left'}></SheetContent>
					</Sheet>
				</div>
				<h2 className='font-bold text-xl'>
					Aether
					<span className='font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500'>
						X
					</span>
				</h2>
			</div>
		</header>
	)
}
