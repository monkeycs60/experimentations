import { FirstForm } from '@/components/Home/FirstForm';
import MainSection from '@/components/Home/MainSection';
import Query from '@/components/Home/Query';
import { Form } from '@/components/ui/form';
import Image from 'next/image';

export default function Home() {
	return (
		<main className='space-y-10'>
			<MainSection />
			<FirstForm />
			<Query />
		</main>
	);
}
