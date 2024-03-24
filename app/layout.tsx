import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import AuthProvider from '@/components/Login/AuthProvider';
import Header from '@/components/layout/Header';
import './globals.css';

export const metadata: Metadata = {
	title: 'Expérimentations React',
	description: 'Improving myself at React',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthProvider>
			<ReactQueryClientProvider>
				<html lang='en'>
					<body>
						<Header />
						<div className='m-auto max-w-6xl space-y-8 bg-slate-200 py-12 xl:max-w-7xl'>
							{children}
						</div>
					</body>
				</html>
			</ReactQueryClientProvider>
		</AuthProvider>
	);
}
