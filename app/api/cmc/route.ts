import { NextResponse } from 'next/server';
import { CMCResponse } from '@/types/CMCCryptos';

export async function GET(resquest: Request) {
	try {
		const response = await fetch(
			'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
			{
				headers: {
					'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY as string,
				},
			}
		);

		if (!response.ok) {
			throw new Error('Failed to fetch data from CoinMarketCap API');
		}

		const data: CMCResponse = await response.json();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching data:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch data from CoinMarketCap API' },
			{ status: 500 }
		);
	}
}
