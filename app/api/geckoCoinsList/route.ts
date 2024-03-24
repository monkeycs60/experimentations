import { NextResponse } from 'next/server';
import { CMCListing, CMCListingResponse } from '@/types/CMCListingLatest';
import { CMCResponse } from '@/types/CMCCryptos';
import prisma from '@/lib/prisma';
import { GeckoCoinsList } from '@/types/geckoCoinsList';

export async function GET(request: Request) {
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

		for (const cryptocurrency of data) {
			await prisma.cryptoDataGecko.upsert({
				where: { id: cryptocurrency.id },
				update: {
					cryptoId: cryptocurrency.id,
					symbol: cryptocurrency.symbol,
					name: cryptocurrency.name,
				},
				create: {
					cryptoId: cryptocurrency.id,
					symbol: cryptocurrency.symbol,
					name: cryptocurrency.name,
				},
			});
		}

		return NextResponse.json(
			{ message: 'Successfully fetched data from CoinMarketCap API' },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error fetching data:', error);
		return NextResponse.json(
			{ error: 'Error updating crypto data in the db' },
			{ status: 500 }
		);
	}
}
