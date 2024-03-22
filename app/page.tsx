import MainSection from '@/components/Home/MainSection';
import Query from '@/components/Home/Query';
import { SpecificCryptoForm } from '@/components/Home/SpecificCryptoForm';

export default function Home() {
	return (
		<main className='space-y-10'>
			<MainSection />
			<SpecificCryptoForm />
			<Query />
		</main>
	);
}
