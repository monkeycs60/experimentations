import { NextResponse } from 'next/server';
import { CMCListing, CMCListingResponse } from '@/types/CMCListingLatest';

const API_KEY = process.env.NEXT_PUBLIC_CMC_API_KEY;

export async function GET(request: Request) {
	try {
		if (typeof API_KEY === 'string') {
			const response = await fetch(
				'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
				{
					headers: {
						'X-CMC_PRO_API_KEY': API_KEY,
					},
				}
			);

			if (!response.ok) {
				throw new Error('Failed to fetch data from CoinMarketCap API');
			}

			const data: CMCListingResponse = await response.json();
			return NextResponse.json({
				data: data.data,
			});
		}
	} catch (error) {
		console.error('Error fetching data:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch data from CoinMarketCap API' },
			{ status: 500 }
		);
	}
}
