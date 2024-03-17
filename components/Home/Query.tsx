'use client';

import { useQuery } from '@tanstack/react-query';
import { CMCResponse, CMCData } from '@/types/CMCCryptos';

const fetchCMC = async (): Promise<CMCResponse> => {
	const response = await fetch('/api/cmc');
	if (!response.ok) {
		throw new Error('Failed to fetch crypto assets');
	}
	return response.json();
};

const Query = () => {
	const {
		data: cmcData,
		isLoading,
		isError,
		error,
	} = useQuery<CMCResponse>({
		queryKey: ['cmc'],
		queryFn: fetchCMC,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}
	console.log(cmcData);

	return (
		<div>
			<h1>Crypto Exchanges</h1>
			{cmcData?.data.slice(0, 10).map((asset) => (
				<div key={asset.id}>
					<p>{asset.name}</p>
					<p>{asset.quote.USD.price.toFixed(2)}</p>
				</div>
			))}
		</div>
	);
};

export default Query;
