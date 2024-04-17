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
const fetchCryptoNewsApi = async () => {
	console.log('fetching crypto news');

	const response = await fetch(
		'https://cryptonews-api.com/api/v1?tickers-only=BTC&items=3&page=1&token=4bqc5f9rbnmradxp7urrqxul5n2hu5vdy7ewsy75'
	);
	console.log(response);

	const data = await response.json();
	return data.data;
};

const fetchGlobalCryptoMarket = async () => {
	const response = await fetch(
		'https://newsdata.io/api/1/news?apikey=pub_41777daa3c595ec3d4493dce3292326916674&q=pizza'
	);
	const data = await response.json();
	return data;
};

const Home = async () => {
	const bitcoinPrices = await getBitcoinHistoricalPrices();
	const cryptoNews = await fetchCryptoNews();
	console.log(cryptoNews);
	const cryptoNewsApi = await fetchCryptoNewsApi();
	console.log(cryptoNewsApi);
	const globalCryptoMarket = await fetchGlobalCryptoMarket();
	console.log(globalCryptoMarket);

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
