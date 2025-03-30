import { Nunito } from 'next/font/google'

import { Toaster } from 'react-hot-toast'

import './globals.css'

const nunito = Nunito({
	subsets: ['latin'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={`${nunito.className} antialiased scroll-smooth`}>
				{children}
				<Toaster position='top-right' />
			</body>
		</html>
	)
}
