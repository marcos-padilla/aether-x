import { FeatureType, PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function main() {}

type SeedFeatures = {
	name: FeatureType
	value: number
}

type SeedPlan = {
	name: string
	price: number
	Features: SeedFeatures[]
}

const plans = [
	{
		name: 'Free',
		price: 0,
		Features: [
			{
				name: 'PROJECT_COUNT',
				value: 1,
			},
			{
				name: 'DATABASE_PER_PROJECT_COUNT',
				value: 1,
			},
			{
				name: 'COLLECTION_PER_DATABASE_COUNT',
				value: 5,
			},
		],
	},
	{
		name: 'Basic',
		price: 14.99,
		Features: [
			{
				name: 'PROJECT_COUNT',
				value: 5,
			},
			{
				name: 'DATABASE_PER_PROJECT_COUNT',
				value: 3,
			},
			{
				name: 'COLLECTION_PER_DATABASE_COUNT',
				value: 20,
			},
		],
	},
	{
		name: 'Pro',
		price: 29.99,
		Features: [
			{
				name: 'PROJECT_COUNT',
				value: 15,
			},
			{
				name: 'DATABASE_PER_PROJECT_COUNT',
				value: 10,
			},
			{
				name: 'COLLECTION_PER_DATABASE_COUNT',
				value: 50,
			},
		],
	},
	{
		name: 'Enterprise',
		price: 49.99,
		Features: [
			{
				name: 'PROJECT_COUNT',
				value: 50,
			},
			{
				name: 'DATABASE_PER_PROJECT_COUNT',
				value: 15,
			},
			{
				name: 'COLLECTION_PER_DATABASE_COUNT',
				value: 100,
			},
		],
	},
] as SeedPlan[]

main()
	.then(async () => {
		for (const plan of plans) {
			const planAlreadyExists = await db.plan.findFirst({
				where: {
					name: plan.name,
				},
			})
			if (planAlreadyExists) {
				continue
			}
			await db.plan.create({
				data: {
					name: plan.name,
					price: plan.price,
					Features: {
						createMany: {
							data: plan.Features,
						},
					},
				},
			})
		}
		await db.$disconnect()
		console.log('Seed successful')
	})
	.catch(async (e) => {
		console.error(e)
		await db.$disconnect()
		process.exit(1)
	})
