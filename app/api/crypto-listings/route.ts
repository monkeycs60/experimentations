import { NextResponse } from 'next/server';
import { CMCListing, CMCListingResponse } from '@/types/CMCListingLatest';
import { CMCResponse } from '@/types/CMCCryptos';

const API_KEY = process.env.NEXT_PUBLIC_CMC_API_KEY;


export async function GET(request: Request) {
	try {
		if (typeof API_KEY === 'string') {
			const { searchParams } = new URL(request.url);
			const search = searchParams.get('search') || '';

			const response = await fetch(
				'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=200',
				{
					headers: {
						'X-CMC_PRO_API_KEY': API_KEY,
					},
				}
			);

			if (!response.ok) {
				throw new Error(
					'Failed to fetch data from in the back end route API'
				);
			}

			const data: CMCResponse = await response.json();
			const mediumData: CMCListing[] = data.data;
			const finalData: CMCListing[] = mediumData.filter((crypto) =>
				crypto.name.toLowerCase().includes(search.toLowerCase())
			);
			console.log(finalData);

			if (finalData.length === 0) {
				const response = await fetch(
					'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=200?start=200',
					{
						headers: {
							'X-CMC_PRO_API_KEY': API_KEY,
						},
					}
				);
			}

			return NextResponse.json({ data: mediumData });
		}
	} catch (error) {
		console.error('Error fetching data:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch data from CoinMarketCap API' },
			{ status: 500 }
		);
	}
}
