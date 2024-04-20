import Link from 'next/link'

export default function UpgradePlanPage() {
	return (
		<div>
			<h1 className='text-xl text-primary'>Upgrade your plan</h1>
			<Link href={'/console'}>Return to console</Link>
		</div>
	)
}
