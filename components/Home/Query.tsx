'use client';

import { useState } from 'react';



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

	
	return (
		<div>
			<h1>Crypto Exchanges</h1>
			
			{claudeOpinion && (
				<p className='bg-green-200 p-4'>Claude Opinion: {claudeOpinion}</p>
			)}
		</div>
	);
};

export default Query;
