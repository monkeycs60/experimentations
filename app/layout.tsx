import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
		<ReactQueryClientProvider>
			<html lang='en' className='m-auto max-w-7xl py-12'>
				<body className={inter.className}>{children}</body>
			</html>
		</ReactQueryClientProvider>
	);
}
