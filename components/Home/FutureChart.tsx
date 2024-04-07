'use client';

import { BitcoinPrice } from '@/actions/getBitcoinHistoricalPrices';
import React from 'react';
import { useState } from 'react';
import TotalChart from './TotalChart';
import { format } from 'date-fns';

const claudeFuturApi = async (bitcoinPrices: BitcoinPrice[]) => {
	const response = await fetch('/api/groq-json', {
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
	const [futureChartData, setFutureChartData] = useState<
		BitcoinPrice[] | undefined
	>(undefined);
	console.log(futureChartData);

	return (
		<div>
			<button
				onClick={async () => {
					console.log(bitcoinPrices);

					const futureChartData = await claudeFuturApi(bitcoinPrices);
					console.log(futureChartData);
					const futureChartDataParsed = JSON.parse(futureChartData);
					console.log(futureChartDataParsed);
					const allChartData = [
						...bitcoinPrices,
						...futureChartDataParsed,
					];
					const formattedChartData: BitcoinPrice[] = allChartData.map(
						({ date, price }: { date: string; price: number }) => ({
							date: new Date(date),
							price,
						})
					);
					setFutureChartData(formattedChartData);

					// setFutureChartData(futureChartData);
				}}>
				Get future prediction
			</button>
			{futureChartData && (
				<TotalChart
					width={1000}
					height={600}
					bitcoinPrices={futureChartData}
				/>
			)}
		</div>
	);
};

export default FutureChart;
