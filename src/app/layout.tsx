import { Toaster } from '@/components/ui/toaster'
import ModalProvider from '@/providers/modal-provider'
import SessionProvider from '@/providers/session-provider'
import ThemeProvider from '@/providers/theme-provider'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Aether X',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className}>
				<SessionProvider>
					<ThemeProvider
						attribute='class'
						defaultTheme='dark'
						enableSystem
						storageKey={'aether_x_theme'}
					>
						<ModalProvider>
							<Toaster />
							{children}
						</ModalProvider>
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	)
}
