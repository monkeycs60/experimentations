import GeminiRes from '@/components/Home/GeminiRes';
import GroqRes from '@/components/Home/GroqRes';
import MyCryptoGrid from '@/components/Home/MyCryptoGrid';
import { SpecificCryptoForm } from '@/components/Home/SpecificCryptoForm';
import Welcome from '@/components/Home/Welcome';

export default function Home() {
	return (
		<main className='space-y-10'>
			<Welcome />
			<GroqRes />
			<GeminiRes />
			<MyCryptoGrid />
			<SpecificCryptoForm />
		</main>
	);
}
