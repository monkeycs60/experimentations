import { AreaChart } from '@tremor/react';

export const fetchCoinData = async (coinId: string) => {
	'use server';
	const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=daily`;
	const options = {
		method: 'GET',
		headers: { 'x-cg-demo-api-key': 'CG-UiA8wLTHpsZkFrZtVcSu7Fpo' },
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching coin data:', error);
		throw error;
	}
};

const TotalChart = async () => {
	const coinId = 'bitcoin'; // Remplacez par l'ID de la crypto-monnaie souhaitée
	const data = await fetchCoinData(coinId);

	const chartData = data.prices.map(
		([timestamp, price]: [number, number]) => ({
			date: new Date(timestamp).toLocaleDateString(),
			price: price,
		})
	);

	const valueFormatter = function (number: number) {
		return '$ ' + new Intl.NumberFormat('us').format(number).toString();
	};
	return (
		<>
			<h3 className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
				{coinId.toUpperCase()} Price Chart
			</h3>
			<p className='text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold'>
				{valueFormatter(chartData[chartData.length - 1].price)}
			</p>
			<AreaChart
				className='mt-4 h-72'
				data={chartData}
				index='date'
				yAxisWidth={65}
				categories={['price']}
				colors={['indigo']}
			/>
		</>
	);
};

export default TotalChart;
