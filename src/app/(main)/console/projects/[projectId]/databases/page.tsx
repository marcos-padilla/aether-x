import ActionTooltip from '@/components/globals/action-tooltip'
import DataTable from '@/components/globals/data-table'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { getDatabases } from '@/controllers/database-controller'
import CreateDatabaseButton from '../_components/create-database-button'
import { DatabaseActions } from './_components/database-action'
import { DatabaseColumns } from './_components/database-column'

export default async function DatabasePage({
	params,
}: {
	params: { projectId: string }
}) {
	const databases = await getDatabases(params.projectId)

	return (
		<div className='container pt-5'>
			<Card>
				<CardHeader className='flex flex-row justify-between items-center'>
					<div className='flex gap-x-5 items-center'>
						<CardTitle>Databases</CardTitle>
						<ActionTooltip label='Upgrade your plan to create more databases'>
							<CardDescription className='rounded-full bg-accent px-3 py-1 hover:bg-accent/50 transition-all hover:text-foreground cursor-pointer'>
								{databases.length}/1 created
							</CardDescription>
						</ActionTooltip>
					</div>
					<CreateDatabaseButton projectId={params.projectId} />
				</CardHeader>
				<CardDescription>
					<DataTable
						columns={DatabaseColumns}
						data={databases}
						actions={DatabaseActions}
					/>
				</CardDescription>
			</Card>
		</div>
	)
}
