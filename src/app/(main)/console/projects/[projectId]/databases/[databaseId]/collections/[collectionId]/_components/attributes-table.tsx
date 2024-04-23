import ActionTooltip from '@/components/globals/action-tooltip'
import DataTable from '@/components/globals/data-table'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { getAttributes } from '@/controllers/attributes-controller'
import { AttributeColumns } from './attribute-columns'
import CreateAttributeButton from './create-attribute-button'
import { AttributeActions } from './attribute-actions'

interface AttributeTableProps {
	collectionId: string
}

export default async function AttributesTable({
	collectionId,
}: AttributeTableProps) {
	const attributes = await getAttributes(collectionId)
	return (
		<div className='container pt-5'>
			<Card>
				<CardHeader className='flex flex-row justify-between items-center'>
					<div className='flex gap-x-5 items-center'>
						<CardTitle>Attributes</CardTitle>
						<ActionTooltip label='Upgrade your plan to create more collections in this database'>
							<CardDescription className='rounded-full bg-accent px-3 py-1 hover:bg-accent/50 transition-all hover:text-foreground cursor-pointer'>
								{attributes.length} created
							</CardDescription>
						</ActionTooltip>
					</div>
					<CreateAttributeButton collectionId={collectionId} />
				</CardHeader>
				<CardContent>
					<DataTable
						columns={AttributeColumns}
						data={attributes}
						actions={AttributeActions}
					/>
				</CardContent>
			</Card>
		</div>
	)
}
