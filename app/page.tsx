import GeminiRes from '@/components/Home/GeminiRes';
import GroqRes from '@/components/Home/GroqRes';
import MyCryptoGrid from '@/components/Home/MyCryptoGrid';
import PortfolioContent from '@/components/Home/PortfolioContent';
import { SpecificCryptoForm } from '@/components/Home/SpecificCryptoForm';
import Welcome from '@/components/Home/Welcome';

export default function Home() {
	return (
		<main className='space-y-10'>
			<Welcome />
			<SpecificCryptoForm />
			<PortfolioContent />
			<GroqRes />
		</main>
	);
}
