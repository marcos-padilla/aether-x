import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import ProjectsTab from './_tabs/projects-tab'
export default function ConsolePage() {
	return (
		<main>
			<Tabs defaultValue='projects' className='rounded-none'>
				<div className='bg-accent px-4 py-2'>
					<TabsList className='rounded-none container'>
						<TabsTrigger value='projects'>
							Projects
						</TabsTrigger>
						<TabsTrigger value='members'>Members</TabsTrigger>
						<TabsTrigger value='billing'>Billing</TabsTrigger>
						<TabsTrigger value='settings'>
							Settings
						</TabsTrigger>
					</TabsList>
				</div>
				<div className='p-4'>
					<TabsContent value='projects'>
						<ProjectsTab />
					</TabsContent>
					<TabsContent value='password'></TabsContent>
				</div>
			</Tabs>
		</main>
	)
}
