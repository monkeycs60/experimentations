'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

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
import { CMCListingResponse, CMCListing } from '@/types/CMCListingLatest';
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

const fetchCryptoListings = async (): Promise<CMCListing[]> => {
	const response = await fetch('/api/crypto-listings');

	if (!response.ok) {
		throw new Error('Failed to fetch crypto listings');
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
		data: cryptoListings,
		isLoading: isListingsLoading,
		isError: isListingsError,
	} = useQuery<CMCListing[]>({
		queryKey: ['cryptoListings'],
		queryFn: fetchCryptoListings,
	});

	console.log(cryptoListings);

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
			{isListingsLoading && <p>Loading...</p>}
			{isListingsError && <p>Error fetching crypto listings.</p>}
			{cryptoListings && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='w-2/3 space-y-6'>
						<FormField
							control={form.control}
							name='cryptoSymbol'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<FormLabel>
										Crypto Symbol
										<span className='text-red-500'>*</span>
									</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant='outline'
													role='combobox'
													className={cn(
														'w-[200px] justify-between',
														!field.value &&
															'text-muted-foreground'
													)}>
													{field.value
														? cryptoListings?.find(
																(crypto) =>
																	crypto.symbol === field.value
														  )?.name
														: 'Select a crypto'}
													<CaretSortIcon className='ml-2 size-4 shrink-0 opacity-50' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='w-[200px] p-0'>
											<Command>
												<CommandInput
													placeholder='Search framework...'
													className='h-9'
												/>
												<CommandEmpty>No crypto found</CommandEmpty>
												<CommandGroup>
													{cryptoListings?.map((crypto) => (
														<CommandItem
															value={crypto.name}
															key={crypto.id}
															onSelect={() => {
																form.setValue(
																	'cryptoSymbol',
																	crypto.symbol
																);
															}}>
															{crypto.name}
															<CheckIcon
																className={cn(
																	'ml-auto h-4 w-4',
																	crypto.symbol === field.value
																		? 'opacity-100'
																		: 'opacity-0'
																)}
															/>
														</CommandItem>
													))}
												</CommandGroup>
											</Command>
										</PopoverContent>
									</Popover>
									<FormDescription>
										Enter the symbol of the crypto you want to fetch.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit'>Submit</Button>
					</form>
				</Form>
			)}
			{selectedCrypto && (
				<div>
					{/* <h1>{selectedCrypto[0].name}</h1>
					<p>{selectedCrypto[0].quote.USD.price.toFixed(2)}</p> */}
				</div>
			)}
			{isError && <p>Error fetching selected crypto.</p>}
		</>
	);
}
