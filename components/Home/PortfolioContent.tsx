import { getPortfolioData } from '@/actions/getPortfolioData';
import { MarketData } from '@/types/geckoCoinID';
import { GeckoCoinsMarket } from '@/types/geckoCoinsMarket';
import { Card, SparkAreaChart } from '@tremor/react';

const PortfolioContent = async () => {
	const portfolio = await getPortfolioData();
	console.log(portfolio);

	const fetchPortfolioCurrentData = async () => {
		if (!portfolio) return;
		// Extraire les IDs des coins du portfolio
		const coinIds = portfolio.map((item) => item.id);

		// Formater les IDs pour l'URL de l'API
		const formattedIds = coinIds
			.map((id) => encodeURIComponent(id))
			.join('%2C');

		// Construire l'URL de l'API avec les IDs des coins
		const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${formattedIds}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

		const options = {
			method: 'GET',
			headers: { 'x-cg-demo-api-key': 'CG-UiA8wLTHpsZkFrZtVcSu7Fpo' },
			next: { revalidate: 20 },
		};

		// Faire l'appel à l'API
		const response = await fetch(url, options);
		const data = await response.json();
		console.log(data);

		return data as GeckoCoinsMarket[];
	};

	const portfolioCurrentData = await fetchPortfolioCurrentData();
	console.log(portfolioCurrentData);

	return (
		<div>
			<h2>Your current porfolio contains:</h2>
			<ul className='flex flex-wrap items-center justify-center gap-12'>
				{portfolioCurrentData?.map((item) => {
					return (
						<Card
							key={item.id}
							className='mx-auto flex max-w-lg items-center justify-between px-4 py-3.5'>
							<div className='flex items-center space-x-2.5'>
								<p className='text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium'>
									{item.symbol}
								</p>
								<span className='text-tremor-default text-tremor-content dark:text-dark-tremor-content'>
									{item.name}
								</span>
							</div>
							<SparkAreaChart
								data={[
									{ name: 'Prix actuel', value: item.current_price },
									{ name: 'ATH', value: item.ath },
									{ name: 'ATL', value: item.atl },
								]}
								categories={['value']}
								index={'name'}
								colors={['emerald']}
								className='h-8 w-20 sm:h-10 sm:w-36'
							/>
							<div className='flex items-center space-x-2.5'>
								<span className='text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium'>
									${item.current_price}
								</span>
								<span className='text-tremor-default rounded bg-emerald-500 px-2 py-1 font-medium text-white'>
									{item.price_change_percentage_24h
										? item.price_change_percentage_24h.toFixed(1)
										: 0}
									%
								</span>
							</div>
						</Card>

						// <li
						// 	key={item.id}
						// 	className='h-32 w-64 bg-slate-400 p-6 text-center text-white'>
						// 	{item.symbol} - {item.id}
						// 	{marketDataCrypto.current_price.usd}
						// </li>
					);
				})}
			</ul>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius quod
				odio impedit non cum eos sit magni ratione fuga quae.
			</p>
		</div>
	);
	return (
		<div>
			<h2>Your current porfolio contains:</h2>
			{/* <ul>
				{getPortfolioData().map((item) => (
					<li key={item.id}>
						{item.symbol} - {item.quantity}
					</li>
				))}
			</ul> */}
		</div>
	);
};

export default PortfolioContent;
