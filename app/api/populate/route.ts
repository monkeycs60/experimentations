import { NextResponse } from 'next/server';
import { CMCListing, CMCListingResponse } from '@/types/CMCListingLatest';
import { CMCResponse } from '@/types/CMCCryptos';
import prisma from '@/lib/prisma';

const API_KEY = process.env.CMC_API_KEY;

export async function GET(request: Request) {
	try {
		if (typeof API_KEY === 'string') {
			const response = await fetch(
				'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=5000',
				{
					headers: {
						'X-CMC_PRO_API_KEY': API_KEY,
					},
					cache: 'no-store',
				}
			);

			if (!response.ok) {
				throw new Error(
					'Failed to fetch data from in the back end route API'
				);
			}

			const data: CMCResponse = await response.json();

			for (const cryptocurrency of data.data) {
				const { USD } = cryptocurrency.quote;

				await prisma.cryptocurrency.upsert({
					where: { id: cryptocurrency.id },
					update: {
						name: cryptocurrency.name,
						symbol: cryptocurrency.symbol,
						slug: cryptocurrency.slug,
						cmcRank: cryptocurrency.cmc_rank,
						numMarketPairs: cryptocurrency.num_market_pairs,
						circulatingSupply: cryptocurrency.circulating_supply,
						totalSupply: cryptocurrency.total_supply,
						maxSupply: cryptocurrency.max_supply ?? undefined,
						infiniteSupply: cryptocurrency.infinite_supply,
						lastUpdated: new Date(cryptocurrency.last_updated),
						dateAdded: new Date(cryptocurrency.date_added),
						tags: cryptocurrency.tags,
						tokenAddress:
							cryptocurrency?.platform?.token_address ?? undefined,
						selfReportedCirculatingSupply:
							cryptocurrency.self_reported_circulating_supply ??
							undefined,
						selfReportedMarketCap:
							cryptocurrency.self_reported_market_cap ?? undefined,
						price: USD.price,
						volume24h: USD.volume_24h,
						volumeChange24h: USD.volume_change_24h,
						percentChange1h: USD.percent_change_1h,
						percentChange24h: USD.percent_change_24h,
						percentChange7d: USD.percent_change_7d,
						marketCap: USD.market_cap,
						marketCapDominance: USD.market_cap_dominance,
						fullyDilutedMarketCap: USD.fully_diluted_market_cap,
					},
					create: {
						id: cryptocurrency.id,
						name: cryptocurrency.name,
						symbol: cryptocurrency.symbol,
						slug: cryptocurrency.slug,
						cmcRank: cryptocurrency.cmc_rank,
						numMarketPairs: cryptocurrency.num_market_pairs,
						circulatingSupply: cryptocurrency.circulating_supply,
						totalSupply: cryptocurrency.total_supply,
						maxSupply: cryptocurrency.max_supply ?? undefined,
						infiniteSupply: cryptocurrency.infinite_supply,
						lastUpdated: new Date(cryptocurrency.last_updated),
						dateAdded: new Date(cryptocurrency.date_added),
						tags: cryptocurrency.tags,
						tokenAddress:
							cryptocurrency?.platform?.token_address ?? undefined,
						selfReportedCirculatingSupply:
							cryptocurrency.self_reported_circulating_supply ??
							undefined,
						selfReportedMarketCap:
							cryptocurrency.self_reported_market_cap ?? undefined,
						price: USD.price,
						volume24h: USD.volume_24h,
						volumeChange24h: USD.volume_change_24h,
						percentChange1h: USD.percent_change_1h,
						percentChange24h: USD.percent_change_24h,
						percentChange7d: USD.percent_change_7d,
						marketCap: USD.market_cap,
						marketCapDominance: USD.market_cap_dominance,
						fullyDilutedMarketCap: USD.fully_diluted_market_cap,
					},
				});
			}

			return NextResponse.json(
				{ message: 'Successfully fetched data from CoinMarketCap API' },
				{ status: 200 }
			);
		} else {
			return NextResponse.json(
				{ error: 'API key is missing or invalid' },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error('Error fetching data:', error);
		return NextResponse.json(
			{ error: 'Error updating crypto data in the db' },
			{ status: 500 }
		);
	}
}
