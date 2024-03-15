'use client';

import { useQuery } from '@tanstack/react-query';

const API_KEY = 'gXOv59n03MCpY4jTMr64paSObvk4Kt3h';

const fetchExchanges = async () => {
	const response = await fetch(
		`https://api.polygon.io/v3/reference/exchanges?asset_class=crypto&locale=global&apiKey=${API_KEY}`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch exchanges');
	}
	return response.json();
};

const fetchCryptoAssets = async () => {
	const response = await fetch(
		`https://api.polygon.io/v3/reference/tickers?market=crypto&locale=global&active=true&sort=ticker&order=asc&limit=10&apiKey=${API_KEY}`
	);
	if (!response.ok) {
		throw new Error('Failed to fetch crypto assets');
	}
	return response.json();
};

const Query = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['exchanges'],
		queryFn: fetchExchanges,
	});
	const {
		data: cryptoAssets,
		isLoading: cryptoAssetsIsLoading,
		isError: cryptoAssetsIsError,
	} = useQuery({
		queryKey: ['cryptoAssets'],
		queryFn: fetchCryptoAssets,
	});
	console.log(data);
	console.log(cryptoAssets);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error fetching exchanges</div>;
	}

	return (
		<div>
			<h1>Crypto Exchanges</h1>
			{/* <ul>
			{data.results.map((exchange: unknown) => (
				<li key={exchange?.id}>{exchange.name}</li>
			))}
		</ul> */}
		</div>
	);
};

export default Query;
