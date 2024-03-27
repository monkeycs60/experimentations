'use client';

import { useState } from 'react';

const GeminiCallAPI = async (messages: any) => {
	const response = await fetch('/api/gpt', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ messages }),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch gpt completion');
	}

	const data = await response.json();
	return data;
};

const GeminiRes = () => {
	const [groqMsg, setGroqMsg] = useState('');
	const [groqRes, setGroqRes] = useState('');
	console.log(groqRes);

	const [isGroqLoading, setIsGroqLoading] = useState(false);

	const handleGroqClick = async (messages: string) => {
		setIsGroqLoading(true);
		const dataForGroq = [{ role: 'user', content: groqMsg }];

		try {
			const res = await GeminiCallAPI(dataForGroq);
			console.log(res);

			setGroqRes(res);
		} catch (error) {
			console.error('Error fetching Gemma from client completion:', error);
		}
		setIsGroqLoading(false);
	};

	return (
		<div>
			<h1>GPT</h1>
			<form>
				<input
					name='groqmsg'
					id='groqmsg'
					onChange={(e) => setGroqMsg(e.target.value)}
					type='text'
				/>
				<button
					onClick={(e) => {
						e.preventDefault();
						handleGroqClick(groqMsg);
					}}
					className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'>
					Ask GPT
				</button>
			</form>
			{groqRes && (
				<p className='bg-green-200 p-4'>GPT Response: {groqRes}</p>
			)}
		</div>
	);
};

export default GeminiRes;
