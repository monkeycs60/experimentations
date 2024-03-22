'use client';

import React from 'react';
import { LoginButton } from '../Login/LoginButton';
import { auth } from '@/lib/auth';
import { useQuery } from '@tanstack/react-query';
import { CMCResponse } from '@/types/CMCCryptos';

async function populateDb(): Promise<any> {
	try {
		const response = await fetch(`/api/populate`);

		if (!response.ok) {
			throw new Error('Failed to fetch crypto assets');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

const MainSection = () => {
	// const session = await auth();

	// const {
	// 	data: cmcPopulate,
	// 	isLoading,
	// 	isError,
	// 	error,
	// } = useQuery<CMCResponse>({
	// 	queryKey: ['populate'],
	// 	queryFn: async () => populateDb(),
	// 	staleTime: 60 * 1000,
	// });

	// console.log(cmcPopulate);

	return (
		<>
			{/* {session && <div>Logged in as {session?.user?.email}</div>} */}
			<LoginButton />
			<div>MainSection</div>
		</>
	);
};

export default MainSection;
