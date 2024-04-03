'use server';

export type BitcoinPrice = {
	date: Date;
	price: number;
};

export const getBitcoinHistoricalPrices = async () => {
	const url =
		'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365&interval=daily';
	const options = {
		method: 'GET',
		headers: { 'x-cg-demo-api-key': 'CG-UiA8wLTHpsZkFrZtVcSu7Fpo' },
		next: { revalidate: 3600 }, // Revalidate every hour
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();
		const prices: BitcoinPrice[] = data.prices.map(
			([timestamp, price]: [number, number]) => ({
				date: new Date(timestamp),
				price,
			})
		);
		return prices;
	} catch (error) {
		console.error('Error fetching Bitcoin prices:', error);
		throw error;
	}
};
