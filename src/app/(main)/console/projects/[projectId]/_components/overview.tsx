import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { ExtendedProject } from '@/lib/types'
import { Box, Database } from 'lucide-react'
import CreateDatabaseButton from './create-database-button'

export default function Overview({ project }: { project: ExtendedProject }) {
	return (
		<div className='flex flex-col gap-4'>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
				<Card>
					<CardHeader className='flex flex-row justify-between'>
						<div>
							<CardTitle>
								0 <span className='text-sm'>B</span>
							</CardTitle>
							<CardDescription>Bandwidth</CardDescription>
						</div>
						<Select>
							<SelectTrigger className='w-auto'>
								<SelectValue placeholder='24h' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='24h'>
										24h
									</SelectItem>
									<SelectItem value='48h'>
										48h
									</SelectItem>
									<SelectItem value='7d'>
										7d
									</SelectItem>
									<SelectItem value='30d'>
										30d
									</SelectItem>
									<SelectItem value='60d'>
										60d
									</SelectItem>
									<SelectItem value='90d'>
										90d
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</CardHeader>
					<CardContent>
						<Card className='bg-accent/50 flex p-4 items-center justify-center'>
							No data to show
						</Card>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row justify-between'>
						<div>
							<CardTitle>0</CardTitle>
							<CardDescription>Requests</CardDescription>
						</div>
						<Select>
							<SelectTrigger className='w-auto'>
								<SelectValue placeholder='24h' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='24h'>
										24h
									</SelectItem>
									<SelectItem value='48h'>
										48h
									</SelectItem>
									<SelectItem value='7d'>
										7d
									</SelectItem>
									<SelectItem value='30d'>
										30d
									</SelectItem>
									<SelectItem value='60d'>
										60d
									</SelectItem>
									<SelectItem value='90d'>
										90d
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</CardHeader>
					<CardContent>
						<Card className='bg-accent/50 flex p-4 items-center justify-center'>
							No data to show
						</Card>
					</CardContent>
				</Card>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<Card>
					<CardHeader className='flex flex-row justify-between gap-x-2'>
						<CardTitle className='flex items-center gap-x-2 text-sm '>
							<Database />
							Database
						</CardTitle>
						{project.Database && (
							<span className='text-sm truncate text-muted-foreground'>
								{project.Database.name}
							</span>
						)}
					</CardHeader>
					<CardContent className='flex flex-col'>
						{project.Database ? (
							<div></div>
						) : (
							<div className='flex justify-end'>
								<CreateDatabaseButton
									projectId={project.id}
								/>
							</div>
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row justify-between'>
						<CardTitle className='flex items-center gap-x-2 text-sm '>
							<Box />
							Storage
						</CardTitle>
					</CardHeader>
					<CardContent>0 B</CardContent>
				</Card>
			</div>
		</div>
	)
}
