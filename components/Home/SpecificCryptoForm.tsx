'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { CMCSpecificCryptoResponse } from '@/types/CMCSpecficCrypto';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const fetchSelectedCrypto = async (
	cryptoSymbol: string
): Promise<CMCSpecificCryptoResponse> => {
	const response = await fetch('/api/specific-crypto', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ cryptoSymbol }),
	});

	if (!response.ok) {
		throw new Error('Failed to fetch selected crypto');
	}

	const data = await response.json();
	return data.data;
};

const FormSchema = z.object({
	cryptoSymbol: z.string().min(3, {
		message: 'CryptoSymol must be at least 3 characters.',
	}),
});

export function SpecificCryptoForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			cryptoSymbol: '',
		},
	});

	const [selectedCrypto, setSelectedCrypto] =
		useState<CMCSpecificCryptoResponse | null>(null);

	console.log(selectedCrypto);

	const {
		mutate: fetchCrypto,
		isError,
		error,
	} = useMutation({
		mutationFn: fetchSelectedCrypto,
		onSuccess: (data) => {
			setSelectedCrypto(data);
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			await fetchCrypto(data.cryptoSymbol);
			toast({
				title: 'Fetched selected crypto data',
			});
		} catch (error) {
			console.error('Error fetching selected crypto:', error);
			toast({
				title: 'Failed to fetch selected crypto',
				description: 'Please try again later.',
			});
		}
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-2/3 space-y-6'>
					<FormField
						control={form.control}
						name='cryptoSymbol'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Search Crypto</FormLabel>
								<FormControl>
									<Input placeholder='BTC' {...field} />
								</FormControl>
								<FormDescription>
									Enter a crypto name to get its current price.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit'>Submit</Button>
				</form>
			</Form>
			{selectedCrypto && (
				<div>
					<h1>{selectedCrypto[0].name}</h1>
					<p>{selectedCrypto[0].quote.USD.price.toFixed(2)}</p>
				</div>
			)}
			{isError && <p>Error fetching selected crypto.</p>}
		</>
	);
}
