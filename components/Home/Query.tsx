'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { CMCResponse, CMCData } from '@/types/CMCCryptos';
import { CMCSpecificCryptoResponse } from '@/types/CMCSpecficCrypto';
import { useState } from 'react';

const fetchCMC = async (): Promise<CMCResponse> => {
	const response = await fetch('/api/cmc');
	if (!response.ok) {
		throw new Error('Failed to fetch crypto assets');
	}
	return response.json();
};

const fetchClaudeOpinion = async (cryptoName: string, cryptoPrice: number) => {
	const response = await fetch('/api/claude', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ cryptoName, cryptoPrice }),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch Claude opinion');
	}

	const data = await response.json();
	return data.opinion[0].text;
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

	const [claudeOpinion, setClaudeOpinion] = useState('');
	const [isClaudeLoading, setIsClaudeLoading] = useState(false);

	const handleClaudeOpinionClick = async (
		cryptoName: string,
		cryptoPrice: number
	) => {
		setIsClaudeLoading(true);
		try {
			const opinion = await fetchClaudeOpinion(cryptoName, cryptoPrice);
			console.log(opinion);

			setClaudeOpinion(opinion);
		} catch (error) {
			console.error('Error fetching Claude opinion:', error);
		}
		setIsClaudeLoading(false);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<div>
			<h1>Crypto Exchanges</h1>
			{cmcData?.data.slice(0, 10).map((asset) => (
				<div key={asset.id} className='bg-slate-400'>
					<p>{asset.name}</p>
					<p>{asset.quote.USD.price.toFixed(2)}</p>
					<button
						className='bg-red-200 p-2'
						onClick={() =>
							handleClaudeOpinionClick(asset.name, asset.quote.USD.price)
						}
						disabled={isClaudeLoading}>
						{isClaudeLoading ? 'Loading...' : 'Ask Claude'}
					</button>
				</div>
			))}
			{claudeOpinion && (
				<p className='bg-green-200 p-4'>Claude Opinion: {claudeOpinion}</p>
			)}
		</div>
	);
};

export default Query;
