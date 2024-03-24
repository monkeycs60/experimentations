import { SpecificCryptoForm } from '@/components/Home/SpecificCryptoForm';
import Welcome from '@/components/Home/Welcome';

export default function Home() {
	return (
		<main className='space-y-10'>
			<Welcome />
			<SpecificCryptoForm />
		</main>
	);
}
