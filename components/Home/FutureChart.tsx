'use client';

import { BitcoinPrice } from '@/actions/getBitcoinHistoricalPrices';
import React from 'react';
import TotalChart from './TotalChart';
import { useState } from 'react';

const claudeFuturApi = async (bitcoinPrices: BitcoinPrice[]) => {
	const response = await fetch('/api/claude', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ bitcoinPrices }),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch Gemma completion');
	}

	const data = await response.json();
	return data;
};

type FutureChartProps = {
	bitcoinPrices: BitcoinPrice[];
};

const FutureChart = ({ bitcoinPrices }: FutureChartProps) => {
	const [futureChartData, setFutureChartData] = useState<BitcoinPrice[]>([]);
	console.log(futureChartData);

	return (
		<div>
			<button
				onClick={async () => {
					console.log(bitcoinPrices);

					const futureChartData = await claudeFuturApi(bitcoinPrices);
					console.log(futureChartData);

					setFutureChartData(futureChartData);
				}}>
				Get future prediction
			</button>
			{/* <TotalChart
				width={1000}
				height={600}
				bitcoinPrices={futureChartData}
			/> */}
		</div>
	);
};

export default FutureChart;
