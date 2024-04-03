import GeminiRes from '@/components/Home/GeminiRes';
import GroqRes from '@/components/Home/GroqRes';
import MyCryptoGrid from '@/components/Home/MyCryptoGrid';
import PortfolioContent from '@/components/Home/PortfolioContent';
import { SpecificCryptoForm } from '@/components/Home/SpecificCryptoForm';
import TotalChart from '@/components/Home/TotalChart';
import Welcome from '@/components/Home/Welcome';
import { getBitcoinHistoricalPrices } from '@/actions/getBitcoinHistoricalPrices';

const Home = async () => {
	const bitcoinPrices = await getBitcoinHistoricalPrices();

	return (
		<main className='space-y-10'>
			<Welcome />
			<SpecificCryptoForm />
			<PortfolioContent />
			<TotalChart width={1000} height={800} bitcoinPrices={bitcoinPrices} />
			<GroqRes />
		</main>
	);
};

export default Home;
