import GeminiRes from '@/components/Home/GeminiRes';
import GroqRes from '@/components/Home/GroqRes';
import MyCryptoGrid from '@/components/Home/MyCryptoGrid';
import PortfolioContent from '@/components/Home/PortfolioContent';
import { SpecificCryptoForm } from '@/components/Home/SpecificCryptoForm';
import TotalChart from '@/components/Home/TotalChart';
import Welcome from '@/components/Home/Welcome';
import { getBitcoinHistoricalPrices } from '@/actions/getBitcoinHistoricalPrices';
import FutureChart from '@/components/Home/FutureChart';
import CryptoNews from '@/components/Home/CryptoNews';

const fetchCryptoNews = async () => {
	console.log('fetching crypto news');

	const response = await fetch(
		'https://cryptopanic.com/api/v1/posts/?auth_token=ad6a2406ec825859e2bc22c7c649a1c3d605983f&currencies=FTM'
	);
	console.log(response);

	const data = await response.json();
	return data.results;
};

const Home = async () => {
	const bitcoinPrices = await getBitcoinHistoricalPrices();
	const cryptoNews = await fetchCryptoNews();
	console.log(cryptoNews);

	return (
		<main className='space-y-10'>
			<Welcome />
			<SpecificCryptoForm />
			<PortfolioContent />
			<TotalChart width={1000} height={600} bitcoinPrices={bitcoinPrices} />
			<FutureChart bitcoinPrices={bitcoinPrices} />
			<CryptoNews cryptoNews={cryptoNews} />
			<GroqRes />
		</main>
	);
};

export default Home;
