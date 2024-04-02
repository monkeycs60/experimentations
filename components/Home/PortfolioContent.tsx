import { getPortfolioData } from '@/actions/getPortfolioData';
import { MarketData } from '@/types/geckoCoinID';
import { Card, SparkAreaChart } from '@tremor/react';

const PortfolioContent = async () => {
	const portfolio = await getPortfolioData();
	console.log(portfolio);

	return (
		<div>
			<h2>Your current porfolio contains:</h2>
			<ul className='flex flex-wrap items-center justify-center gap-12'>
				{portfolio?.map((item) => {
					const marketDataCrypto =
						item.market_data as unknown as MarketData;
					const chartdata = [
						{
							month: 'Jan 21',
							Performance: 4000,
						},
						{
							month: 'Feb 21',
							Performance: 3000,
						},
						{
							month: 'Mar 21',
							Performance: 2000,
						},
						{
							month: 'Apr 21',
							Performance: 2780,
						},
						{
							month: 'May 21',
							Performance: 1890,
						},
						{
							month: 'Jun 21',
							Performance: 2390,
						},
						{
							month: 'Jul 21',
							Performance: 3490,
						},
					];
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
								data={chartdata}
								categories={['Performance']}
								index={'month'}
								colors={['emerald']}
								className='h-8 w-20 sm:h-10 sm:w-36'
							/>
							<div className='flex items-center space-x-2.5'>
								<span className='text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium'>
									${marketDataCrypto.current_price.usd}
								</span>
								<span className='text-tremor-default rounded bg-emerald-500 px-2 py-1 font-medium text-white'>
									{marketDataCrypto
										.price_change_percentage_24h_in_currency.usd
										? marketDataCrypto.price_change_percentage_24h_in_currency.usd.toFixed(
												1
										  )
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
