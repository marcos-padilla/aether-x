import IdSpan from '@/components/globals/id-span'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getCollection } from '@/controllers/collection-controller'
import AttributesTable from './_components/attributes-table'

export default async function CollectionPage({
	params: { collectionId, databaseId, projectId },
}: {
	params: { projectId: string; databaseId: string; collectionId: string }
}) {
	const collection = await getCollection(collectionId)
	return (
		<>
			<div className='bg-accent/60 py-5 px-4 border-b'>
				<div className='container flex items-center'>
					<div className='flex items-center gap-x-2'>
						<h1 className='text-xl'>{collection.name}</h1>
						<IdSpan id={collectionId} />
					</div>
				</div>
			</div>
			<Tabs defaultValue='attributes' className='rounded-none'>
				<div className='bg-accent/60'>
					<TabsList className='rounded-none container py-8 bg-transparent'>
						<TabsTrigger value='attributes'>
							Attributes
						</TabsTrigger>
						<TabsTrigger value='documents'>
							Documents
						</TabsTrigger>
					</TabsList>
				</div>
				<div className='p-4'>
					<TabsContent value='attributes'>
						<AttributesTable collectionId={collectionId} />
					</TabsContent>
					<TabsContent value='documents'>Documents</TabsContent>
				</div>
			</Tabs>
		</>
	)
}
