'use server';

import { GeckoCoinsList } from '@/types/geckoCoinsList';

export async function getAllCryptos(): Promise<GeckoCoinsList[] | undefined> {
	try {
		const response = await fetch(
			'https://api.coingecko.com/api/v3/coins/list',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'x-cg-demo-api-key': 'CG-UiA8wLTHpsZkFrZtVcSu7Fpo',
				},
				cache: 'no-store',
			}
		);

		if (!response.ok) {
			throw new Error(
				'Failed to fetch data from coingecko in the back end route API'
			);
		}

		const data: GeckoCoinsList[] = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
		return undefined;
	}
}
