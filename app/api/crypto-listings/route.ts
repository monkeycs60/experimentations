import { NextResponse } from 'next/server';
import { CMCListing, CMCListingResponse } from '@/types/CMCListingLatest';

const API_KEY = process.env.NEXT_PUBLIC_CMC_API_KEY;

export async function GET(request: Request) {
	try {
		if (typeof API_KEY === 'string') {
			const { searchParams } = new URL(request.url);
			const search = searchParams.get('search') || '';

			const response = await fetch(
				`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?&symbol=${search}`,
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
			const cryptoData = Object.values(data.data);
			const finalData = cryptoData[0];

			return NextResponse.json({ data: finalData });
		}
	} catch (error) {
		console.error('Error fetching data:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch data from CoinMarketCap API' },
			{ status: 500 }
		);
	}
}
