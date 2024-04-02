import { getPortfolioData } from '@/actions/getPortfolioData';
import { MarketData } from '@/types/geckoCoinID';

const PortfolioContent = async () => {
	const portfolio = await getPortfolioData();
	return (
		<div>
			<h2>Your current porfolio contains:</h2>
			<ul className='flex flex-wrap items-center justify-center gap-12'>
				{portfolio?.map((item) => {
					const marketDataCrypto =
						item.market_data as unknown as MarketData;

					return (
						<li
							key={item.id}
							className='h-24 w-32 bg-slate-400 p-6 text-center text-white'>
							{item.symbol} - {item.id}
							{marketDataCrypto.current_price.usd}
						</li>
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
