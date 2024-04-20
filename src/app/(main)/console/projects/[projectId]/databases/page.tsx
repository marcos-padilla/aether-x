import ActionTooltip from '@/components/globals/action-tooltip'
import DataTable from '@/components/globals/data-table'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	canCreateDatabase,
	getDatabases,
} from '@/controllers/database-controller'
import CreateDatabaseButton from '../_components/create-database-button'
import { DatabaseActions } from './_components/database-action'
import { DatabaseColumns } from './_components/database-column'
import db from '@/lib/db'
import { getCurrentUser } from '@/controllers/user-controller'

export default async function DatabasePage({
	params,
}: {
	params: { projectId: string }
}) {
	const databases = await getDatabases(params.projectId)
	const user = await getCurrentUser()
	const cantDatabasesPerProject =
		user?.Plan.Features.find(
			(feat) => feat.name === 'DATABASE_PER_PROJECT_COUNT'
		)?.value || 0
	const canCreateDatabase = cantDatabasesPerProject > databases.length
	return (
		<div className='container pt-5'>
			<Card>
				<CardHeader className='flex flex-row justify-between items-center'>
					<div className='flex gap-x-5 items-center'>
						<CardTitle>Databases</CardTitle>
						<ActionTooltip label='Upgrade your plan to create more databases'>
							<CardDescription className='rounded-full bg-accent px-3 py-1 hover:bg-accent/50 transition-all hover:text-foreground cursor-pointer'>
								{databases.length}/
								{cantDatabasesPerProject} created
							</CardDescription>
						</ActionTooltip>
					</div>
					<CreateDatabaseButton
						projectId={params.projectId}
						disabled={!canCreateDatabase}
					/>
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
