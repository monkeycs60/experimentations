import { getPortfolioData } from '@/actions/getPortfolioData';
import { GeckoCoinsMarket } from '@/types/geckoCoinsMarket';
import { ArrowDown, ArrowUp } from 'lucide-react';
import Image from 'next/image';

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
		return data as GeckoCoinsMarket[];
	};

	const portfolioCurrentData = await fetchPortfolioCurrentData();
	console.log(portfolioCurrentData);

	return (
		<div className='my-10 space-y-4'>
			<h2>Your current porfolio contains:</h2>
			<ul className='flex flex-wrap items-center justify-center gap-12'>
				{portfolioCurrentData?.map((item) => {
					const priceChangePercentage = item.price_change_percentage_24h;
					return (
						<div
							key={item.id}
							className='flex h-32 w-[400px] items-center justify-between rounded-xl bg-white px-6 py-4'>
							<div className='space-y-2'>
								<Image
									src={item.image}
									alt={item.name}
									width={36}
									height={36}
									className='rounded-xl'
								/>
								<div className='flex items-center gap-2'>
									<p className='font-bold'>
										{item.symbol.toLocaleUpperCase()}
									</p>
									<span className=''>{item.name}</span>
								</div>
							</div>
							<span className='text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium'>
								${item.current_price}
							</span>
							<div className='flex items-center gap-3'>
								{priceChangePercentage < 0 ? (
									<ArrowDown size={20} color='red' />
								) : (
									<ArrowUp size={20} color='green' />
								)}

								<span
									className={`text-tremor-default rounded px-2 py-1 font-medium text-white ${
										priceChangePercentage < 0
											? 'bg-red-500'
											: 'bg-emerald-500'
									}`}>
									{priceChangePercentage
										? priceChangePercentage.toFixed(1)
										: 0}
									%
								</span>
							</div>
						</div>
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
