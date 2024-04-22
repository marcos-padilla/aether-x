import ActionTooltip from '@/components/globals/action-tooltip'
import DataTable from '@/components/globals/data-table'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { getCollections } from '@/controllers/collection-controller'
import { getCurrentUser } from '@/controllers/user-controller'
import CreateCollectionButton from '../../_components/create-collection-button'
import { CollectionActions } from './_components/collection-actions'
import { CollectionColumns } from './_components/collection-columns'

export default async function DatabasePage({
	params: { projectId, databaseId },
}: {
	params: { projectId: string; databaseId: string }
}) {
	const user = await getCurrentUser()
	const collections = await getCollections(databaseId)
	const cantCollectionsPerDatabase =
		user?.Plan.Features.find(
			(feat) => feat.name === 'COLLECTION_PER_DATABASE_COUNT'
		)?.value || 0
	const canCreateCollection = cantCollectionsPerDatabase > collections.length
	return (
		<div className='container pt-5'>
			<Card>
				<CardHeader className='flex flex-row justify-between items-center'>
					<div className='flex gap-x-5 items-center'>
						<CardTitle>Collections</CardTitle>
						<ActionTooltip label='Upgrade your plan to create more collections in this database'>
							<CardDescription className='rounded-full bg-accent px-3 py-1 hover:bg-accent/50 transition-all hover:text-foreground cursor-pointer'>
								{collections.length}/
								{cantCollectionsPerDatabase} created
							</CardDescription>
						</ActionTooltip>
					</div>
					<CreateCollectionButton
						databaseId={databaseId}
						disabled={!canCreateCollection}
					/>
				</CardHeader>
				<CardDescription>
					<DataTable
						columns={CollectionColumns}
						data={collections}
						actions={CollectionActions}
					/>
				</CardDescription>
			</Card>
		</div>
	)
}
