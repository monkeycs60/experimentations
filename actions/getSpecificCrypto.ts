import { GeckoCoinID } from '@/types/geckoCoinID';

export async function getSpecificCrypto(cryptoId: string) {
	try {
		const response = await fetch(
			`https://api.coingecko.com/api/v3/coins/${cryptoId}`,
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
			throw new Error('Failed to fetch specific crypto data');
		}

		const data: GeckoCoinID = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching specific crypto data:', error);
		return undefined;
	}
}
